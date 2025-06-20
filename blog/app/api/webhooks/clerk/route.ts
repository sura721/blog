import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET');
  }

  const headers = req.headers;
  const svix_id = headers.get('svix-id');
  const svix_timestamp = headers.get('svix-timestamp');
  const svix_signature = headers.get('svix-signature');
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, username, image_url } = evt.data;

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        email: email_addresses[0].email_address,
        username: username!,
        imageUrl: image_url,
      },
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        imageUrl: image_url,
      },
    });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    try {
      await prisma.user.delete({
        where: { clerkId: id },
      });
    } catch (error) {
        console.warn(`Failed to delete user ${id}, they might not exist.`);
    }
  }

  return new NextResponse(null, { status: 200 });
}
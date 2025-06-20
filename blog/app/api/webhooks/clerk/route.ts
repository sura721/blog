import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  const headers = req.headers;
  const svix_id = headers.get("svix-id");
  const svix_timestamp = headers.get("svix-timestamp");
  const svix_signature = headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 })
  }
  
  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      await prisma.user.create({
        data: {
          clerkId: evt.data.id,
          username: evt.data.username!,
          email: evt.data.email_addresses[0].email_address,
          imageUrl: evt.data.image_url,
        }
      });
    } catch (dbError) {
      console.error("DATABASE ERROR:", dbError);
      return new NextResponse('Database error during user creation', { status: 500 });
    }
  }
  
  return new NextResponse(null, { status: 200 })
}
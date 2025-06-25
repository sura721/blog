export default function ServicePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-4">Services</h1>
      <p className="text-muted-foreground mb-10">
        Here’s what I offer — tailored solutions to bring your ideas to life.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-6 rounded-xl border bg-background shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Full-Stack Development</h2>
          <p className="text-muted-foreground">
            I build modern web apps using Next.js, React, Prisma, and PostgreSQL/MongoDB — from backend to frontend.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-background shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-foreground">API Design</h2>
          <p className="text-muted-foreground">
            RESTful or GraphQL API development using Node.js, Express, and secure database practices.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-background shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-foreground">UI/UX Integration</h2>
          <p className="text-muted-foreground">
            I turn clean designs into responsive, beautiful UIs using TailwindCSS, Shadcn UI, or Flowbite.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-background shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Authentication</h2>
          <p className="text-muted-foreground">
            Secure login systems with Clerk, NextAuth, JWTs — including role-based access and admin dashboards.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-background shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-foreground">CMS & Blogs</h2>
          <p className="text-muted-foreground">
            Custom blog or content management systems with rich text editors (Quill/Markdown), tagging, and comments.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-background shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Deployment & CI/CD</h2>
          <p className="text-muted-foreground">
            I deploy apps with Vercel, Render, or Docker — including CI/CD pipelines and GitHub integrations.
          </p>
        </div>
      </div>
    </main>
  );
}

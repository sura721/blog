"use client";
import Lottie from "lottie-react";
import myAnimation from "@/public/Animation.json"; 
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Code,
  Palette,
  Rocket,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const blogCategories = [
  {
    icon: Code,
    title: "Full-Stack Dev Tips",
    description:
      "Hands-on guides and best practices for building modern apps with Next.js, MongoDB, Prisma, and more.",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: Palette,
    title: "UI/UX & Frontend",
    description:
      "Clean, responsive design techniques with Tailwind CSS, accessibility tips, and UX patterns that work.",
    color: "from-sky-500 to-indigo-500",
  },
  {
    icon: Rocket,
    title: "Tools & Tech Insights",
    description:
      "Breakdowns of powerful dev tools, latest frameworks, Git workflows, and staying productive as a developer.",
    color: "from-yellow-500 to-orange-400",
  },
];

type FeaturedPost = {
  category: string;
  title: string;
  excerpt: string;
  slug: string;
};

interface IntroPageClientProps {
  featuredPosts: FeaturedPost[];
}

export function IntroPageClient({ featuredPosts }: IntroPageClientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full bg-background text-foreground overflow-x-hidden">
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight bg-gradient-to-br from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Sura&apos;s Blog
              </h1>
              <h2 className="text-4xl md:text-6xl font-mono tracking-tighter text-foreground mt-2">
                A Journey Through Code
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              A collection of thoughts, tutorials, and deep dives into modern
              web development, design, and tech innovation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
            >
              <Button
                asChild
                size="lg"
                className="group"
                style={{
                  background: "linear-gradient(to right, #2563eb, #9333ea)",
                  color: "white",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                <Link href="/posts">
                  Explore All Posts{" "}
                  <Sparkles className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:scale-125" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/about">
                  About Me{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}
                      >
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Articles
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                Here are a few of my favorite posts. Dive in and start exploring
                the content.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <Card className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <Badge variant="secondary" className="w-fit mb-4">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-2 text-foreground flex-grow">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="focus:outline-none"
                        >
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                          {post.slug}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto text-primary text-sm font-semibold flex items-center">
                        Read More{" "}
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

<section className="py-24 sm:py-32 px-4 bg-muted/20">
  <div className="max-w-4xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Recommended Templates
      </h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
        A curated list of high-quality templates and components that I
        use and recommend for building modern web applications.
      </p>
      <div className="bg-background/50 p-12 rounded-2xl border-2 border-dashed border-border/50">
   <Lottie
  animationData={myAnimation}
  loop={true}
  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto mb-6"
/>
        <h3 className="text-2xl font-semibold mb-2">
          Template Showcase Area
        </h3>
        <Button asChild className="mt-6">
          <Link href="https://lottiefiles.com/" target="blank">Browse Templates</Link>
        </Button>
      </div>
    </motion.div>
  </div>
</section>
      </div>
    </div>
  );
}

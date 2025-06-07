"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import HandModel from "./_components/HandModel";
import Lookup from "./data/Lookup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const features = Lookup.features;

  const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];
 
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
 
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
 

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        mounted && theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
          : "bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900"
      }`}
    >
     

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between px-8 md:py-30 max-w-7xl mx-auto md:h-screen">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left md:mb-12 lg:mb-0 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            Decode Your <span className="text-teal-600">Future</span> <br />
            from Your <span className="text-stone-500">Palm</span>
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
            Upload your palm image and let our AI unravel mysteries of your destiny, relationships, career, and life path.
          </p>

          <Link href="/readings">
          <Button size="lg" className="mt-6 rounded-2xl font-medium text-lg cursor-pointer">
             Try Now
          </Button>
          </Link>
        </div>

        {/* 3D Hand */}
        <div className=" h-[450px] hidden md:flex items-center xl:mr-20">
         <HandModel/>
        </div>
      </section>

      {/* Features Section */}
      <section className="">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Why Choose HastAI?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="rounded-2xl overflow-hidden"
              >
                <Card className="shadow-xl">
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-4">
                      {feature.badge}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Marquee Section */}

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
      


      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-700/30 dark:border-gray-200/10 mt-12">
        © {new Date().getFullYear()} HastAI — All rights reserved.
      </footer>
    </div>
  );
}

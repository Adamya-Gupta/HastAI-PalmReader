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



export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = Lookup.features;

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
      


      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-700/30 dark:border-gray-200/10 mt-12">
        © {new Date().getFullYear()} HastAI — All rights reserved.
      </footer>
    </div>
  );
}

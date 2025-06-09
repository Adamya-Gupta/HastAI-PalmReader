"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Shield, Coffee, Sparkles, Zap, Lock, Clock, Gift, Upload, ChevronRight,  } from "lucide-react";

import HandModel from "./_components/HandModel";
import Lookup from "./data/Lookup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

// Icon mapping for features
const featureIcons = {
  "AI-Powered": Sparkles,
  "Private": Lock,
  "Instant": Zap,
  "Fun": Coffee,
  "Free": Gift,
  "Easy": Upload
};

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = Lookup.features;
  const readingTypes = Lookup.readingTypes;

  const stats = [
    { number: "10K+", label: "Palm Readings" },
    { number: "500+", label: "Happy Users" },
    { number: "99%", label: "Fun Guaranteed" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        mounted && theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
          : "bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section className="max-md:pt-20 flex flex-col lg:flex-row justify-between px-8 md:py-30 max-w-7xl mx-auto md:h-screen">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left md:mb-12 lg:mb-0 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight"
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
        <div className="h-[450px] hidden lg:flex items-center xl:mr-20">
          <HandModel />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl md:text-4xl font-bold text-teal-600">{stat.number}</div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section - Why Choose HastAI */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Why Choose HastAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the perfect blend of ancient wisdom and cutting-edge AI technology
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // const IconComponent = featureIcons[feature.badge] || Sparkles;
              const IconComponent = featureIcons[feature.badge as keyof typeof featureIcons]|| Sparkles;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800">
                    <CardContent className="p-8 text-center space-y-4">
                      {/* Icon */}
                      <div className="relative">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -top-2 -right-2">
                          <Badge 
                            variant="outline" 
                            className="bg-white dark:bg-gray-800 text-teal-600 border-teal-200 dark:border-teal-800 font-medium px-2 py-1 text-xs shadow-md"
                          >
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover effect decoration */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800">
              <Clock className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                Get your reading in under 30 seconds
              </span>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Reading Types Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            What Can Your Palm Reveal?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {readingTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <div className={`p-3 rounded-full ${type.bgColor} ${type.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{type.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-6">
              <Coffee className="w-12 h-12 text-teal-600" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Built for Fun & Entertainment</h2>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                HastAI was created as a fun project to explore the fascinating world of palmistry using modern AI technology. 
                We wanted to build something entertaining that combines ancient traditions with cutting-edge machine learning.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Whether you're curious about palmistry, want to entertain friends, or simply enjoy exploring new technologies, 
                HastAI offers a unique and engaging experience that's meant to spark conversations and bring smiles.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl  mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-white "
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Explore Your Palm?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who've discovered the fun side of palmistry with AI
            </p>
            <Link href="/readings">
              <Button size="lg" variant="secondary" className="rounded-2xl font-medium text-lg cursor-pointer ">
                Start Your Reading Now <ChevronRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-8 border-t border-gray-700/30 dark:border-gray-200/10 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Important Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-300">Important Disclaimer</h3>
                <div className="text-sm text-yellow-700 dark:text-yellow-200 space-y-1">
                  <p>
                    <strong>{Lookup.disclaimers.main}</strong>
                  </p>
                  <p>{Lookup.disclaimers.scientific}</p>
                  <p>{Lookup.disclaimers.advice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4">About {Lookup.appInfo.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {Lookup.appInfo.description} - {Lookup.appInfo.purpose}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link href="/readings" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 transition-colors">
                  Palm Readings
                </Link>
                <Link href="https://www.wikihow.com/Read-Palms" target="_blank" rel="noopener noreferrer" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 transition-colors">
                  How It Works
                </Link>
                <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/Adamya-Gupta/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 transition-colors">
                 
                  <IconBrandGithub className="w-5 h-5"/>
                </a>
                <a href="https://www.linkedin.com/in/adamya-gupta/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 transition-colors">
                 
                  <IconBrandLinkedin className="w-5 h-5"/>
                </a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Questions or feedback? We'd love to hear from you!
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
            <p>© {new Date().getFullYear()} {Lookup.appInfo.name} — All rights reserved.</p>
            <p className="mt-1">
              Made with ❤️ for entertainment • Not for professional or medical advice
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";
import { useTheme } from "next-themes";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Eye,
  GraduationCap,
  Heart,
  HeartPulse,
  Skull,
  Loader2,
  Sparkles,
  Target,
  Brain,
  TrendingUp,
  Star,
  Calendar,
  FileText,
  Upload,
  Users,
  Award,
  Clock,
  CheckCircle,
  Info,
  Zap,
  Shield,
} from "lucide-react";

import { BorderBeam } from "@/components/magicui/border-beam";

// Icon mapping for different reading types
const readingIcons = {
  "Fate line": Target,
  "Head line": Brain,
  "Heart line": Heart,
  "Life line": HeartPulse,
  "Career": TrendingUp,
  "Love": Heart,
  "Future": Star,
  "Summary": FileText,
};

// Color mapping and badge text for different reading types
const readingDetails = {
  "Fate line": { 
    icon: "text-purple-600", 
    bg: "bg-purple-100 dark:bg-purple-900/30", 
    gradient: "from-purple-500 to-purple-600",
    badge: "Destiny & Purpose"
  },
  "Head line": { 
    icon: "text-blue-600", 
    bg: "bg-blue-100 dark:bg-blue-900/30", 
    gradient: "from-blue-500 to-blue-600",
    badge: "Intelligence & Mind"
  },
  "Heart line": { 
    icon: "text-red-600", 
    bg: "bg-red-100 dark:bg-red-900/30", 
    gradient: "from-red-500 to-red-600",
    badge: "Emotions & Love"
  },
  "Life line": { 
    icon: "text-green-600", 
    bg: "bg-green-100 dark:bg-green-900/30", 
    gradient: "from-green-500 to-green-600",
    badge: "Vitality & Health"
  },
  "Career": { 
    icon: "text-indigo-600", 
    bg: "bg-indigo-100 dark:bg-indigo-900/30", 
    gradient: "from-indigo-500 to-indigo-600",
    badge: "Professional Path"
  },
  "Love": { 
    icon: "text-pink-600", 
    bg: "bg-pink-100 dark:bg-pink-900/30", 
    gradient: "from-pink-500 to-pink-600",
    badge: "Relationships & Romance"
  },
  "Future": { 
    icon: "text-yellow-600", 
    bg: "bg-yellow-100 dark:bg-yellow-900/30", 
    gradient: "from-yellow-500 to-yellow-600",
    badge: "Future Insights"
  },
  "Summary": { 
    icon: "text-teal-600", 
    bg: "bg-teal-100 dark:bg-teal-900/30", 
    gradient: "from-teal-500 to-teal-600",
    badge: "Overall Reading"
  },
};

// Features data for the bottom section
const features = [
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Advanced AI technology analyzes your palm lines with precision",
    color: "text-yellow-600",
    bg: "bg-yellow-100 dark:bg-yellow-900/30"
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your images are processed securely and not stored permanently",
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30"
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get your comprehensive palm reading in seconds",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Join thousands who've discovered insights about their future",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30"
  }
];

// Tips for better readings
const tips = [
  "Ensure good lighting when taking your palm photo",
  "Keep your palm flat and fingers slightly spread",
  "Take the photo from directly above your palm",
  "Make sure all major lines are clearly visible"
];

export default function Readings() {
  const [files, setFiles] = useState<File[]>([]);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    console.log(files);
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      setLoading(true);
      setAiResponse(null); // clear previous response
      const response = await axios.post("/api/ai-readings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("AI Response:", response.data);
      setAiResponse(response.data);
    } catch (error) {
      console.error("Error sending file to API:", error);
      setAiResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headings = [
    "Fate line",
    "Head line",
    "Heart line",
    "Life line",
    "Career",
    "Love",
    "Future",
    "Summary",
  ];

  const Icons = {
    eye: () => <Eye className="text-orange-600 dark:text-black " />,
    life: () => <HeartPulse className="text-green-600 dark:text-black" />,
    study: () => <GraduationCap className="text-blue-600 dark:text-black" />,
    heart: () => <Heart className="text-red-600 dark:text-black" />,
    fate: () => <Skull className="text-purple-600 dark:text-black" />,
  };

  return (
    <div
      className={`min-h-screen ${mounted && theme === "dark"
        ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
        : "bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900"
        }`}
    >
      <div className="flex flex-col items-center px-6 py-12 max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Discover Your Future
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text p-4 text-transparent">
            AI Palm Reading
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upload a photo of your palm and let our advanced AI reveal insights about your personality, 
            future, and life path through the ancient art of palmistry.
          </p>
        </motion.div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
          {/* Orbiting Circles + Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex w-full aspect-square flex-col items-center justify-center overflow-hidden"
          >
            {/* Outer Ring */}
            <OrbitingCircles
              iconSize={mounted ? (window.innerWidth < 768 ? 30 : 35) : 35}
              radius={mounted ? (window.innerWidth < 768 ? 150 : 220) : 220}
              className="dark:bg-teal-400 items-center"
            >
              <Icons.heart />
              <Icons.eye />
              <Icons.life />
              <Icons.study />
              <Icons.fate />
            </OrbitingCircles>

            <div className="flex items-center justify-center z-10">
              {mounted && theme === "dark" ? (
                <Image
                  src="/NewLines.png"
                  alt="darkimage"
                  width={250}
                  height={100}
                  className="rounded-xl max-sm:w-[22vh] max-md:w-[25vh] w-65 h-auto "
                  priority={true}
                />
              ) : (
                <Image
                  src="/HandLines.png"
                  alt="handimage"
                  width={250}
                  height={100}
                  className="rounded-xl max-sm:w-[22vh] max-md:w-[25vh] w-65 h-auto"
                  priority={true}
                />
              )}
            </div>

            {/* Inner Ring */}
            <OrbitingCircles
              iconSize={mounted ? (window.innerWidth < 768 ? 25 : 30) : 30}
              radius={mounted ? (window.innerWidth < 768 ? 120 : 180) : 180}
              reverse
              speed={2}
              className="dark:bg-green-400 items-center justify-center "
            >
              <Icons.heart />
              <Icons.fate />
              <Icons.life />
              <Icons.study />
            </OrbitingCircles>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="w-full max-w-xl mx-auto border border-dashed bg-white dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-center">
              <FileUpload onChange={handleFileUpload} />
            </div>
            
            {/* Tips Card */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Tips for Best Results</h3>
                </div>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section - Only show when no reading is active */}
        {!loading && !aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our AI Palm Reading?</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the perfect blend of ancient wisdom and modern technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-2 mt-8"
          >
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
            <p className="text-lg font-medium">Analyzing your palm...</p>
          </motion.div>
        )}

        {/* AI Response as Enhanced Cards */}
        {!loading && aiResponse && (
          <div className="w-full">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Your Reading
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Your Palm Reading Results
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover what your palm reveals about your life, personality, and future
              </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {headings.map((heading, index) => {
                if (!aiResponse[heading]) return null;
                
                const IconComponent = readingIcons[heading as keyof typeof readingIcons] || Sparkles;
                const details = readingDetails[heading as keyof typeof readingDetails] || readingDetails["Summary"];
                
                return (
                  <motion.div
                    key={heading}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="group "
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 relative overflow-hidden">
                      <CardContent className="p-6 space-y-4  z-10">
                        {/* Header with Icon */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${details.gradient} flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <Badge 
                                variant="outline" 
                                className={`${details.bg} ${details.icon} border-current font-medium text-xs`}
                              >
                                {details.badge}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">
                          {heading}
                        </h4>

                        {/* Content */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {aiResponse[heading]}
                        </p>

                        {/* Subtle hover effect overlay - Fixed opacity and positioning */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${details.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none`} />
                        
                  
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom decoration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Reading completed • For entertainment purposes only
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
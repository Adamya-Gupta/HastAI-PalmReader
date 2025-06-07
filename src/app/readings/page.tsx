"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";
import { useTheme } from "next-themes";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { CircleHelp, Eye, GraduationCap, Hand, Heart, HeartPulse, Skull, Smile } from "lucide-react";


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
    "Life line",
    "Career",
    "Love",
    "Future",
    "Summary",
  ];

  const Icons = {
   
    eye: () => (
      <Eye className="text-orange-600 dark:text-black"/>
    ),
    life: () => (
      <HeartPulse className="text-green-600 dark:text-black" />
    ),
    study: () => (
      <GraduationCap className="text-blue-600 dark:text-black"/>
    ),
    heart: () => (
      <Heart className="text-red-600 dark:text-black" />
    ),
    fate: () => (
      <Skull className="text-purple-600 dark:text-black"/>
    )
  };

  return (
    <div
      className={`min-h-screen ${mounted && theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
          : "bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900"
        }`}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-12 max-w-7xl mx-auto"
      >
        {/* Left Section */}
        {/* <div className="flex items-center justify-center ">
          {mounted && theme === "dark"?
          (<Image
            src="/HandLines.png"
            alt="handimage"
            width={300}
            height={100}
            className="rounded-xl  border"
          />):(
            <Image
            src="/HandLines.png"
            alt="handimage"
            width={300}
            height={100}
            className="rounded-xl"/>
          )}
        </div> */}

        {/* Middle Section */}
       

        {/* Right Section */}
        <div className="sticky top-20">
          {loading && (
            <p className="text-center font-semibold text-lg">
              Loading AI Response...
            </p>
          )}

          {!loading && aiResponse && (
            <div className="p-4 bg-white dark:bg-black border rounded space-y-4">
              <h3 className="text-xl font-bold mb-4 text-center">AI Palm Reading</h3>
              {headings.map((heading) => (
                aiResponse[heading] && (
                  <div key={heading} className="border-b pb-2">
                    <h4 className="font-semibold text-lg mb-1">{heading}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {aiResponse[heading]}
                    </p>
                  </div>
                )
              ))}
            </div>
          )}

          
            
             <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                {/* Outer Circle */}
                <OrbitingCircles iconSize={40} className="dark:bg-teal-400" radius={230} >
                  <Icons.heart />
                  <Icons.eye />
                  <Icons.life />
                  <Icons.study />
                  <Icons.fate />
                </OrbitingCircles>
                {/* <Hand /> */}
              <div className="flex items-center justify-center ">
          {mounted && theme === "dark"?
          (<Image
            src="/NewLines.png"
            alt="handimage"
            width={250}
            height={100}
            className="rounded-xl "
          />):(
            <Image
            src="/HandLines.png"
            alt="handimage"
            width={250}
            height={100}
            className="rounded-xl"/>
          )}
        </div>
                {/* Inner Circle */}
                <OrbitingCircles iconSize={30} radius={190} reverse speed={2} className="dark:bg-green-400 ">
                  <Icons.heart />
                  <Icons.fate />
                  <Icons.life />
                  <Icons.study />
                </OrbitingCircles>
              </div>

            {/* {!loading && !aiResponse && (
            <>
            </>
           
          )} */}

        </div>
           <div className="w-full max-w-xl mx-auto border border-dashed bg-white dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
          <FileUpload onChange={handleFileUpload} />
        </div>

      </div> {/*Grid Div*/}
    </div> 
  );
}


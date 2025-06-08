// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FileUpload } from "@/components/ui/file-upload";
// import Image from "next/image";
// import { useTheme } from "next-themes";
// import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
// import {
//   Eye,
//   GraduationCap,
//   Heart,
//   HeartPulse,
//   Skull,
//   Loader2,
// } from "lucide-react";

// import { BorderBeam } from "@/components/magicui/border-beam";

// export default function Readings() {
//   const [files, setFiles] = useState<File[]>([]);
//   const [aiResponse, setAiResponse] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = async (files: File[]) => {
//     setFiles(files);
//     console.log(files);
//     if (files.length === 0) return;

//     const formData = new FormData();
//     formData.append("file", files[0]);

//     try {
//       setLoading(true);
//       setAiResponse(null); // clear previous response
//       const response = await axios.post("/api/ai-readings", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("AI Response:", response.data);
//       setAiResponse(response.data);
//     } catch (error) {
//       console.error("Error sending file to API:", error);
//       setAiResponse(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   const headings = [
//     "Fate line",
//     "Head line",
//     "Heart line",
//     "Life line",
//     "Career",
//     "Love",
//     "Future",
//     "Summary",
//   ];

//   const Icons = {
//     eye: () => <Eye className="text-orange-600 dark:text-black" />,
//     life: () => <HeartPulse className="text-green-600 dark:text-black" />,
//     study: () => <GraduationCap className="text-blue-600 dark:text-black" />,
//     heart: () => <Heart className="text-red-600 dark:text-black" />,
//     fate: () => <Skull className="text-purple-600 dark:text-black" />,
//   };

//   return (
//     <div
//       className={`min-h-screen ${mounted && theme === "dark"
//         ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
//         : "bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900"
//         }`}
//     >
//       <div className="flex flex-col items-center px-6 py-12 max-w-5xl mx-auto space-y-12">
//         {/* Top section: Image + Upload side by side */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-center">
//           {/* Orbiting Circles + Image */}
//           <div className="relative flex w-full aspect-square flex-col items-center justify-center overflow-hidden">
//             {/* Outer Ring */}
//             <OrbitingCircles
//               iconSize={mounted ? (window.innerWidth < 768 ? 30 : 35) : 35}
//               radius={mounted ? (window.innerWidth < 768 ? 150 : 220) : 220}
//               className="dark:bg-teal-400 items-center"
//             >
//               <Icons.heart />
//               <Icons.eye />
//               <Icons.life />
//               <Icons.study />
//               <Icons.fate />
//             </OrbitingCircles>

//             <div className="flex items-center  justify-center z-10">
//               {mounted && theme === "dark" ? (
//                 <Image
//                   src="/NewLines.png"
//                   alt="darkimage"
//                   width={250}
//                   height={100}
//                   className="rounded-xl max-md:w-[25vh] w-auto h-auto"
//                   priority={true}
//                 />
//               ) : (
//                 <Image
//                   src="/HandLines.png"
//                   alt="handimage"
//                   width={250}
//                   height={100}
//                   className="rounded-xl max-md:w-[25vh] w-auto h-auto"
//                   priority={true}
//                 />
//               )}
//             </div>

//             {/* Inner Ring */}

//             <OrbitingCircles
//               iconSize={mounted ? (window.innerWidth < 768 ? 20 : 30) : 30}
//               radius={mounted ? (window.innerWidth < 768 ? 120 : 180) : 180}
//               reverse
//               speed={2}
//               className="dark:bg-green-400 items-center justify-center"
//             >
//               <Icons.heart />
//               <Icons.fate />
//               <Icons.life />
//               <Icons.study />
//             </OrbitingCircles>
//           </div>

//           {/* Upload Section */}
//           <div className="w-full max-w-xl mx-auto border border-dashed bg-white dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
//             <FileUpload onChange={handleFileUpload} />
//           </div>
//         </div>

//         {/* Loading Spinner */}
//         {loading && (
//           <div className="flex justify-center items-center space-x-2 mt-8">
//             <Loader2 className="animate-spin w-6 h-6 text-primary" />
//             <p className="text-lg font-medium">Analyzing your palm...</p>
//           </div>
//         )}

//         {/* AI Response as Cards */}
//         {!loading && aiResponse && (
//           <>
//             <h3 className="text-2xl font-bold mb-4 text-center">Your Palm Reading</h3>
//             <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
//               {headings.map(
//                 (heading) =>
//                   aiResponse[heading] && (
//                     <div
//                       key={heading}
//                       className="rounded-xl border bg-stone-100 dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 p-4 shadow-md relative"
//                     >
//                       <h4 className="font-bold text-lg mb-2 bg-red-300 dark:bg-teal-400 dark:text-black rounded-xl flex items-center justify-center">{heading}</h4>
//                       <p className="text-sm text-gray-900 dark:text-gray-300 font-medium">
//                         {aiResponse[heading]}
//                       </p>

//                       {mounted && theme === "dark" &&
//                       (
//                       <>
//                       <BorderBeam
//                         duration={6}
//                         size={200}
//                         className="from-transparent via-cyan-600 to-transparent"
//                       />
//                       <BorderBeam
//                         duration={6}
//                         delay={3}
//                         size={200}
//                         className="from-transparent via-stone-500 to-transparent"
//                       />
//                        </> )}

//                     </div>
//                   )
//               )}
//             </div>
//           </>
//         )}


//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";
import { useTheme } from "next-themes";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import {
  Eye,
  GraduationCap,
  Heart,
  HeartPulse,
  Skull,
  Loader2,
} from "lucide-react";

import { BorderBeam } from "@/components/magicui/border-beam";

// Define the type for AI response
interface AIResponse {
  "Fate line"?: string;
  "Head line"?: string;
  "Heart line"?: string;
  "Life line"?: string;
  "Career"?: string;
  "Love"?: string;
  "Future"?: string;
  "Summary"?: string;
  error?: string;
  details?: string;
}

export default function Readings() {
  const [files, setFiles] = useState<File[]>([]);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop width

  // Theme hook with safe fallback
  const themeHook = useTheme();
  const theme = themeHook?.theme || 'light';

  // Safe window width detection
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };
    
    // Set mounted and initial width
    setMounted(true);
    handleResize();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleFileUpload = useCallback(async (uploadedFiles: File[]) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    setFiles(uploadedFiles);
    console.log('Files uploaded:', uploadedFiles);

    // Validate file type
    const file = uploadedFiles[0];
    if (!file?.type?.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);
      setAiResponse(null);
      
      const response = await axios.post("/api/ai-readings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 60 second timeout
      });

      console.log("AI Response:", response.data);
      
      if (response.data?.error) {
        setError(response.data.error);
        return;
      }
      
      setAiResponse(response.data);
    } catch (error: any) {
      console.error("Error sending file to API:", error);
      
      let errorMessage = 'Failed to analyze palm. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setAiResponse(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const headings = [
    "Fate line",
    "Head line",
    "Heart line",
    "Life line",
    "Career",
    "Love",
    "Future",
    "Summary",
  ] as const;

  const Icons = {
    eye: () => <Eye className="text-orange-600 dark:text-black" />,
    life: () => <HeartPulse className="text-green-600 dark:text-black" />,
    study: () => <GraduationCap className="text-blue-600 dark:text-black" />,
    heart: () => <Heart className="text-red-600 dark:text-black" />,
    fate: () => <Skull className="text-purple-600 dark:text-black" />,
  };

  // Safe calculations for responsive design
  const isMobile = windowWidth < 768;
  const outerRadius = isMobile ? 150 : 220;
  const innerRadius = isMobile ? 120 : 180;
  const outerIconSize = isMobile ? 30 : 35;
  const innerIconSize = isMobile ? 20 : 30;

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900">
        <div className="flex flex-col items-center px-6 py-12 max-w-5xl mx-auto space-y-12">
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
          : "bg-gradient-to-b from-stone-200 via-white to-cyan-50 text-gray-900"
      }`}
    >
      <div className="flex flex-col items-center px-6 py-12 max-w-5xl mx-auto space-y-12">
        {/* Top section: Image + Upload side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-center">
          {/* Orbiting Circles + Image */}
          <div className="relative flex w-full aspect-square flex-col items-center justify-center overflow-hidden">
            {/* Outer Ring */}
            <OrbitingCircles
              iconSize={outerIconSize}
              radius={outerRadius}
              className="dark:bg-teal-400 items-center"
            >
              <Icons.heart />
              <Icons.eye />
              <Icons.life />
              <Icons.study />
              <Icons.fate />
            </OrbitingCircles>

            <div className="flex items-center justify-center z-10">
              {theme === "dark" ? (
                <Image
                  src="/NewLines.png"
                  alt="Palm reading in dark theme"
                  width={250}
                  height={100}
                  className="rounded-xl max-md:w-[25vh] w-auto h-auto"
                  priority={true}
                />
              ) : (
                <Image
                  src="/HandLines.png"
                  alt="Palm reading guide"
                  width={250}
                  height={100}
                  className="rounded-xl max-md:w-[25vh] w-auto h-auto"
                  priority={true}
                />
              )}
            </div>

            {/* Inner Ring */}
            <OrbitingCircles
              iconSize={innerIconSize}
              radius={innerRadius}
              reverse
              speed={2}
              className="dark:bg-green-400 items-center justify-center"
            >
              <Icons.heart />
              <Icons.fate />
              <Icons.life />
              <Icons.study />
            </OrbitingCircles>
          </div>

          {/* Upload Section */}
          <div className="w-full max-w-xl mx-auto border border-dashed bg-white dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
            <FileUpload onChange={handleFileUpload} />
            {error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
            <p className="text-lg font-medium">Analyzing your palm...</p>
          </div>
        )}

        {/* AI Response as Cards */}
        {!loading && aiResponse && !error && (
          <>
            <h3 className="text-2xl font-bold mb-4 text-center">Your Palm Reading</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {headings.map((heading) => {
                const content = aiResponse?.[heading];
                if (!content) return null;
                
                return (
                  <div
                    key={heading}
                    className="rounded-xl border bg-stone-100 dark:bg-gray-900 border-neutral-200 dark:border-neutral-800 p-4 shadow-md relative"
                  >
                    <h4 className="font-bold text-lg mb-2 bg-red-300 dark:bg-teal-400 dark:text-black rounded-xl flex items-center justify-center p-2">
                      {heading}
                    </h4>
                    <p className="text-sm text-gray-900 dark:text-gray-300 font-medium">
                      {content}
                    </p>

                    {theme === "dark" && (
                      <>
                        <BorderBeam
                          duration={6}
                          size={200}
                          className="from-transparent via-cyan-600 to-transparent"
                        />
                        <BorderBeam
                          duration={6}
                          delay={3}
                          size={200}
                          className="from-transparent via-stone-500 to-transparent"
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
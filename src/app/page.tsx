"use client";
import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";


export default function Home() {

  const [files, setFiles] = useState<File[]>([]);
  const [aiResponse, setAiResponse] = useState<any>(null); // to store the JSON response
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

      {/* MIDDLe section */}
      <div className="lg:col-span-6">

        <div className=" dark:bg flex items-center justify-center rounded-xl min-h-96">
          <Image src='/DarkLines-Photoroom.png' alt="handimage" width={300} height={100} />
        </div>


        <div className="w-full max-w-xl mx-auto mt-10 min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-xl">
          <FileUpload onChange={handleFileUpload} />
        </div>

      </div>

      {/* ThIRD Section */}
      {/* <div className="hidden lg:block lg:col-span-4 sticky top-20"> */}
      <div className="lg:block lg:col-span-4  sticky top-20">

        {loading && <p>Loading AI Response...</p>}

        {!loading && aiResponse && (
          <div className="p-4 bg-white dark:bg-black border rounded">
            <h3 className="text-lg font-bold mb-2">AI Palm Reading:</h3>
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(aiResponse, null, 2)}
            </pre>
          </div>
        )}

        {!loading && !aiResponse && <p>This is third section here AI will display users response</p>}


      </div>

    </div>
  );
}

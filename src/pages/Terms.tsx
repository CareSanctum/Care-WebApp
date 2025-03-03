import React from "react";
import GeneralHeader from "@/components/GeneralHeader";
import { useEffect, useState } from 'react';
import mammoth from 'mammoth';

const Terms = () => {
    const [termsContent, setTermsContent] = useState<string>("");

    useEffect(() => {
        const loadTerms = async () => {
          try {
            const response = await fetch("/docs/CareSanctum_Terms_of_use.docx");
            const arrayBuffer = await response.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            const formattedHtml = result.value
            .replace(/\n/g, "<br>") // Add line breaks
            .replace(/<p>/g, '<p class="my-4 text-xl leading-relaxed">') // Add spacing to paragraphs
            .replace(/<ul>/g, '<ul class="my-4 text-xl leading-relaxed">')
            .replace(/<h1>/g, '<h1 class="text-5xl font-medium my-12">') // Bigger headings
            .replace(/<h2>/g, '<h2 class="text-3xl font my-8">') // Bigger subheadings
            setTermsContent(formattedHtml);
          } catch (error) {
            console.error("Error loading terms:", error);
          }
        };
    
        loadTerms();
      }, [])

    return(
        <div>
            <GeneralHeader />
            <div className="flex justify-center p-4">
                <div className="max-w-4xl w-full" dangerouslySetInnerHTML={{ __html: termsContent }} />
            </div>
        </div>
    );

}

export default Terms;
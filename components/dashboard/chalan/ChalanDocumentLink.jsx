"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaDownload } from 'react-icons/fa'
import { generateChalanPdf } from './generateChalanPdf'

const ChalanDownloadLink = ({ data, state }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generateChalanPdf(data, state);
        } catch (error) {
            alert("Failed to generate PDF. Make sure html2canvas is installed.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button onClick={handleDownload} disabled={isGenerating}>
            <FaDownload className="mr-1" />
            {isGenerating ? 'Generating...' : 'Download'}
        </Button>
    )
}

export default ChalanDownloadLink
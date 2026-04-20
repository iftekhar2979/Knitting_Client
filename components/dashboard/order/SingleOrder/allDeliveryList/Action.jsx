"use client";

import { FaDownload } from "react-icons/fa6";
import { useState } from "react";
import { generateChalanPdf } from "@/components/dashboard/chalan/generateChalanPdf";

const Action = ({ id, data }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            // Using the new stable HTML-to-PDF utility
            await generateChalanPdf(data, { id, chalanName: `Chalan Number ${id}.pdf` });
        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Failed to generate PDF. Please ensure html2canvas is installed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex' >
            <div onClick={!loading ? handleDownload : undefined} className={!loading ? "cursor-pointer" : ""}>
                {loading ? 'Downloading...' : <FaDownload size={24} color={"green"} />}
            </div>
        </div>
    )
};

export default Action;
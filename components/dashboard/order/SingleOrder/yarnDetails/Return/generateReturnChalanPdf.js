"use client"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { createRoot } from 'react-dom/client'
import ReturnChalanTemplate from './ReturnChalanTemplate'

/**
 * Programmatically generates and downloads the Return Chalan PDF.
 */
export const generateReturnChalanPdf = async (data, anotherInfo, id) => {
    if (typeof html2canvas !== 'function') {
        console.error("html2canvas not found.");
        alert("CRITICAL ERROR: html2canvas library is missing.");
        return;
    }

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px'; 
    document.body.appendChild(container);

    const root = createRoot(container);
    
    return new Promise((resolve, reject) => {
        root.render(<ReturnChalanTemplate data={data} anotherInfo={anotherInfo} id={id} />);

        setTimeout(async () => {
            try {
                const canvas = await html2canvas(container, {
                    scale: 3,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: '#ffffff',
                    logging: false
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
                pdf.save(`Return-Chalan-${id || 'doc'}.pdf`);

                setTimeout(() => {
                    root.unmount();
                    if (document.body.contains(container)) document.body.removeChild(container);
                }, 100);
                resolve();
            } catch (error) {
                console.error("PDF Generation failed:", error);
                root.unmount();
                if (document.body.contains(container)) document.body.removeChild(container);
                reject(error);
            }
        }, 800); 
    });
};

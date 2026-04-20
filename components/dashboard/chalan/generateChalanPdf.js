"use client"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { createRoot } from 'react-dom/client'
import ChalanTemplate from './ChalanTemplate'

/**
 * Programmatically generates and downloads the Chalan PDF.
 * This renders a hidden instance of the ChalanTemplate to ensure perfect styling
 * without interfering with the main UI.
 */
export const generateChalanPdf = async (data, state) => {
    // Check if html2canvas is available before proceeding
    if (typeof html2canvas !== 'function') {
        console.error("html2canvas not found. Please run 'npm install html2canvas'");
        alert("CRITICAL ERROR: html2canvas library is missing. Please install it with 'npm install html2canvas' and restart your dev server.");
        return;
    }

    // Create a hidden container with explicit width for A4 layout
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px'; // Force standard A4 capture width
    document.body.appendChild(container);

    const root = createRoot(container);
    
    return new Promise((resolve, reject) => {
        // Render the template
        root.render(<ChalanTemplate data={data} state={state} />);

        // Give React a moment to render (Increased to 800ms for better stability)
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
                pdf.save(state?.chalanName || `Chalan-${state?.id || 'doc'}.pdf`);

                // Cleanup
                setTimeout(() => {
                    root.unmount();
                    if (document.body.contains(container)) document.body.removeChild(container);
                }, 100);
                resolve();
            } catch (error) {
                console.error("PDF Generation failed:", error);
                // Cleanup even on failure
                root.unmount();
                if (document.body.contains(container)) document.body.removeChild(container);
                reject(error);
            }
        }, 800); 
    });
};

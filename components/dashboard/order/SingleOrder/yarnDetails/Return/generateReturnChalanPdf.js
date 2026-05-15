"use client"

import jsPDF from "jspdf";
import { format } from "date-fns";
import { companyInformation } from "@/contents/companyInformation";

const valueOrDash = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    return String(value);
};

const formatDate = (date) => {
    if (!date) return "N/A";

    try {
        return format(new Date(date), "PP");
    } catch {
        return "N/A";
    }
};

export const generateReturnChalanPdf = async (data, anotherInfo, id) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const chalanId = id || data?.id || "doc";
    const returnQuantity = Number(data?.returnQuantity) || 0;
    const westQuantity = Number(data?.westQuantity) || 0;
    const totalQuantity = returnQuantity + westQuantity;
    const yarnDescription = anotherInfo?.descriptionOfYarn || anotherInfo?.yarnType || "Yarn";

    doc.setTextColor(0, 0, 0);
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text(companyInformation?.name || "Tertiary Colour Knit Fabrics", pageWidth / 2, 16, { align: "center" });

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.text(companyInformation?.intro || "", pageWidth / 2, 22, { align: "center" });
    doc.text(companyInformation?.location || "", pageWidth / 2, 27, { align: "center" });

    doc.setLineWidth(0.3);
    doc.line(margin, 32, pageWidth - margin, 32);

    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.rect(pageWidth / 2 - 31, 38, 62, 9);
    doc.text("RETURN CHALLAN", pageWidth / 2, 44, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("times", "bold");
    doc.text("Company Name", margin, 59);
    doc.text("Address", margin, 66);
    doc.text("Fabric Type", margin, 73);
    doc.text("Date", 122, 59);
    doc.text("Challan No", 122, 66);
    doc.text("Gate Pass No", 122, 73);
    doc.text("Through By", 122, 80);
    doc.text("Vehicle No", 122, 87);

    doc.setFont("times", "normal");
    doc.text(`: ${valueOrDash(anotherInfo?.company?.companyName)}`, 45, 59);
    doc.text(`: ${valueOrDash(anotherInfo?.company?.location)}`, 45, 66);
    doc.text(`: ${valueOrDash(anotherInfo?.yarnType)}`, 45, 73);
    doc.text(`: ${formatDate(data?.createdAt)}`, 151, 59);
    doc.text(`: ${valueOrDash(chalanId)}`, 151, 66);
    doc.text(": __________________", 151, 73);
    doc.text(`: ${valueOrDash(data?.deliveredBy)}`, 151, 80);
    doc.text(`: ${valueOrDash(data?.vechileNumber)}`, 151, 87);

    const tableTop = 99;
    const rowHeight = 86;
    const totalRowHeight = 10;
    const colX = [margin, margin + 12, margin + 112, margin + 134, margin + contentWidth];

    doc.setLineWidth(0.25);
    doc.rect(margin, tableTop, contentWidth, rowHeight + totalRowHeight);
    colX.slice(1, -1).forEach((x) => doc.line(x, tableTop, x, tableTop + rowHeight + totalRowHeight));
    doc.line(margin, tableTop + 10, margin + contentWidth, tableTop + 10);
    doc.line(margin, tableTop + rowHeight, margin + contentWidth, tableTop + rowHeight);

    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text("SL.", margin + 6, tableTop + 6, { align: "center" });
    doc.text("Description of Yarn", margin + 62, tableTop + 6, { align: "center" });
    doc.text("Roll", margin + 123, tableTop + 6, { align: "center" });
    doc.text("Quantity (KG)", margin + 158, tableTop + 6, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text("1", margin + 6, tableTop + 18, { align: "center" });
    doc.text(doc.splitTextToSize(yarnDescription, 90), margin + 16, tableTop + 18);
    doc.text("Process Loss", margin + 16, tableTop + 62);
    doc.text(data?.role ? `${data.role} R` : "-", margin + 123, tableTop + 40, { align: "center" });
    doc.text(valueOrDash(returnQuantity), margin + 158, tableTop + 18, { align: "center" });
    doc.text(valueOrDash(westQuantity), margin + 158, tableTop + 62, { align: "center" });

    doc.setFont("times", "bold");
    doc.text("Total :", margin + 106, tableTop + rowHeight + 7, { align: "right" });
    doc.text(data?.role ? `${data.role} R` : "-", margin + 123, tableTop + rowHeight + 7, { align: "center" });
    doc.text(valueOrDash(totalQuantity), margin + 158, tableTop + rowHeight + 7, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.text("Receive the above in good condition.", margin, 209);

    const signatureY = 244;
    const signatureWidth = 38;
    const signatures = [
        { label: "Checked & Received", x: margin },
        { label: "Store Manager", x: margin + 48 },
        { label: "Factory Manager / Knitting Manager", x: margin + 96 },
        { label: "Authorized Signature", x: margin + 144 },
    ];

    doc.setFontSize(8);
    signatures.forEach(({ label, x }) => {
        doc.line(x, signatureY, x + signatureWidth, signatureY);
        doc.text(label, x + signatureWidth / 2, signatureY + 5, { align: "center", maxWidth: signatureWidth });
    });

    doc.setFont("times", "italic");
    doc.setFontSize(8);
    doc.text(`${companyInformation?.name || ""} - Computer Generated Official Return Document`, pageWidth / 2, 286, { align: "center" });

    doc.save(`Return-Chalan-${chalanId}.pdf`);
};

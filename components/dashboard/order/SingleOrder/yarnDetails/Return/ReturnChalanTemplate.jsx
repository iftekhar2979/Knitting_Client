"use client"
import React from 'react'
import { format } from 'date-fns'
import { companyInformation } from '@/contents/companyInformation'

const ReturnChalanTemplate = ({ data, anotherInfo, reference, id: chalanId }) => {
    if (!data) return null;

    const { createdAt, returnQuantity, westQuantity, deliveredBy, role, vechileNumber, id: entryId } = data
    const displayId = chalanId || entryId

    return (
        <div
            ref={reference}
            className="bg-white p-8 mx-auto shadow-lg print:shadow-none print:p-0"
            style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Times New Roman', Times, serif" }}
        >
            {/* Header Section */}
            <div className="flex flex-col items-center border-b-2 border-black pb-4 mb-6">
                <img 
                    src="https://i.postimg.cc/856PDK8d/16dfcbd5-c7a3-49ce-ba66-09788c7d252f.png" 
                    alt="Company Logo" 
                    className="h-16 mb-2" 
                    crossOrigin="anonymous"
                />
                {/* <h1 className="text-3xl font-extrabold uppercase text-center tracking-tight">{companyInformation?.name}</h1>
                <p className="text-xs text-center italic">{companyInformation?.location}</p>
                <p className="text-xs text-center font-medium">{companyInformation?.intro}</p>
                <p className="text-xs text-center">Mobile: {companyInformation?.contact} | Email: {companyInformation?.email}</p> */}
            </div>

            {/* Title & Unit */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold border-2 border-black inline-block px-6 py-1 mb-1">RETURN CHALLAN</h2>
                {/* <p className="text-lg font-semibold italic">({anotherInfo?.unit || "Unit"})</p> */}
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
                <div className="space-y-1">
                    <p><span className="font-bold w-32 inline-block text-gray-700">Company Name</span>: <span className="font-semibold">{anotherInfo?.company?.companyName}</span></p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Address</span>: {anotherInfo?.company?.location}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Fabric Type</span>: {anotherInfo?.yarnType}</p>
                </div>
                <div className="space-y-1 pl-12 border-l border-gray-200">
                    <p><span className="font-bold w-32 inline-block text-gray-700">Date</span>: {createdAt ? format(new Date(createdAt), "PP") : "N/A"}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Challan No</span>: <span className="font-bold text-red-600">{displayId}</span></p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Gate Pass No</span>: ________________</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Through By</span>: {deliveredBy}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Vehicle No</span>: {vechileNumber}</p>
                </div>
            </div>

            {/* Table Section */}
            <table className="w-full border-collapse border border-black mb-8">
                <thead>
                    <tr className="bg-gray-100 uppercase text-xs font-bold">
                        <th className="border border-black px-1 py-2 w-10">SL.</th>
                        <th className="border border-black px-2 py-2">Description of Yarn</th>
                        <th className="border border-black px-1 py-2 w-20">Roll</th>
                        <th className="border border-black px-1 py-2 w-32">Quantity (KG)</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr>
                        <td className="border-x border-black h-[400px] align-top text-center p-1">1</td>
                        <td className="border-x border-black align-top p-4 space-y-4">
                            <p className="font-semibold text-base">{anotherInfo?.descriptionOfYarn}</p>
                            <p className="mt-40 text-gray-600 italic">Process Loss</p>
                        </td>
                        <td className="border-x border-black align-top text-center p-4 font-bold">
                            <div className="h-full flex flex-col justify-between">
                                <div className="mt-40">{role ? `${role} R` : ""}</div>
                                <div className="border-t border-black pt-2 bg-gray-50">{role} R</div>
                            </div>
                        </td>
                        <td className="border-x border-black align-top text-center p-4 font-bold text-lg">
                            <div className="h-full flex flex-col justify-between">
                                <div className="space-y-36">
                                    <div className="pt-2">{returnQuantity}</div>
                                    <div className="text-gray-500 font-normal">{westQuantity}</div>
                                </div>
                                <div className="border-t border-black pt-2 bg-gray-50">
                                    {(Number(returnQuantity) || 0) + (Number(westQuantity) || 0)}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-gray-100 font-bold border-t border-black">
                        <td colSpan={2} className="border border-black px-2 py-2 text-right uppercase">Total : </td>
                        <td className="border border-black px-1 py-2 text-center">{role} R</td>
                        <td className="border border-black px-1 py-2 text-center text-lg">{(Number(returnQuantity) || 0) + (Number(westQuantity) || 0)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Footer Section */}
            <p className="text-sm font-semibold mb-12 italic">Receive the above in good condition.</p>

            <div className="grid grid-cols-4 gap-4 text-[10px] items-end font-bold uppercase text-center mt-auto">
                <div>
                    <div className="border-t border-black pt-1">Checked & Received</div>
                </div>
                <div>
                    <div className="border-t border-black pt-1">Store Manager</div>
                </div>
                <div>
                    <div className="border-t border-black pt-1">Factory Manager / Knitting Manager</div>
                </div>
                <div>
                    <div className="border-t border-black pt-1 px-2">Authorized Signature</div>
                </div>
            </div>

            {/* Watermark/Footer */}
            <div className="mt-8 pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center uppercase tracking-widest italic">
                {companyInformation?.name} - Computer Generated Official Return Document
            </div>
        </div>
    )
}

export default ReturnChalanTemplate

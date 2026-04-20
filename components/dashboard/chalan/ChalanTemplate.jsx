"use client"
import React from 'react'
import { format } from 'date-fns'
import { companyInformation } from '@/contents/companyInformation'

const ChalanTemplate = ({ data, state, reference }) => {
    if (!data) return null;

    const { createdAt, deliveredQuantity, deliveredBy, order, roleQuantity, vechileNumber, id: chalanId } = data
    const { id: displayId } = state || { id: chalanId }

    return (
        <div
            ref={reference}
            className="bg-white p-8 mx-auto shadow-lg print:shadow-none print:p-0"
            style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Times New Roman', Times, serif" }}
        >
            {/* Header Section */}
            <div className="flex flex-col items-center border-b-2 border-black pb-4 mb-6">
                {/* <img 
                    src="https://i.postimg.cc/856PDK8d/16dfcbd5-c7a3-49ce-ba66-09788c7d252f.png" 
                    alt="Company Logo" 
                    className="h-16 mb-2" 
                    crossOrigin="anonymous"
                /> */}
                <h1 className="text-3xl font-extrabold uppercase text-center tracking-tight">{companyInformation?.name}</h1>
                <p className="text-xs text-center italic">{companyInformation?.location}</p>
                <p className="text-xs text-center font-medium">{companyInformation?.intro}</p>
                <p className="text-xs text-center">Mobile: {companyInformation?.contact} | Email: {companyInformation?.email}</p>
            </div>

            {/* Title & Unit */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold border-2 border-black inline-block px-6 py-1 mb-1">DELIVERY CHALLAN</h2>
                <p className="text-lg font-semibold italic">({order?.unit} Unit)</p>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
                <div className="space-y-1">
                    <p><span className="font-bold w-32 inline-block text-gray-700">Company Name</span>: <span className="font-semibold">{order?.company?.companyName}</span></p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Address</span>: {order?.company?.location}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Fabric Type</span>: {order?.fabricsName}</p>
                    {order?.sbNumber && <p><span className="font-bold w-32 inline-block text-gray-700">SB No</span>: {order?.sbNumber}</p>}
                    {order?.bookingNumber && <p><span className="font-bold w-32 inline-block text-gray-700">Booking No</span>: {order?.bookingNumber}</p>}
                    {order?.jobNumber && <p><span className="font-bold w-32 inline-block text-gray-700">Job No</span>: {order?.jobNumber}</p>}
                    {order?.programNumber && <p><span className="font-bold w-32 inline-block text-gray-700">Program No</span>: {order?.programNumber}</p>}
                </div>
                <div className="space-y-1 pl-12 border-l border-gray-200">
                    <p><span className="font-bold w-32 inline-block text-gray-700">Date</span>: {createdAt ? format(new Date(createdAt), "PP") : "N/A"}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Challan No</span>: <span className="font-bold text-red-600">{displayId}</span></p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Gate Pass No</span>: ________________</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Buyer</span>: {order?.buyerName}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Season</span>: {order?.season}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Through By</span>: {deliveredBy}</p>
                    <p><span className="font-bold w-32 inline-block text-gray-700">Vehicle No</span>: {vechileNumber}</p>
                </div>
            </div>

            {/* Table Section */}
            <table className="w-full border-collapse border border-black mb-8">
                <thead>
                    <tr className="bg-gray-100 uppercase text-xs font-bold">
                        <th className="border border-black px-1 py-2 w-10">SL.</th>
                        <th className="border border-black px-2 py-2">Description of Goods</th>
                        <th className="border border-black px-1 py-2 w-16">Roll</th>
                        <th className="border border-black px-1 py-2 w-28">Finish Weight (kg)</th>
                        <th className="border border-black px-1 py-2 w-28">Grey Weight (kg)</th>
                        <th className="border border-black px-1 py-2 w-20">Remark</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr>
                        <td className="border-x border-black h-[450px] align-top text-center p-1">1</td>
                        <td className="border-x border-black align-top p-4 space-y-1">
                            {order?.details?.sl && <p><span className="font-bold">SL:</span> {order?.details?.sl}</p>}
                            {order?.details?.style && <p><span className="font-bold">Style:</span> {order?.details?.style}</p>}
                            {order?.details?.colour && <p><span className="font-bold">Color:</span> {order?.details?.colour}</p>}
                            {order?.details?.f_GSM && <p><span className="font-bold">Fabrics GSM:</span> {order?.details?.f_GSM}</p>}
                            {order?.details?.yarnCount && <p><span className="font-bold">Yarn Count:</span> {order?.details?.yarnCount}</p>}
                            {order?.details?.yarnLot && <p><span className="font-bold">Yarn Lot:</span> {order?.details?.yarnLot}</p>}
                            {order?.details?.yarnBrand && <p><span className="font-bold">Yarn Brand:</span> {order?.details?.yarnBrand}</p>}
                            {order?.details?.lycraCount && <p><span className="font-bold">Lycra Count:</span> {order?.details?.lycraCount}</p>}
                            {order?.details?.lycraLot && <p><span className="font-bold">Lycra Lot:</span> {order?.details?.lycraLot}</p>}
                            {order?.details?.lycraBrand && <p><span className="font-bold">Lycra Brand:</span> {order?.details?.lycraBrand}</p>}
                            {order?.details?.polyStarCount && <p><span className="font-bold">Polyester Count:</span> {order?.details?.polyStarCount}</p>}
                            {order?.details?.polyStarBrand && <p><span className="font-bold">Polyester Brand:</span> {order?.details?.polyStarBrand}</p>}
                            {order?.details?.polyStarLot && <p><span className="font-bold">Polyester Lot:</span> {order?.details?.polyStarLot}</p>}
                            {order?.details?.mc_DIA && <p><span className="font-bold">M/C DIA:</span> {order?.details?.mc_DIA}</p>}
                            {order?.details?.e_DIA && <p><span className="font-bold">F DIA:</span> {order?.details?.e_DIA}</p>}
                        </td>
                        <td className="border-x border-black align-top text-center p-4 font-bold">
                            <div className="h-full flex flex-col justify-between">
                                <div>{roleQuantity} R</div>
                                <div className="border-t border-black pt-2 bg-gray-50">{roleQuantity} R</div>
                            </div>
                        </td>
                        <td className="border-x border-black align-top text-center p-4 font-bold">
                            <div className="h-full flex flex-col justify-between text-lg">
                                <div>{order?.unit === 'Fabric' ? deliveredQuantity : ""}</div>
                                <div className="border-t border-black pt-2 bg-gray-50">{order?.unit === 'Fabric' ? deliveredQuantity : ""}</div>
                            </div>
                        </td>
                        <td className="border-x border-black align-top text-center p-4 font-bold">
                            <div className="h-full flex flex-col justify-between text-lg">
                                <div>{order?.unit !== 'Fabric' ? deliveredQuantity : ""}</div>
                                <div className="border-t border-black pt-2 bg-gray-50">{order?.unit !== 'Fabric' ? deliveredQuantity : ""}</div>
                            </div>
                        </td>
                        <td className="border-x border-black align-top text-center p-4">
                        </td>
                    </tr>
                    <tr className="bg-gray-100 font-bold border-t border-black">
                        <td colSpan={2} className="border border-black px-2 py-2 text-right uppercase">Total : </td>
                        <td className="border border-black px-1 py-2 text-center">{roleQuantity} R</td>
                        <td className="border border-black px-1 py-2 text-center text-lg">{order?.unit === 'Fabric' ? deliveredQuantity : ""}</td>
                        <td className="border border-black px-1 py-2 text-center text-lg">{order?.unit !== 'Fabric' ? deliveredQuantity : ""}</td>
                        <td className="border border-black px-1 py-2"></td>
                    </tr>
                </tbody>
            </table>

            {/* Footer Section */}
            <p className="text-sm font-semibold mb-12 italic">Received the above in good condition.</p>

            <div className="grid grid-cols-4 gap-4 text-[10px] items-end font-bold uppercase text-center">
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
                {companyInformation?.name} - Computer Generated Official Delivery Document
            </div>
        </div>
    )
}

export default ChalanTemplate

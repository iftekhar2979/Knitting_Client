"use client"
import React from 'react'
import ChalanTemplate from './ChalanTemplate'

const ChalanViewer = ({ data, state, reference }) => {
    if (!data || !state) return null;

    return (
        <div className="w-full h-full border rounded-lg bg-gray-100 overflow-auto p-4 flex justify-center shadow-inner">
            <div className="transform scale-[0.65] origin-top sm:scale-[0.8] md:scale-100">
                <ChalanTemplate data={data} state={state} reference={reference} />
            </div>
        </div>
    )
}

export default ChalanViewer
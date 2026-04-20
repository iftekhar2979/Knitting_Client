"use client"
import React from 'react';
import { cn } from '@/lib/utils';

function Radio({ label, handleRadioChange, selectedValue, array }) {
    return (
        <div className="w-full">
            {label && (
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                    {label}
                </label>
            )}
            <div className="flex items-center space-x-6">
                {array?.map((item, i) => {
                    const isSelected = selectedValue === item;
                    return (
                        <label 
                            key={i} 
                            className={cn(
                                "flex items-center space-x-3 cursor-pointer group transition-all duration-200",
                                isSelected ? "text-emerald-600 font-medium" : "text-gray-600 dark:text-gray-400 hover:text-emerald-500"
                            )}
                        >
                            <div className="relative flex items-center justify-center">
                                <input 
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 dark:border-gray-700 checked:border-emerald-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20" 
                                    type="radio" 
                                    name="radio-group" 
                                    required 
                                    value={item} 
                                    checked={isSelected} 
                                    onChange={() => handleRadioChange({ type: 'unit', item: item })} 
                                />
                                <div className="absolute h-2.5 w-2.5 scale-0 rounded-full bg-emerald-500 transition-transform peer-checked:scale-100" />
                            </div>
                            <span className="text-base">{item}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default Radio;
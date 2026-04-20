"use client"
import React, { memo } from 'react';
import { cn } from '@/lib/utils';

const InputDropDown = ({ 
    handleInputDropdown, 
    sectionName, 
    options, 
    label, 
    placeholder, 
    divclass, 
    defaultValue, 
    className, 
    labelblock 
}) => {
    return (
        <div className={cn("space-y-2", divclass)}>
            {!labelblock && (
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={cn(
                        "pr-10 cursor-pointer focus:outline-none",
                        className
                    )}
                    name={sectionName}
                    onChange={handleInputDropdown}
                    defaultValue={defaultValue || placeholder}
                    required
                >
                    <option disabled value={placeholder}>{placeholder}</option>
                    {Array.isArray(options) && options?.map((option, index) => (
                        <option className="py-2" key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default memo(InputDropDown);
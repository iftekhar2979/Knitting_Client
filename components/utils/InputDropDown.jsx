"use client"
import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

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
    // Compatibility layer: simulate a standard React event object
    const onValueChange = (val) => {
        if (handleInputDropdown) {
            handleInputDropdown({
                target: {
                    name: sectionName,
                    value: val
                }
            });
        }
    };

    return (
        <div className={cn("space-y-2", divclass)}>
            {!labelblock && (
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <Select 
                onValueChange={onValueChange} 
                defaultValue={defaultValue} 
                name={sectionName}
            >
                <SelectTrigger className={cn("w-full h-11 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-lg transition-all duration-200", className)}>
                    <SelectValue placeholder={placeholder || "Select option"} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    {Array.isArray(options) && options?.map((option, index) => (
                        <SelectItem 
                            key={index} 
                            value={option}
                            className="cursor-pointer focus:bg-emerald-50 focus:text-emerald-900 dark:focus:bg-emerald-900/30 dark:focus:text-emerald-400"
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default memo(InputDropDown);
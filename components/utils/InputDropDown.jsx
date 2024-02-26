"use client"
import React, { memo } from 'react';

const InputDropDown = ({handleInputDropdown,sectionName,options,label,placeholder,divclass,defaultValue,className,labelblock,prevSelected}) => {
  return (
        <>
         <div className={divclass}>
        {!labelblock && <label className='label'>{label}</label>}
              <select
                className={className}
                name={sectionName}
                onChange={handleInputDropdown}
                defaultValue={defaultValue}
                required
               
                >
                     <option disabled selected>{placeholder}</option> 
                {Array.isArray(options)&& options?.map((option,index) => (
                  <option className='cursor-pointer' key={index} value={option} >{option}</option>
                ))}
              </select>
            </div>
        </>
    );
};

export default memo(InputDropDown);
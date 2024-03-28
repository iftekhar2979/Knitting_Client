"use client"
import React, { memo, useState } from 'react';
import TableHeading from './TableHeading';


const Table = ({ tableHeadings, tableData, children }) => {

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-2 my-2  overflow-x-hidden">
            <table className="w-full text-sm border text-left bg-white text-gray-500 dark:text-gray-400">
                <thead className="text-xs  text-black uppercase bg-white  dark:bg-gray-700 dark:text-gray-400">
                    <tr className='border text-[9pt] '>
                        {tableHeadings && tableHeadings?.map(heading => <TableHeading key={heading.id} headings={heading.heading} className={heading.class}></TableHeading>)}
                    </tr>
                </thead>
                <tbody className='bg-white'>{
                    children
                }
                </tbody>

            </table>
        </div>
    );
};

export default memo(Table);
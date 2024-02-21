import react from 'react';
import DemoPage from "@/components/dashboard/company/Companies";

const company = (props) => {
    return (
        <div>
            
            <div className='flex justify-center w-full'>
                <h1 className='px-4 text-2xl font-bold mt-4  text-center'>Company Details</h1>
            </div>
            <DemoPage />
        </div>
    )
};
export default company;
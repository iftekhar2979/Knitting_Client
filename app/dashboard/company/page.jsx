import react from 'react';
import DemoPage from "@/components/dashboard/company/Companies";
export const metadata = {
    title: "Companies of Teritiary Colour Knit",
    description: "Add Subscribed Company for Teritiary Colour knit",
  };
  
const company = (props) => {
    return (
        <div className='pl-8 py-4'>
            <div className='flex justify-center w-full'>
                <h1 className='px-4 text-2xl font-bold mt-4  text-center'>Company Details</h1>
            </div>
            <DemoPage />
        </div>
    )
};
export default company;
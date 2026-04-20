import react from 'react';
import DemoPage from "@/components/dashboard/company/Companies";
export const metadata = {
    title: "Companies of Teritiary Colour Knit",
    description: "Add Subscribed Company for Teritiary Colour knit",
};

const company = (props) => {
    return (
        <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center md:text-left border-b border-gray-100 pb-8">
                <h1 className="text-3xl font-extrabold text-brand-green tracking-tight sm:text-4xl">
                    Company Management
                </h1>
                <p className="mt-3 text-lg text-gray-500 max-w-3xl">
                    View and manage all your companies, their locations, and contact information.
                    Manage buyers and maintain strong business relationships in one unified view.
                </p>
            </div>

            <div className="w-full">
                <DemoPage />
            </div>
        </section>
    )
};
export default company;
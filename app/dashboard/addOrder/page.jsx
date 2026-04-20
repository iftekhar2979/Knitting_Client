import { AddOrder } from '@/components/dashboard/addOrder/AddOrder';
import { HiHome, HiChevronRight, HiPlusCircle } from 'react-icons/hi';

export const metadata = {
    title: "Add Order | Tertiary Colour Knit",
    description: "Create a new order for Tertiary Colour Knit",
};

const Page = () => {
    return (
        <section className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center hover:text-emerald-600 transition-colors cursor-pointer">
                    <HiHome className="mr-1" />
                    <span>Dashboard</span>
                </div>
                <HiChevronRight className="text-gray-400" />
                <div className="flex items-center text-emerald-600 font-medium">
                    <HiPlusCircle className="mr-1" />
                    <span>Add Order</span>
                </div>
            </nav>

            {/* Page Header */}
            <div className="mb-8 overflow-hidden">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
                    Add New Order
                </h1>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                    Configure and launch a new production order. Track all manufacturing details from a single interface.
                </p>
                <div className="mt-4 h-1 w-20 bg-emerald-500 rounded-full"></div>
            </div>

            {/* Main Component Wrapper */}
            <div className="max-w-6xl mx-auto">
                <AddOrder />
            </div>
        </section>
    );
};

export default Page;
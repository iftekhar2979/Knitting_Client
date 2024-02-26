
import Navbar from '@/components/dashboard/order/SingleOrder/Navbar';
const layout = ({ children }) => {

    return (
        <section className='flex justify-center flex-col'>
            <Navbar />
            <section className='my-4'>
                {children}
            </section>
        </section>
    )
};
export default layout;
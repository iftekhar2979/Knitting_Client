
import Navbar from '@/components/dashboard/order/SingleOrder/Navbar';
const layout = ({ children ,params}) => {

    return (
        <section className='flex justify-center flex-col'>
            <Navbar id={params.id} />
            <section className='my-4'>
                {children}
            </section>
        </section>
    )
};
export default layout;
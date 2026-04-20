
import Navbar from '@/components/dashboard/order/SingleOrder/Navbar';
const layout = async ({ children ,params}) => {
    const { id } = await params;
    return (
        <section className=''>
            <Navbar id={id} />
            <section className='my-4'>
                {children}
            </section>
        </section>
    )
};
export default layout;
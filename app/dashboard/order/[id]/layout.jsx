
import Navbar from '@/components/dashboard/order/SingleOrder/Navbar';
const layout = ({ children ,params}) => {

    return (
        <section className=''>
            <Navbar id={params.id} />
            <section className='my-4'>
                {children}
            </section>
        </section>
    )
};
export default layout;
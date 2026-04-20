
import Details from '@/components/dashboard/order/Details/Details';

const page = async ({ params }) => {
    const { id } = await params;

    return (
        <div>
            <Details id={id} />
        </div>
    )
};
export default page;
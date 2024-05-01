
import Details from '@/components/dashboard/order/Details/Details';

const page = ({ params }) => {


    return (
        <div>
            <Details id={params.id} />
        </div>
    )
};
export default page;
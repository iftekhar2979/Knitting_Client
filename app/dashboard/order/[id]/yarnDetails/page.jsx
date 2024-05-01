import AddYarnDetails from '@/components/dashboard/order/SingleOrder/yarnDetails/AddYarnDetails';
import YarnDetailsInfo from '@/components/dashboard/order/SingleOrder/yarnDetails/YarnDetailsInfo';

const yarnDetails = ({ params }) => {

    return (
        <>
            <AddYarnDetails id={params.id} />
            <YarnDetailsInfo id={params.id} />
        </>
    )
};
export default yarnDetails;
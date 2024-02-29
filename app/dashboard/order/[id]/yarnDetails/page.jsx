import AddYarnDetails from '@/components/dashboard/order/SingleOrder/yarnDetails/AddYarnDetails';
import YarnDetailsInfo from '@/components/dashboard/order/SingleOrder/yarnDetails/yarnDetailsInfo';
import react from 'react';

const yarnDetails = ({ params }) => {

    return (
        <>
            <AddYarnDetails id={params.id} />
            <YarnDetailsInfo id={params.id} />
        </>
    )
};
export default yarnDetails;
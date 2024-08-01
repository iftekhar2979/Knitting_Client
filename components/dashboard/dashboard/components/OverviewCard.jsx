"use client"
import { GiFactory } from 'react-icons/gi';

const OverviewCard = ({cardItem,data}) => {
    const { icon, title, count, className }=cardItem
    // console.log(data)
    return (
        <div className={className}>
            <div className="flex items-center justify-center">
                {icon}

                <h2 className=" text-white  text-md font-semibold px-2">{title}</h2>
            </div>
            <p className="font-semibold  text-white text-2xl text-center">{count}</p>
        </div>
    )
};
export default OverviewCard;
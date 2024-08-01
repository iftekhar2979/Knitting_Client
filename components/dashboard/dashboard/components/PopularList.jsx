import react from 'react';
import { BiSolidShoppingBag } from 'react-icons/bi';

const PopularList = ({listItems}) => {
    const {title,count}=listItems
    // console.log(listItems)
    return (
        
        <li>
            <div>
                <h2>{title}</h2>
                <div className="flex justify-between">

                    <BiSolidShoppingBag size={18} className="text-active" />
                    <span className="text-sm text-active font-bold">{count}</span>
                </div>
            </div>
            <hr />

        </li>
    //     <li>
    //         <div>
    //             <h2>MFL-Bestseller</h2>
    //             <div className="flex justify-between">

    //                 <BiSolidShoppingBag size={18} className="text-active" />
    //                 <span className="text-sm text-active font-bold">02</span>
    //             </div>
    //         </div>
    //         <hr />

    //     </li>
    //     <li>
    //         <div>
    //             <h2>TAL-1</h2>
    //             <div className="flex justify-between">

    //                 <BiSolidShoppingBag size={18} className="text-active" />
    //                 <span className="text-sm text-active font-bold">02</span>
    //             </div>
    //         </div>
    //         <hr />

    //     </li>

    // </ol>
    )
};
export default PopularList;
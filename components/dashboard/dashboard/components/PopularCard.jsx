import react from 'react';
import PopularList from './PopularList';

const PopularCard = ({cardItems}) => {
    const {category,listItem}=cardItems
    // console.log(listItem)
    return (
        <div className="bg-white border-rad p-4">
        <h2 className=" font-bold text-xl"> {category}</h2>
        <ol className="pt-4">
            {
                listItem?.map(list=><PopularList key={list.id} listItems={list}/>)
            }

            {/* <li>
                <div>
                    <h2>Grapics Textile Ltd</h2>
                    <div className="flex justify-between">

                        <BiSolidShoppingBag size={18} className="text-active" />
                        <span className="text-sm text-active font-bold">02</span>
                    </div>
                </div>
                <hr />

            </li>
            <li>
                <div>
                    <h2>Mahmud Fashion</h2>
                    <div className="flex justify-between">

                        <BiSolidShoppingBag size={18} className="text-active" />
                        <span className="text-sm text-active font-bold">02</span>
                    </div>
                </div>
                <hr />

            </li>
            <li>
                <div>
                    <h2>The Abc Ltd</h2>
                    <div className="flex justify-between">

                        <BiSolidShoppingBag size={18} className="text-active" />
                        <span className="text-sm text-active font-bold">02</span>
                    </div>
                </div>
                <hr />

            </li> */}

        </ol>
    </div>
    )
};
export default PopularCard;
'use client'


const Action = ({action}) => {
    return action?.map(item=><div key={item.id} className="">{item.actionName} <hr/></div>)
};
export default Action;
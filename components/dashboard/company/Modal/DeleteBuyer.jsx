import React from 'react'
import { MdDelete } from 'react-icons/md'
import {useDeleteBuyerMutation} from "../../../../lib/features/company/companyApi"

function DeleteBuyer({buyerInfo}) {
  const [deleteBuyer]=useDeleteBuyerMutation()
const {buyers=[]}=buyerInfo
    return (
        <div>
          {buyers?.map(item=><div key={item.id} onClick={()=>{deleteBuyer(item.id)}} className="py-1 flex justify-between">{item.buyerName}  <MdDelete size={25}/><hr/></div>)}
        </div>
    )
}
export default DeleteBuyer

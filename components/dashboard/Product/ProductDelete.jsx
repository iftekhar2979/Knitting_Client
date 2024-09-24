import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useDeleteProductMutation } from '@/lib/features/Product/productApi'

function ProductDelete({productId}) {
  const [deleteBuyer]=useDeleteProductMutation()
  // console.log(productId)
    return (
        <div>
         <div ><MdDelete size={32} onClick={()=>deleteBuyer(productId)} color={"red"} className="cursor-pointer"/></div>
        </div>
    )
}
export default ProductDelete

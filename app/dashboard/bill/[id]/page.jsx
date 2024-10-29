
import BillStatementFromChalan from '@/components/dashboard/Bill/BillStatementFromChalan'
import React from 'react'

export default function page({params}) {
  return (
    <>
    <BillStatementFromChalan id={params.id}/>
    </>
  )
}

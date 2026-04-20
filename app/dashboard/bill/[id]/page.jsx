
import BillStatementFromChalan from '@/components/dashboard/Bill/BillStatementFromChalan'
import React from 'react'

export default async function page({params}) {
    const { id } = await params;
  return (
    <>
    <BillStatementFromChalan id={id}/>
    </>
  )
}

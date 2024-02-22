'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditModal from "../dashboard/company/Modal/EditModal";
import AddBuyer from '../dashboard/company/Modal/AddBuyer'
import { CiSquarePlus } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../dashboard/company/Modal/DeleteModal";
import { useDeleteCompanyMutation, useEditCompanyMutation } from "@/lib/features/company/companyApi";
const Action = ({ action, data }) => {
    const [deleteCompany] = useDeleteCompanyMutation()

    const iconsImg = (actionName) => {
        switch (actionName) {
            case "Edit":
                return <FaEdit size={24} color={"navy"} />
                break;
            case "Add Buyer":
                return <CiSquarePlus size={24} color={"green"} />
                break;
            case "Delete":
                return <MdDelete size={24} color={"red"} />
                break;
            default:
            // code block
        }
    }

    return (action?.map(item => {
        const { actionName } = item

        return (<div key={item.id} className="flex">

            <Dialog>
                <DialogTrigger>{iconsImg(actionName)}</DialogTrigger>
                {
                    actionName === 'Edit' &&
                    <>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>You Want to Edit <span className="bg-yellow-200 px-4">{data.companyName}</span></DialogTitle>
                                <EditModal defaultValues={data} />
                            </DialogHeader>
                        </DialogContent>
                    </>
                }
                {
                    actionName === 'Add Buyer' &&
                    <>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>You Want to Add Buyer to <span className="bg-yellow-200 px-4">{data.companyName}</span></DialogTitle>
                                <AddBuyer defaultValues={data}  />
                            </DialogHeader>
                        </DialogContent>
                    </>
                }
                {
                    actionName === 'Delete' &&
                    <>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Do You Want to Delete {data.companyName}</DialogTitle>
                                <div className="flex">
                                    <DialogClose asChild>
                                        <button className="btn btn-sm text-white bg-red-500 px-2 rounded text-xl m-2 hover:bg-red-600">No</button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <button onClick={() => deleteCompany(data.id)} className="btn btn-sm text-white bg-blue-500 px-2 rounded text-xl m-2 hover:bg-blue-600">Yes</button>
                                    </DialogClose>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </>
                }


            </Dialog>
        </div>)
    }))
};
export default Action;
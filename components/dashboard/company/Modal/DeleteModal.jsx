"use client"

import { DialogHeader } from "@/components/ui/dialog";

import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

const DeleteModal = ({ title, property, id ,deleteQueryFn}) => {

    const handleDelete = () => {
     deleteQueryFn(id)
    }
    return (
        <>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title} {property}</DialogTitle>
                <div className="flex">
                    <button className="btn btn-sm text-white bg-red-500 px-2 rounded text-xl m-2 hover:bg-red-600">No</button>
                    <button onClick={handleDelete} className="btn btn-sm text-white bg-blue-500 px-2 rounded text-xl m-2 hover:bg-blue-600">Yes</button>
                </div>
            </DialogHeader>
        </DialogContent>
        </>
    )
};
export default DeleteModal;
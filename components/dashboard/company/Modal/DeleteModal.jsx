"use client"

import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

const DeleteModal = ({ title, property,isLoading, id, deleteQueryFn ,setOpen}) => {

    const handleDelete = () => {
        deleteQueryFn(id)
        setOpen(false)
    }
    return (
        <>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title} {property}</DialogTitle>
                    <div className="flex">
                        <DialogClose asChild>
                            <button className="btn btn-sm text-white bg-red-500 px-2 rounded text-xl m-2 hover:bg-red-600">No</button>
                        </DialogClose>
                        <button onClick={handleDelete} className="btn btn-sm text-white bg-blue-500 px-2 rounded text-xl m-2 hover:bg-blue-600">{isLoading && "Deleting"}Yes</button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </>
    )
};
export default DeleteModal;
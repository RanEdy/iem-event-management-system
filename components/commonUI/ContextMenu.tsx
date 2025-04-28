"use client";
import { useState } from 'react';
import { FaCog, FaTrash, FaClipboardList, FaCheck } from 'react-icons/fa'; // Iconos bonitos

const ContextMenu = ({ row }: { row: any }) => {
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState<null | 'edit' | 'delete' | 'requests' | 'done'>(null);

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const handleAction = (type: 'edit' | 'delete' | 'requests' | 'done') => {
        setDialogType(type);
        setOpen(false);
    };

    return (
        <div className="absolute">
            <button
                onClick={toggleDropdown}
                className="flex hover:bg-zinc-100 hover:shadow-gray-500 hover:shadow-sm bg-white border-2 border-zinc-200 rounded-lg px-2 items-center"
            >
                <div className="text-center font-extrabold py-1 text-zinc-500">...</div>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button onClick={() => handleAction('requests')} className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                        <FaClipboardList className="mr-2" /> User Requests
                    </button>
                    <button onClick={() => handleAction('edit')} className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                        <FaCog className="mr-2" /> Edit Event
                    </button>
                    <button onClick={() => handleAction('done')} className="flex items-center w-[95%] px-4 m-1 bg-lime-100 py-2 hover:bg-lime-200 rounded-md">
                        <FaCheck className="mr-2 text-lime-600" /> <span className="text-lime-600 font-bold">Done</span>
                    </button>
                    <button onClick={() => handleAction('delete')} className="flex items-center w-[95%] px-4 m-1 bg-red-200 py-2 hover:bg-red-300 rounded-md">
                        <FaTrash className="mr-2 text-rose-700" /> <span className="text-rose-700 font-bold">Delete Event</span>
                    </button>
                    
                </div>
            )}

            {/* Show Dialog depending on action */}
            {dialogType === 'edit' && (
                <></>
            )}
            {dialogType === 'requests' && (
                <></>
            )}
            {dialogType === 'delete' && (
                <></>
            )}
        </div>
    );
};

export default ContextMenu;
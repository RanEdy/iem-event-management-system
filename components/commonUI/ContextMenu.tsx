"use client";
import { useState } from 'react';
import { FaCog, FaTrash, FaClipboardList, FaCheck } from 'react-icons/fa'; // Iconos bonitos

const ContextMenu = ({ row }: { row: any }) => {
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState<null | 'edit' | 'delete' | 'requests' | 'done' | 'doneError'>(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const handleAction = (type: 'edit' | 'delete' | 'requests' | 'done' | 'doneError') => {
        setDialogType(type);
        setOpen(false);
    };

    const closeDialog = () => {
        setDialogType(null);
    };

    // Función para marcar un evento como completado
    const markEventAsDone = async (eventId: number) => {
        setIsLoading(true);
        try {
            // Obtener el evento actual
            const response = await fetch(`/api/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Error al obtener el evento');
            }
            
            const event = await response.json();
            
            // Actualizar el estado "done" a true
            const updateResponse = await fetch(`/api/event/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...event, done: true }),
            });
            
            if (!updateResponse.ok) {
                throw new Error('Error al actualizar el evento');
            }
            
            const result = await updateResponse.json();
            
            if (result.success) {
                // Actualización exitosa
                alert('El evento ha sido archivado correctamente');
                // Aquí podrías recargar la lista de eventos o actualizar la UI
                window.location.reload();
            } else {
                throw new Error('No se pudo actualizar el evento');
            }
        } catch (error) {
            console.error('Error al marcar el evento como completado:', error);
            alert('Ocurrió un error al archivar el evento');
        } finally {
            setIsLoading(false);
            closeDialog();
        }
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
            {dialogType === 'done' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">CONFIRMATION</h2>
                        <p className="text-gray-700 mb-3">
                            Are you sure you want to mark this event as done?
                        </p>
                        <p className="text-gray-500 italic mb-7">
                            This event will be archived to the records and will not be available to workers.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid grid-rows-1">
                                <button
                                    type="button"
                                    className="bg-green-600 text-white font-bold px-6 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto disabled:opacity-50"
                                    onClick={() => markEventAsDone(row.id)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'PROCESANDO...' : 'DONE'}
                                </button>
                            </div>
                            <div className="grid grid-rows-1">
                                <button
                                    type="button"
                                    className="border-2 border-pink-700 text-pink-700 font-bold px-6 py-2 rounded-md hover:bg-pink-100 w-full sm:w-auto"
                                    onClick={() => {
                                        console.log("Canceled");
                                        closeDialog();
                                    }}
                                    disabled={isLoading}
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {dialogType === 'doneError' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-3xl p-10 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">This event can't be archived</h2>
                        <p className="text-gray-700 mb-3">This event has already begun.</p>
                        <p className="text text-gray-500 italic mb-9">
                            Events that have already started can only be archived.
                        </p>
                        <div className="grid grid-cols-1 justify-items-center">
                            <button
                                type="button"
                                className="bg-orange-400 text-white font-bold px-20 py-2 rounded-md hover:bg-orange-500"
                                onClick={() => {
                                    {/* Close dialog */ }
                                    console.log("Exit");
                                    closeDialog();
                                }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {dialogType === 'edit' && (
                <></>
            )}

            {dialogType === 'requests' && (
                <></>
            )
            }
            {dialogType === 'delete' && (
                <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">CONFIRMATION</h2>
                        <p className="text-gray-700 mb-3">Are you sure you want to delete this event?</p>
                        <p className="text text-gray-500 italic mb-5">This event will be deleted permanently from the list.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid grid-rows-1">
                                <button
                                    type="button"
                                    className="bg-pink-700 text-white font-bold px-2 py-2 rounded-md hover:bg-pink-800"
                                >
                                    DELETE
                                </button>
                            </div>
                            <div className="grid grid-rows-1">
                                <button
                                    type="button"
                                    className="border-2 border-pink-700 text-pink-700 font-bold px-2 py-2 rounded-md hover:bg-pink-100"
                                    onClick={() => {
                                        {/* Close dialog */ }
                                        console.log("Exit delete Dialog");
                                        closeDialog();
                                    }}
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContextMenu;

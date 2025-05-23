"use client";
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Iconos bonitos

// Añadimos la interfaz para las props Final
interface ContextMenuArchivesProps {
    row: any;
    onEventDeleted?: (message: string) => void; // Callback para notificar cambios
}

// Renombrado el componente a ContextMenuArchives y añadido el callback
const ContextMenuArchives = ({ row, onEventDeleted }: ContextMenuArchivesProps) => {
    const [open, setOpen] = useState(false);
    // Eliminadas las opciones 'edit', 'requests', 'done', 'doneError' del tipo de diálogo
    const [dialogType, setDialogType] = useState<null | 'delete' | 'deleteSuccess' | 'deletePeriodE'>(null);
    const [isLoading, setIsLoading] = useState(false); // isLoading se mantiene por si se necesita en futuras acciones

    const toggleDropdown = () => {
        setOpen(!open);
    };

    // Actualizado el tipo de handleAction
    const handleAction = (type: 'delete') => {
        setDialogType(type);
        setOpen(false);
    };

    const closeDialog = () => {
        setDialogType(null);
    };

    { /* DELETE AN EVENT */ }
    const deleteEvent = async (eventId: number) => {
        setIsLoading(true); // Iniciar carga al comenzar la eliminación
        try {
            // First, get the event information
            const eventResponse = await fetch(`/api/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!eventResponse.ok) {
                throw new Error('Error getting event information');
            }

            const event = await eventResponse.json();
            const currentDate = new Date();
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);

            // Verify if the current date is within the event's date range
            // Nota: Para archivos, esta lógica podría necesitar ajuste o eliminación si no aplica.
            // Por ahora, se mantiene la lógica original.
            if (currentDate >= startDate && currentDate <= endDate) {
                setDialogType('deletePeriodE');
                return;
            }

            // Delete the event from the database
            const response = await fetch(`/api/event/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            } else {
                console.log('Event deleted successfully');
                setDialogType('deleteSuccess');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        } finally {
            setIsLoading(false); // Finalizar carga independientemente del resultado
            // No cerramos el diálogo aquí para mostrar el mensaje de éxito/error
        }
    }

    // Eliminada la función markEventAsDone

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
                    {/* Eliminados los botones 'User Requests', 'Edit Event', 'Done' */}
                    <button onClick={() => handleAction('delete')} className="flex items-center w-[95%] px-4 m-1 bg-red-200 py-2 hover:bg-red-300 rounded-md">
                        <FaTrash className="mr-2 text-rose-700" /> <span className="text-rose-700 font-bold">Delete Event</span>
                    </button>
                </div>
            )}

            {/* Eliminados los diálogos para 'done', 'doneError', 'edit', 'requests' */}

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
                                    className="bg-pink-700 text-white font-bold px-2 py-2 rounded-md hover:bg-pink-800 disabled:opacity-50"
                                    onClick={() => deleteEvent(row.id)}
                                    disabled={isLoading} // Deshabilitar mientras carga
                                >
                                    {isLoading ? 'DELETING...' : 'DELETE'}
                                </button>
                            </div>
                            <div className="grid grid-rows-1">
                                <button
                                    type="button"
                                    className="border-2 border-pink-700 text-pink-700 font-bold px-2 py-2 rounded-md hover:bg-pink-100"
                                    onClick={closeDialog} // Solo cierra el diálogo
                                    disabled={isLoading} // Deshabilitar mientras carga
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {dialogType === 'deleteSuccess' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-3xl p-10 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-10">Event successfully deleted</h2>
                        <div className="grid grid-cols-1 justify-items-center">
                            <button
                                type="button"
                                className="bg-green-400 text-white font-bold px-20 py-2 rounded-md hover:bg-green-500"
                                disabled={isLoading}
                                onClick={() => {
                                    closeDialog();
                                    if (onEventDeleted) {
                                        onEventDeleted("Event deleted successfully");
                                    } else {
                                        window.location.reload(); // Solo recarga si no hay callback
                                    }
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {dialogType === 'deletePeriodE' &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-3xl p-10 shadow-xl">
                        {/* Mensaje ajustado para archivos si es necesario */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-10">We cannot delete an event that has already started.</h2>
                        <div className="grid grid-cols-1 justify-items-center">
                            <button
                                type="button"
                                className="bg-orange-400 text-white font-bold px-20 py-2 rounded-md hover:bg-orange-500"
                                onClick={closeDialog} // Solo cierra el diálogo
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

// Exportar el componente renombrado
export default ContextMenuArchives;
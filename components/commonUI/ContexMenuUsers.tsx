"use client";
import { useState } from "react";
import { FaCog, FaTrash } from "react-icons/fa"; // Iconos para editar y eliminar
import { IUser } from "@/entities/IUser"; // Asegúrate que la ruta es correcta
// Importa UserForm si vas a abrirlo en un modal para editar
import { UserForm } from "../usersUI/UserForm";

interface ContextMenuUsersProps {
  row: IUser;
  onUserModified?: (message: string) => void; // Callback para notificar cambios
}

const ContexMenuUsers = ({ row, onUserModified }: ContextMenuUsersProps) => {
  const [open, setOpen] = useState(false);
  // Tipos de diálogo específicos para usuarios
  const [dialogType, setDialogType] = useState<
    null | "editUser" | "deleteUser" | "deleteUserSuccess"
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleAction = (type: "editUser" | "deleteUser") => {
    setDialogType(type);
    setOpen(false); // Cierra el dropdown al seleccionar una acción
    if (type === "editUser") {
      // Aquí podrías abrir un modal con UserForm para editar el usuario
      // Por ejemplo, setIsEditUserModalOpen(true);
      console.log("Edit user action triggered for user ID:", row.id);
      // De momento, solo cerramos el dropdown y mostramos un log.
      // La implementación del modal de edición se puede añadir aquí.
    }
  };

  const closeDialog = () => {
    setDialogType(null);
    //setIsEditUserModalOpen(false);
  };

  const handleEditSaveSuccess = () => {
    closeDialog();
    if (onUserModified) {
      onUserModified("User modified successfully");
    } else {
      window.location.reload();
    }
  };

  const deleteUser = async (userId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      console.log("User deleted successfully");
      setDialogType("deleteUserSuccess");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert((error as Error).message || "Failed to delete user");
      // Podrías establecer un dialogType para errores si lo prefieres
    } finally {
      setIsLoading(false);
      // No cerramos el diálogo de confirmación aquí para que el usuario vea el de éxito/error
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
          <button
            onClick={() => handleAction("editUser")}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FaCog className="mr-2" /> Edit User
          </button>
          <button
            onClick={() => handleAction("deleteUser")}
            className="flex items-center w-[95%] px-4 m-1 bg-red-200 py-2 hover:bg-red-300 rounded-md"
          >
            <FaTrash className="mr-2 text-rose-700" />{" "}
            <span className="text-rose-700 font-bold">Delete User</span>
          </button>
        </div>
      )}

      {/* Modal para editar usuario (ejemplo básico) */}
      {dialogType === "editUser" && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-1/2 w-11/12 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeDialog}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <UserForm
              title={`Editar Usuario: ${row.name}`}
              userId={row.id}
              initialData={row}
              onFormSubmitSuccess={handleEditSaveSuccess}
            />
          </div>
        </div>
      )}

      {dialogType === "deleteUser" && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              CONFIRMATION
            </h2>
            <p className="text-gray-700 mb-3">
              Are you sure you want to delete the user{" "}
              <span className="font-bold">{row.name}</span>?
            </p>
            <p className="text-gray-500 italic mb-5">
              This user will be deleted permanently.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                className="bg-pink-700 text-white font-bold px-2 py-2 rounded-md hover:bg-pink-800 disabled:opacity-50"
                onClick={() => deleteUser(row.id)}
                disabled={isLoading}
              >
                {isLoading ? "DELETING..." : "DELETE"}
              </button>
              <button
                type="button"
                className="border-2 border-pink-700 text-pink-700 font-bold px-2 py-2 rounded-md hover:bg-pink-100"
                onClick={closeDialog}
                disabled={isLoading}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {dialogType === "deleteUserSuccess" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-10">
              User successfully deleted
            </h2>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-green-500 text-white font-bold px-20 py-2 rounded-md hover:bg-green-600"
                onClick={() => {
                  closeDialog();
                  if (onUserModified) {
                    onUserModified("User deleted successfully");
                  } else {
                    window.location.reload();
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContexMenuUsers;

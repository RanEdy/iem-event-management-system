"use client";

import { UserLevel } from "@prisma/client";
import { IUser } from "@/entities/IUser"; // Asegúrate que esta ruta es correcta y IUser está definido
import { FaPlus, FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ContexMenuUsers from "../commonUI/ContexMenuUsers"; // Cambiado de ContextMenu a ContexMenuUsers
import { UserForm } from "./UserForm";

// Función para calcular la antigüedad
const calculateSeniority = (hireDateString: string | Date): string => {
  const hireDate = new Date(hireDateString);
  if (isNaN(hireDate.getTime())) {
    return "N/A";
  }
  const now = new Date();
  let years = now.getFullYear() - hireDate.getFullYear();
  let months = now.getMonth() - hireDate.getMonth();
  let days = now.getDate() - hireDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Días en el mes anterior
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    return `${days} day${days > 1 ? "s" : ""}`;
  }
};

export const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUserType, setFilterUserType] = useState<UserLevel | "">("");
  const [filterStatus, setFilterStatus] = useState<boolean | "">("");

  const loadUsers = async () => {
    fetch("/api/user") // Asegúrate que esta es la API correcta para obtener usuarios
      .then((res) => res.json())
      .then(
        (
          data: IUser[] | { success: boolean; users: IUser[]; error?: string }
        ) => {
          let usersData: IUser[];
          if ("success" in data && data.success) {
            usersData = data.users;
          } else if (Array.isArray(data)) {
            usersData = data;
          } else {
            console.error(
              "Error fetching users:",
              (data as any).error || "Unknown error"
            );
            usersData = [];
          }

          const parsedUsers = usersData.map((user) => ({
            ...user,
            birthday: user.birthday ? new Date(user.birthday) : new Date(), // O maneja null/undefined como prefieras
            hireDate: user.hireDate ? new Date(user.hireDate) : new Date(), // O maneja null/undefined
          }));
          setUsers(parsedUsers);
        }
      )
      .catch((error) =>
        console.error("Error fetching or parsing users:", error)
      );
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let currentUsers = users;

    if (searchTerm) {
      currentUsers = currentUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterUserType) {
      currentUsers = currentUsers.filter(
        (user) => user.level === filterUserType
      );
    }

    if (filterStatus !== "") {
      currentUsers = currentUsers.filter(
        (user) => user.active === filterStatus
      );
    }

    setFilteredUsers(currentUsers);
  }, [searchTerm, filterUserType, filterStatus, users]);

  const handleRowClick = (row: IUser) => {
    console.log("Selected User: ", row);
    // Aquí puedes implementar la lógica para editar o ver detalles del usuario si es necesario al hacer clic en la fila
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000); // 4 segundos
  };

  const handleUserModified = (message: string) => {
    console.log("handleUserModified llamado con mensaje: ", message);
    showToastMessage(message);
    loadUsers(); // Recargar la lista de usuarios
  };

  const columns: TableColumn<IUser>[] = [
    {
      name: "USER",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex items-center py-2">
          {/* Placeholder para avatar, puedes reemplazarlo con un componente de Avatar si lo tienes */}
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600">
            {row.name.charAt(0).toUpperCase()}
          </div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "USER TYPE",
      selector: (row) => row.level,
      cell: (row) => {
        let colorClass = "bg-gray-200 text-gray-700";
        if (row.level === UserLevel.MASTER)
          colorClass = "bg-red-500 text-white";
        else if (row.level === UserLevel.ADMIN)
          colorClass = "bg-orange-500 text-white";
        else if (row.level === UserLevel.STAFF)
          colorClass = "bg-blue-500 text-white";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
          >
            {row.level}
          </span>
        );
      },
    },
    {
      name: "STATUS",
      selector: (row) => row.active,
      cell: (row) => (
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              row.active ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span>{row.active ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
    {
      name: "SENIORITY",
      selector: (row) =>
        row.hireDate ? calculateSeniority(row.hireDate) : "N/A",
      sortable: true,
      format: (row) =>
        row.hireDate ? calculateSeniority(row.hireDate) : "N/A", // Necesario para que el sort use el valor calculado
    },
    {
      name: "OPTIONS",
      cell: (row: IUser) => (
        <ContexMenuUsers row={row} onUserModified={handleUserModified} />
      ), // Usar ContexMenuUsers y quitar isUserContext
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="h-full w-full border-2 border-zinc-100 rounded-lg overflow-visible">
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}
      <div className="p-4">
        <div>
          Total Users: <span className="font-bold">{" " + users.length}</span>
        </div>
      </div>
      <hr />

      <div className="flex flex-wrap items-center justify-between m-2 p-2 gap-4">
        {/* SEARCH BAR */}
        <div className="flex items-center min-w-56 lg:w-1/3 h-12 border-2 p-2 bg-white border-gray-300 rounded-lg">
          <FaSearch className="text-gray-400 m-2 mr-3" />
          <input
            type="text"
            className="flex self-center w-full h-full p-1 bg-transparent focus:outline-none"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-4">
          <select
            className="h-12 border-2 p-2 border-gray-300 rounded-lg focus:outline-none"
            value={filterUserType}
            onChange={(e) =>
              setFilterUserType(e.target.value as UserLevel | "")
            }
          >
            <option value="">All User Types</option>
            {Object.values(UserLevel).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <select
            className="h-12 border-2 p-2 border-gray-300 rounded-lg focus:outline-none"
            value={filterStatus === "" ? "" : String(filterStatus)}
            onChange={(e) =>
              setFilterStatus(
                e.target.value === "" ? "" : e.target.value === "true"
              )
            }
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* ADD NEW USER BUTTON */}
        <div
          className="w-auto md:min-w-52 h-12 bg-bluedark-gradient-r border-2 border-zinc-100 rounded-2xl cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <button className="flex items-center justify-center px-3 h-full w-full text-center font-bold text-white hover:bg-opacity-80">
            <FaPlus className="text-white mx-2" />
            <span className="text-xs md:text-base">ADD NEW USER</span>
          </button>
        </div>
      </div>

      {/* USER DIALOG (MODAL) */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-1/2 w-11/12 max-h-[90vh] overflow-y-auto">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsDialogOpen(false)}
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
            {/* USER FORM */}
            <UserForm
              title="Register User"
              // onSave={() => { // Asumiendo que UserForm tiene una prop onSave
              //    //setIsDialogOpen(false);
              //     showToastMessage("User added successfully");
              //     loadUsers(); // Recargar la lista de usuarios
              // }}
            />
          </div>
        </div>
      )}

      <DataTable
        className="h-auto overflow-visible" // Ajustado para que la tabla crezca según el contenido
        columns={columns}
        data={filteredUsers}
        onRowClicked={handleRowClick}
        pointerOnHover
        highlightOnHover
        pagination
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 350px)" // Ajusta este valor según la altura de tus otros elementos
        customStyles={{
          headCells: {
            style: {
              fontWeight: "bold",
              backgroundColor: "#F5F5F5",
              borderRadius: "0",
            },
          },
          table: { style: { minHeight: "300px" } }, // Altura mínima para la tabla
        }}
        noDataComponent={<div>No users found.</div>}
      />
    </div>
  );
};

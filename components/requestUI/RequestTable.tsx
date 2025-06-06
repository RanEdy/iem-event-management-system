"use client";
import { IEvent } from "@/entities/IEvent";
import { IEventRequest } from "@/entities/IEventRequest"
import { IEventUserList } from "@/entities/IEventUserList";
import { IUser } from "@/entities/IUser"
import { GenericRequestStatus, UserRole } from "@prisma/client";
import { useEffect, useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { FaTimes, FaCheck } from "react-icons/fa";
type RequestTableProps = {
  event: IEvent
}

export const RequestTable: React.FC<RequestTableProps> = ({ event }) => {

  const [users, setUsers] = useState<IUser[]>([])
  const [eventFetched, setEventFetched] = useState<IEvent>()
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [requests, setRequests] = useState<IEventRequest[]>([])
  const [acceptDialog, setAcceptDialog] = useState<boolean>(false)
  const [rejectDialog, setRejectDialog] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<number>(0)
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.ASSISTANT_MANAGER)
  console.log(event);

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
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Days in the previous month
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

  const loadUsers = async () => {
    try {
      console.log("[55 RequestTable] Event ID loading Users: " + event.id)
      const response = await fetch("/api/eventRequest/findUsersByEvent/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: event.id })
      });
      let pendingUsers = await response.json()

      //Comentario
      //Get all the requests that matches with the users and event, then filter only the Pending ones
      const requestResp = await fetch("/api/eventRequest/findByEvent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: event.id })
      })
      const allRequests: IEventRequest[] = await requestResp.json();

      // Solo solicitudes pendientes de este evento
      const pendingRequests = allRequests.filter(request =>
        request.status === GenericRequestStatus.PENDING && request.eventId === event.id
      );

      setRequests(pendingRequests);
      setUsers(pendingUsers);
    }
    catch (error) {
      console.log("Error trying to load users from event requests");
    }
  }

  const loadEventInfo = async () => {
    try {
      const response = await fetch(`/api/event/${event.id}`)
      const eventResp = await response.json();
      setEventFetched(eventResp);

      const totalUsersResponse = await fetch("/api/event/totalUsers/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: event.id })

      })
      const totalUsersJson = await totalUsersResponse.json();
      console.log(totalUsersJson)
      setTotalUsers(totalUsersJson.totalUsers)

    } catch (error) {
      console.log("Error loading event")
    }
  }

  const handleAcceptDialog = (e: React.FormEvent, userId: number) => {
    setAcceptDialog(true);
    setSelectedUserId(userId)
  }

  const handleRejectDialog = (e: React.FormEvent, userId: number) => {
    setRejectDialog(true);
    setSelectedUserId(userId)
  }

  const handleAccept = async (e: React.FormEvent, eventId: number, userId: number) => {
    e.preventDefault()
    console.log("Accept")
    const requests: IEventRequest[] = await fetch("/api/eventRequest/").then(requests => requests.json())
    const thisRequest = requests.filter(request => request.eventId === eventId && request.userId === userId)[0]
    console.log(thisRequest)
    console.log("Event ID: " + eventId + " | User ID: " + userId)

    const resp = await fetch("/api/eventRequest/validateAccept/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId, userId })

    })

    const validate: string = await resp.json()
    if (validate) {
      console.log("Cannot accept the request");
      alert("Error in validation: " + validate)
    }
    else {
      //Update request
      thisRequest.status = GenericRequestStatus.ACCEPTED
      const updateResponse = await fetch(`/api/eventRequest/${thisRequest.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thisRequest)

      })
      const success = await updateResponse.json()

      //Add User to event
      const userParticipation: IEventUserList = {
        id: 0,
        userId: userId,
        eventId: eventId,
        role: selectedRole
      }
      const response = await fetch("/api/eventUserList/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userParticipation)
      })
      const addUserSuccess = await response.json();
      if (success && addUserSuccess.success) alert("Request succesfully accepted")
      //update table
      setAcceptDialog(false);
      loadUsers()
      loadEventInfo()
    }
  }

  const handleReject = async (e: React.FormEvent, eventId: number, userId: number) => {
    e.preventDefault()
    console.log("Reject")
    const requests: IEventRequest[] = await fetch("/api/eventRequest/").then(requests => requests.json())
    const thisRequest = requests.filter(request => request.eventId === eventId && request.userId === userId)[0]

    const resp = await fetch("/api/eventRequest/validateReject/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId, userId })

    })

    const validate: string = await resp.json()
    if (validate) {
      console.log("Cannot reject the request");
      alert("Error in validation: " + validate)
    }
    else {
      thisRequest.status = GenericRequestStatus.REJECTED
      const updateResponse = await fetch(`/api/eventRequest/${thisRequest.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thisRequest)

      })
      const success = await updateResponse.json()
      if (success) alert("Request succesfully rejected")
      //update table
      setRejectDialog(false);
      loadUsers()
      loadEventInfo()
    }

  }

  useEffect(() => {
    if (event?.id) {
      loadUsers();
      loadEventInfo();
    }
  }, [event?.id]);

  const columns: TableColumn<IUser>[] = [
    {
      name: "USER",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex items-center py-2">
          {/* Placeholder for avatar, this will get replaced when */}
          <div className="min-w-8 min-h-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600">
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
      name: "STATUS",
      selector: (row) => row.active,
      cell: (row) => (
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${row.active ? "bg-green-500" : "bg-red-500"
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
        row.hireDate ? calculateSeniority(row.hireDate) : "N/A", // Necessary for sort to use calculated value
    },
    {

      name: "OPTIONS",
      cell: (row) => (
        <div className="flex flex-row items-center justify-evenly py-2">
          <button className="h-8 w-10 bg-green-600 rounded-md m-1 hover:bg-green-500 text-lg text-white font-bold"
            onClick={e => handleAcceptDialog(e, row.id)}
          >
            <div className="flex justify-center"> <FaCheck /> </div>
          </button>
          <button className="h-8 w-10 bg-red-600 rounded-md m-1 hover:bg-red-400 text-lg text-white font-bold"
            onClick={e => handleRejectDialog(e, row.id)}
          >
            <div className="flex justify-center"><FaTimes /></div>
          </button>
        </div>
      ),
      ignoreRowClick: true,
    }
  ];
  return (
    <div className="h-[88%] w-full border-2 border-zinc-100 rounded-lg overflow-auto">
      {acceptDialog && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-6 shadow-lg my-4 w-11/12 sm:w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">CONFIRMATION</h2>

            <p className="text-gray-500 text-base italic mb-6">
              Select a role for the employee.
            </p>

            <div className="mb-6">
              <label htmlFor="roleSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="roleSelect"
                name="role"
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role.replaceAll('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
              <button
                type="button"
                className="bg-bluedark-gradient-r text-white font-bold px-6 py-2 rounded-md hover:opacity-75 w-full"
                onClick={(e) => handleAccept(e, event.id, selectedUserId)}
              >
                ACCEPT
              </button>
              <button
                type="button"
                className=" text-white bg-gray-400 font-bold px-6 py-2 rounded-md hover:bg-gray-300 w-full"
                onClick={() => setAcceptDialog(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
      {rejectDialog && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-8 shadow-lg realtive my-4 lg:w-1/4 w-72 h-64 lg:h-1/3 ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              CONFIRMATION
            </h2>
            <p className="text-gray-500 text-base italic mb-12">
              This request will get rejected.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-28">
              <div className="grid grid-rows-1">
                <button
                  type="button"
                  className="bg-green-600 text-lg text-white font-bold px-6 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto disabled:opacity-50"
                  onClick={e => handleReject(e, event.id, selectedUserId)}
                >
                  ACCEPT
                </button>
              </div>
              <div className="grid grid-rows-1">
                <button
                  type="button"
                  className="border-2 text-lg border-pink-700 text-pink-700 font-bold px-6 py-2 rounded-md hover:bg-pink-100 w-full sm:w-auto"
                  onClick={() => setRejectDialog(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="p-4 flex flex-colum justify-between w-full">
          <div className="w-fit text-lg mr-4">Event ID: <span className="font-bold text-lg">{"  " + eventFetched?.id}</span></div>
          <div className="w-fit text-lg mr-4">Event Name: <span className="font-bold text-lg">{"  " + eventFetched?.name}</span></div>
          <div className="w-fit text-lg mr-4">Total Requests: <span className="font-bold">{" " + users.length}</span></div>
          <div className="w-fit text-lg mr-4">Event Capacity: <span className="font-bold">{" " + totalUsers + "/" + eventFetched?.maxUsers}</span></div>
        </div>
      </div>
      <hr />
      <DataTable
        className="h-auto overflow-visible"
        columns={columns}
        data={users}
        pointerOnHover
        highlightOnHover
        pagination
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 350px)" // Adjust this value according to the height of your other elements.
        customStyles={{
          headCells: {
            style: {
              fontWeight: "bold",
              backgroundColor: "#F5F5F5",
              borderRadius: "0",
            },
          },
        }}
        noDataComponent={<div>No requests found.</div>}
      />
    </div>
  )
}
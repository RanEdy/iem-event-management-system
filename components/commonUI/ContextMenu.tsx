"use client";
import { useState } from "react";
import { FaCog, FaTrash, FaClipboardList, FaCheck } from "react-icons/fa"; // Iconos bonitos
import { IEvent } from "@/entities/IEvent";
import { ISectionFile } from "@/entities/ISectionFile";
import { IEventSection } from "@/entities/IEventSection";
import { EventEditForm } from "../eventsUI/editUI/EventEditForm";
import { RequestTable } from "../requestUI/RequestTable";

const ContextMenu = ({ row, OnCompleted }: { row: IEvent, OnCompleted?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    | null
    | "edit"
    | "delete"
    | "deleteSuccess"
    | "deletePeriodE"
    | "requests"
    | "done"
    | "doneError"
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [sections, setSections] = useState<
    (IEventSection & { files: ISectionFile[] })[]
  >([]);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleAction = (
    type: "edit" | "delete" | "requests" | "done" | "doneError"
  ) => {
    setDialogType(type);
    setOpen(false);
  };

  const closeDialog = () => {
    setDialogType(null);
  };


  {
    /* DELETE AN EVENT */
  }
  const deleteEvent = async (eventId: number) => {
    try {
      // First, get the event information
      const eventResponse = await fetch(`/api/event/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!eventResponse.ok) {
        throw new Error("Error getting event information");
      }

      const event = await eventResponse.json();
      const currentDate = new Date();
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      // Verify if the current date is within the event's date range
      if (currentDate >= startDate && currentDate <= endDate) {
        setDialogType("deletePeriodE");
        return;
      }

      // Delete the event from the databas
      const response = await fetch(`/api/event/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      } else {
        console.log("Event deleted successfully");
        setDialogType("deleteSuccess");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
    OnCompleted?.();
  };

  // Function to mark an event as completed
  const markEventAsDone = async (eventId: number) => {
    setIsLoading(true);
    try {
      // Get current event
      const response = await fetch(`/api/event/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error getting the event");
      }

      const event = await response.json();

      // Update "status" to 'DONE'
      const updateResponse = await fetch(`/api/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...event, status: "DONE" }), // Changed 'done: true' to 'status: 'DONE''
      });

      if (!updateResponse.ok) {
        // It's good practice to also check the response status text or body for more details from the API
        const errorData = await updateResponse.text(); // Try to get more error info
        console.error("API Error:", errorData);
        throw new Error(
          "Error updating the event. Status: " + updateResponse.status
        );
      }

      const result = await updateResponse.json();

      if (result.event) {
        // Successful update
        alert("The event has been successfully archived");
      } else {
        // Log the specific error message from the API if available
        console.error("API returned event:false", result.error);
        throw new Error(result.error || "Event could not be updated");
      }
    } catch (error) {
      console.error("Error marking event as completed:", error);
      alert("An error occurred while archiving the event.");
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
          <button
            onClick={() => handleAction("requests")}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FaClipboardList className="mr-2" /> User Requests
          </button>
          <button
            onClick={() => handleAction("edit")}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FaCog className="mr-2" /> Edit Event
          </button>
          {/* Condition for displaying the "Done" button" */}
          {(new Date(row.startDate) < new Date() || new Date(row.endDate) < new Date() || row.status === 'CANCELLED') && (
            <button
              onClick={() => handleAction("done")}
              className="flex items-center w-[95%] px-4 m-1 bg-lime-100 py-2 hover:bg-lime-200 rounded-md"
            >
              <FaCheck className="mr-2 text-lime-600" />{" "}
              <span className="text-lime-600 font-bold">Done</span>
            </button>
          )}
          <button
            onClick={() => handleAction("delete")}
            className="flex items-center w-[95%] px-4 m-1 bg-red-200 py-2 hover:bg-red-300 rounded-md"
          >
            <FaTrash className="mr-2 text-rose-700" />{" "}
            <span className="text-rose-700 font-bold">Delete Event</span>
          </button>
        </div>
      )}

      {/* Show Dialog depending on action */}
      {dialogType === "done" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              CONFIRMATION
            </h2>
            <p className="text-gray-700 mb-3">
              Are you sure you want to mark this event as done?
            </p>
            <p className="text-gray-500 italic mb-7">
              This event will be archived to the records and will not be
              available to workers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid grid-rows-1">
                <button
                  type="button"
                  className="bg-green-600 text-white font-bold px-6 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto disabled:opacity-50"
                  onClick={() => markEventAsDone(row.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "PROCESSING..." : "DONE"}
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

      {dialogType === "doneError" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              This event can't be archived
            </h2>
            <p className="text-gray-700 mb-3">This event has already begun.</p>
            <p className="text text-gray-500 italic mb-9">
              Events that have already started can only be archived.
            </p>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-orange-400 text-white font-bold px-20 py-2 rounded-md hover:bg-orange-500"
                onClick={() => {
                  {
                    /* Close dialog */
                  }
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

      {dialogType === "edit" && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-1/2 w-full max-h-[90vh] overflow-y-auto">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

            {isEditLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-xl font-bold">Loading event data...</div>
              </div>
            ) : (
              <div className="p-1 my-4 h-full w-full">
                {/* HEADER TITLE */}
                <div className="mb-5 justify-self-center">
                  <div className="text-cyan-900 text-center text-3xl lg:text-5xl font-extrabold font-maven">
                    Edit Event
                  </div>
                </div>
                <hr className="w-[100%] border-t-4 border-cyan-900 " />

                {/* FORM */}
                {(
                  <EventEditForm
                    title="Edit Event"
                    eventId={row.id}
                    onSave={ () =>
                    {
                      OnCompleted?.();
                      closeDialog();
                    }
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {dialogType === "requests" && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-8 shadow-lg my-4 lg:w-3/4 w-full lg:h-[80%] h-full max-h-[95vh]">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

            {(
              <div className="p-1 my-4 h-full w-full">
                {/* HEADER TITLE */}
                <div className="mb-5 justify-self-center">
                  <div className="text-cyan-900 text-center text-3xl lg:text-5xl font-extrabold font-maven">
                    Requests 
                  </div>
                </div>
                <hr className="w-full border-t-4 border-cyan-900 mb-3" />

                {/* FORM */}
                {(
                  <div className="overflow-x-auto w-full"><RequestTable event={row}/></div>
                  
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {dialogType === "delete" && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              CONFIRMATION
            </h2>
            <p className="text-gray-700 mb-3">
              Are you sure you want to delete this event?
            </p>
            <p className="text text-gray-500 italic mb-5">
              This event will be deleted permanently from the list.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid grid-rows-1">
                <button
                  type="button"
                  className="bg-pink-700 text-white font-bold px-2 py-2 rounded-md hover:bg-pink-800"
                  onClick={() => {
                    {
                      /* Here goes the confirm logic */
                    }
                    console.log("Confirm Delete Action");
                    deleteEvent(row.id);
                  }}
                >
                  DELETE
                </button>
              </div>
              <div className="grid grid-rows-1">
                <button
                  type="button"
                  className="border-2 border-pink-700 text-pink-700 font-bold px-2 py-2 rounded-md hover:bg-pink-100"
                  onClick={() => {
                    console.log("Confirm Delete Action");
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

      {dialogType === "deleteSuccess" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-10">
              Event successfully deleted
            </h2>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-green-400 text-white font-bold px-20 py-2 rounded-md hover:bg-green-500"
                onClick={() => {
                  {
                    /* Close dialog */
                  }
                  console.log("Event successfully deleted, reloading page");

                  closeDialog();
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {dialogType === "deletePeriodE" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-10">
              We cannot delete an event that has already started.
            </h2>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-green-400 text-white font-bold px-20 py-2 rounded-md hover:bg-green-500"
                onClick={() => {
                  {
                    /* Close dialog */
                  }
                  console.log("Error deleting event, try again");
                  closeDialog();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;

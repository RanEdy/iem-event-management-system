"use client";

import { useEffect, useRef, useState } from "react";
import { useLogin } from "../loginUI/LoginProvider";
import { IUser } from "@/entities/IUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserLevel } from "@prisma/client";

type UserFormProps = {
  title: string;
  userId?: number; //If this component will be use to modified an user
  initialData?: IUser;
  onFormSubmitSuccess?: () => void;
  onSave?: () => void;
};

export const UserForm: React.FC<UserFormProps> = ({
  title,
  userId,
  initialData,
  onFormSubmitSuccess,
  onSave,
}) => {
  const { userSession } = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userId && initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setBirthday(
        initialData.birthday ? new Date(initialData.birthday) : new Date()
      );
      setHireDate(
        initialData.hireDate ? new Date(initialData.hireDate) : new Date()
      );
      setContactName(initialData.contactName || "");
      setContactPhone(initialData.contactPhone || "");
      setGuardCard(initialData.guardCard || false);
      setIsActive(initialData.active);
      setLevel(initialData.level);
    }
  }, [userId, initialData]);

  useEffect(() => {
    console.log("CURRENT USER:", userSession?.name);
    console.log("CURRENT USER LEVEL:", userSession?.level);
  }, [userSession]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [hireDate, setHireDate] = useState<Date>(new Date());
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [guardCard, setGuardCard] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  //if the person who is modifying has the MASTER role
  const [level, setLevel] = useState<UserLevel | "">("");

  // Dialog state for "ok" button in the dialog
  const [succesDialogOpen, setSuccesDialogOpen] = useState(false);
  // This const obtains the generated password, we can delete it later. But for now, we will leave it here to see how it works.
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  // This will be used to clean the form after the user has been created.


  // This dialog state for the success update
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  // Dialog state for "error" button in the dialog
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Check if the user is not MASTER and set STAFF as the default value
    if (userSession?.level !== UserLevel.MASTER) {
      setLevel(UserLevel.STAFF);
    }
  }, [userSession]);

  const updateUser = async (): Promise<any | null> => {
    if (!userId) return null;
    setIsSubmitting(true);
    try {
      const validation = await fetch("/api/user/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: "edit@test.com", // TEMPORARY EMAIL
          phone,
          birthday,
          hireDate,
          contactName,
          contactPhone,
        }),
      });

      const validationResult = await validation.json();

      if (!validationResult.success) {
        setErrorMessage(validationResult.error);
        setErrorDialogOpen(true);
        return null;
      }

      const userToUpdate = {
        name,
        email,
        phone,
        birthday,
        hireDate,
        contactName,
        contactPhone,
        guardCard,
        active: isActive,
        level,
      };
      console.log("User to update:", userToUpdate);

      const responseUpdateUser = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToUpdate),
      });

      const response = await responseUpdateUser.json();

      if (!response.success) {
        setErrorMessage(
          response.error ||
            "An unexpected error occurred while updating the user."
        );
        setErrorDialogOpen(true);
        return null;
      }
      setSuccessMessage(`The user ${name} has been updated successfully.`);
      setSuccesDialogOpen(true);

    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("An unexpected error occurred while updating the user.");
      setErrorDialogOpen(true);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const createUser = async (): Promise<any | null> => {
    try {
      // We validate the data before sending it to the database.
      // If the data is valid, we generate a password.
      const validation = await fetch("/api/user/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          birthday,
          hireDate,
          contactName,
          contactPhone,
        }),
      });

      //validation response
      const validationResult = await validation.json();

      if (!validationResult.success) {
        setErrorMessage(validationResult.error);
        setErrorDialogOpen(true);
        return null;
      }

      // We save the password in our local variable, to send it as a response from the method and thus be able to use it later.
      let generatedPassword = validationResult.generatedPassword;

      // Once everything has been validated, proceed to fill out the interface.
      const userToSend = {
        name,
        password: generatedPassword,
        level,
        email,
        phone,
        birthday,
        hireDate,
        contactName,
        contactPhone,
        guardCard,
        active: isActive,
        supervisorCount: 0,
        managerCount: 0,
        logisticCount: 0,
        driverCount: 0,
        dispatchCount: 0,
        assistantManagerCount: 0,
      };

      //Just to observe what is being stored in the database
      //This should only be seen by developers, before releasing it to production, this console should be removed for security reasons.
      console.log("User to send:", userToSend);

      //Once we have the interface correctly filled out, we proceed to store it in the database
      const responseCreateUser = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToSend),
      });

      const response = await responseCreateUser.json();

      // We return the result of the registration and the password generated before being encrypted.
      return { success: response.success, generatedPassword };
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("An unexpected error occurred while creating the user.");
      setErrorDialogOpen(true);
      return null;
    }
  };

  const cleanForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setBirthday(new Date());
    setHireDate(new Date());
    setContactName("");
    setContactPhone("");
    setGuardCard(false);
    setIsActive(false);
    setLevel("");

    if (userSession?.level === UserLevel.MASTER) {
      setLevel("");
    } else {
      setLevel(UserLevel.STAFF);
    }
  };

  const handleUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (userId) {
        const updatedUser = await updateUser();
        if (updatedUser && updatedUser.success) {
        //   if (onFormSubmitSuccess) {
        //     onFormSubmitSuccess();
        //   }
        }
      } else {
        const newUser = await createUser();
        if (newUser && newUser.success) {
          setGeneratedPassword(newUser.generatedPassword);
          setSuccessMessage("User created successfully.");
          setSuccesDialogOpen(true);
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("An unexpected error occurred while creating the user.");
      setErrorDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-1 my-4 h-full w-full overflow-visible overflow-y-scroll">
      {/* HEADER TITLE */}
      <div className="mb-5 justify-self-center">
        <div className="text-cyan-900 text-center text-3xl lg:text-5xl font-extrabold font-maven">
          {title}
        </div>
      </div>
      <hr className="w-[100%] border-t-4 border-cyan-900 " />

      {/* FORM */}
      <div className="justify-between">
        <form onSubmit={handleUser}>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Name*"
            className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
            title="Name*"
          />

          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
            title="Email*"
          />

          <input
            type="text"
            id="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone*"
            className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
            title="Phone*"
          />

          {/* DATE TABLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  mt-4">
            {/* FIRST CELL: BIRTHDAY DATE */}
            <div className="grid grid-rows-2">
              <label className="text-lg font-bold text-center mb-5">
                DOB
                <hr className="border-t-2 border-gray-300 mt-2" />
              </label>
              <DatePicker
                className="w-full p-2 border-2 border-gray-300 rounded-md"
                selected={birthday}
                onChange={(date) => {
                  if (date) {
                    setBirthday(date);
                  } else {
                    setBirthday(new Date());
                  }
                }}
                dateFormat="MMMM, dd,  yyyy"
                placeholderText="Birthday*"
              />
            </div>

            {/* SECOND CELL: HIRE DATE */}
            <div className="grid grid-rows-2">
              <label
                htmlFor="endDate"
                className="text-lg font-bold text-center mb-5"
              >
                Hire Date
                <hr className="border-t-2 border-gray-300 mt-2" />
              </label>
              <DatePicker
                className="w-full p-2 border-2 border-gray-300 rounded-md"
                selected={hireDate}
                onChange={(date) => {
                  if (date) {
                    setHireDate(date);
                  }
                }}
                dateFormat="MMMM, dd,  yyyy"
                placeholderText="Hire Date*"
              />
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 sm:mt-2 mt-5" />

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FIRST CELL: CONTACT NAME */}
            <div className="grid grid-rows-1">
              <input
                type="text"
                id="EmergencyContactName"
                value={contactName}
                required
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Emergency Contact Name*"
                className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
                title="Emergency Contact Name"
              />
            </div>

            {/* SECOND CELL: CONTACT PHONE */}
            <div className="grid grid-rows-1">
              <input
                type="text"
                id="EmergencyContactPhone"
                value={contactPhone}
                required
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Emergency Contact Phone*"
                className="border-2 border-gray-300 w-full p-2 mt-6 placeholder-gray-400 rounded-md"
                title="Emergency Contact Phone"
              />
            </div>
          </div>

          {/* USER LEVEL: ONLY AVAILABLE FOR MASTER */}
          {userSession?.level === UserLevel.MASTER && (
            <div className="justify-start xs:justify-center lg:justify-start mt-8 w-full sm:w-1/3">
              <label className="flex items-center">
                <select
                  id="userLevel"
                  value={level ?? ""}
                  required
                  onChange={(e) => setLevel(e.target.value as UserLevel)}
                  className="border-2 border-gray-300 w-full p-2 rounded-md"
                  title="User Level*"
                >
                  <option value="">User level</option>
                  {Object.values(UserLevel).map((userLevel) => (
                    <option key={userLevel} value={userLevel}>
                      {userLevel}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {/* GUARD CARD */}
          <div className="grid grid-rows-1 justify-start xs:justify-center lg:justify-start mt-6">
            <label className="flex items-center cursor-pointer">
              {/* SWITCH TEXT */}
              <span className="ml-3 font-bold p-3">
                {guardCard ? "Guard Card" : "No guard card"}
              </span>
              {/* HIDDEN INPUT */}
              <input
                type="checkbox"
                checked={guardCard}
                onChange={() => setGuardCard(!guardCard)}
                className="hidden"
              />
              {/* SWITCH BUTTON STYLE */}
              <div
                className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${
                  guardCard ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {/* CIRCLE ANIMATION */}
                <div
                  className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
                    guardCard ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          <div className="grid grid-rows-1 justify-start xs:justify-center lg:justify-start">
            <label className="flex items-center cursor-pointer">
              {/* SWITCH TEXT */}
              <span className="ml-3 font-bold p-3">
                {isActive ? "Active" : "Inactive"}
              </span>
              {/* HIDDEN INPUT */}
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="hidden"
              />
              {/* SWITCH BUTTON STYLE */}
              <div
                className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${
                  isActive ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {/* CIRCLE ANIMATION */}
                <div
                  className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
                    isActive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 w-full sm:w-1/2 sm:justify-start sm:ml-0">
            <button
              type="button"
              onClick={cleanForm}
              className="h-10 w-full p-2 rounded-md bg-gray-400 hover:opacity-75 text-white font-bold"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full p-2 rounded-md bg-bluedark-gradient-r hover:opacity-75 text-white font-bold"
            >
              {isSubmitting
                ? userId
                  ? "Updating..."
                  : "Creating..."
                : userId
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>

      {succesDialogOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className=" bg-white rounded-md p-6 shadow-md w-full max-w-sm">
          <h3 className="text-lg font-semibold mb-2">
            {userId ? "User updated" : "User created successfully"}
          </h3>
          {!userId ? (
            <p className="text-gray-700 mb-5">
              Password for the user:{" "}
              <span className="font-bold">{generatedPassword}</span>
            </p>
          ) : (
            <p className="text-gray-700 ">{successMessage}</p>
          )}
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
              onClick={() => {
                setSuccesDialogOpen(false);
                if (!userId) {
                  cleanForm();
                }
                if (onSave) {
                  onSave();
                }
                if (userId && onFormSubmitSuccess) {
                  onFormSubmitSuccess();
                }
              }}
            >
              Close
            </button>
        </div>
      </div>
    )}
      {/* DIALOG ERROR */}
      {errorDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-3xl p-10 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-3">
              This user can't be created or updated
            </h2>
            <p className="text-gray-700 mb-5 text-center">{errorMessage}</p>
            <div className="grid grid-cols-1 justify-items-center">
              <button
                type="button"
                className="bg-red-500 text-white font-bold px-20 py-2 rounded-md hover:bg-red-600"
                onClick={() => setErrorDialogOpen(false)}
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

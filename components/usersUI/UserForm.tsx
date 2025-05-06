"use client"

import { useEffect, useRef, useState } from "react";
import { IUser } from "@/entities/IUser";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { UserLevel } from "@prisma/client";

type UserFormProps = {
    title: string;
    userId?: number; //If this component will be use to modified an event
}

export const UserForm: React.FC<UserFormProps> = ({ title, userId }) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [birthday, setBirthday] = useState<Date>(new Date());
    const [hireDate, setHireDate] = useState<Date>(new Date());
    const [contactName, setContactName] = useState<string>('');
    const [contactPhone, setContactPhone] = useState<string>('');
    const [guardCard, setGuardCard] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    //if the person who is modifying has the MASTER role
    const [level, setLevel] = useState<UserLevel>(UserLevel.STAFF);

    const handleUser = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(name, email, phone, birthday, hireDate, contactName, contactPhone, guardCard, isActive, level);

    }

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
                            <label className="text-lg font-bold text-center">
                                Birthday
                                <hr className="border-t-2 border-gray-300 mt-2" />
                            </label>
                            <DatePicker
                                className="w-full p-2 border-2 border-gray-300 rounded-md"
                                selected={birthday}
                                onChange={(date) => {
                                    if (date) {
                                        setBirthday(date)
                                    } else {
                                        setBirthday(new Date())
                                    }
                                }}
                                showTimeSelect
                                dateFormat="MMMM, dd,  yyyy hh:mm aa"
                                placeholderText="Birthday*"
                            />
                        </div>

                        {/* SECOND CELL: HIRE DATE */}
                        <div className="grid grid-rows-2">
                            <label htmlFor="endDate" className="text-lg font-bold text-center">
                                Hire Date
                                <hr className="border-t-2 border-gray-300 mt-2" />
                            </label>
                            <DatePicker
                                className="w-full p-2 border-2 border-gray-300 rounded-md"
                                selected={hireDate}
                                onChange={(date) => {
                                    if (date) {
                                        setHireDate(date)
                                    }
                                }}
                                showTimeSelect
                                dateFormat="MMMM, dd,  yyyy hh:mm aa"
                                placeholderText="Hire Date*"
                            />
                        </div>

                    </div>

                    <hr className="border-t-2 border-gray-300 mt-6" />

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

                    {/* GUARD CARD */}
                    <div className="grid grid-rows-1 justify-start xs:justify-center lg:justify-start mt-6">
                        <label className="flex items-center cursor-pointer">
                            {/* SWITCH TEXT */}
                            <span className="ml-3 font-bold p-3">{guardCard ? "Guard Card" : "No guard card"}</span>
                            {/* HIDDEN INPUT */}
                            <input
                                type="checkbox"
                                checked={guardCard}
                                onChange={() => setGuardCard(!guardCard)}
                                className="hidden"
                            />
                            {/* SWITCH BUTTON STYLE */}
                            <div className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${guardCard ? 'bg-green-500' : 'bg-red-500'}`}>
                                {/* CIRCLE ANIMATION */}
                                <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${guardCard ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </label>
                    </div>

                    <div className="grid grid-rows-1 justify-start xs:justify-center lg:justify-start">
                        <label className="flex items-center cursor-pointer">
                            {/* SWITCH TEXT */}
                            <span className="ml-3 font-bold p-3">{isActive? "Active" : "Inactive"}</span>
                            {/* HIDDEN INPUT */}
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                className="hidden"
                            />
                            {/* SWITCH BUTTON STYLE */} 
                            <div className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${isActive? 'bg-green-500' : 'bg-red-500'}`}>
                                {/* CIRCLE ANIMATION */}
                                <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${isActive? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </label>
                    </div>
                
                    <button
                            type="submit"
                            className="h-10 w-full p-2 sm:w-1/3 mt-6 rounded-md bg-blue-900 text-white font-bold">
                            Save
                    </button>
                </form>
            </div>
        </div>
    );
}
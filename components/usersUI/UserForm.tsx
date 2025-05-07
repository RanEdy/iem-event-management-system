"use client"

import { useEffect, useRef, useState } from "react";
import { IUser } from "@/entities/IUser";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { UserLevel } from "@prisma/client";
import bcrypt from 'bcryptjs'; // If "npm install" doesn't work, use the following command: "npm install bcryptjs @types/bcryptjs"

type UserFormProps = {
    title: string;
    userId?: number; //If this component will be use to modified an user
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

    // Algorithm to create a password based on the data of the user
    const passwordGenerator = () => {
        // Get the first name
        const firstName = name.split(' ')[0].toLowerCase();

        // Calculate age based on date of birth
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();

        // Get the part of the email before the @ or the first dot 
        const emailPrefix = email.split('@')[0].split('.')[0];

        // Get the last 4 digits of the phone
        const lastFourDigits = phone.replace(/\D/g, '').slice(-4);

        // Combine everything to create the password
        const password = `${firstName}${age}${emailPrefix}${lastFourDigits}`;

        return password;
    };

    // Function to hash the password
    const hashPassword = async (plainPassword: string) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(plainPassword, salt);
    };

    // Function to validate form fields
    const validateForm = (): { isValid: boolean, error: string } => {

        if (!name.trim()) {
            return { isValid: false, error: 'The name is required' };
        }

        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(name)) {
            return { isValid: false, error: 'The name must only contain letters' };
        }

        if (!email.trim()) {
            return { isValid: false, error: 'The email is required' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, error: 'The email format is not valid' };
        }

        if (!phone.trim()) {
            return { isValid: false, error: 'The phone number is required' };
        }

        const phoneRegex = /^[\d\s()-]+$/;
        if (!phoneRegex.test(phone)) {
            return { isValid: false, error: 'The phone number must only contain numbers, parentheses, or hyphens' };
        }

        if (!birthday) {
            return { isValid: false, error: 'The birth date is required' };
        }

        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        if (age < 16 || (age === 16 && monthDiff < 0)) {
            return { isValid: false, error: 'The minimum age must be 16 years old' };
        }

        if (!hireDate) {
            return { isValid: false, error: 'The hire date is required' };
        }

        if (hireDate > today) {
            return { isValid: false, error: 'The hire date cannot be in the future' };
        }

        if (!contactName.trim()) {
            return { isValid: false, error: 'The emergency contact name is required' };
        }

        if (!nameRegex.test(contactName)) {
            return { isValid: false, error: 'The emergency contact name must only contain letters' };
        }

        if (!contactPhone.trim()) {
            return { isValid: false, error: 'The emergency contact phone number is required' };
        }

        if (!phoneRegex.test(contactPhone)) {
            return { isValid: false, error: 'The emergency contact phone number must only contain numbers, parentheses, or hyphens' };
        }

        return { isValid: true, error: '' };
    };

    const createUser = async (): Promise<any | null> => {
        // Validate the form before creating the user
        const validation = validateForm();
        if (!validation.isValid) {
            alert(validation.error);
            return null;
        }

        const plainPassword = passwordGenerator();
        const hashedPassword = await hashPassword(plainPassword);

        const userToSend: Omit<IUser, 'id'> = {
            name,
            password: hashedPassword,
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

        console.log('Password generado (guardar para enviarlo al usuario):', plainPassword);
        console.log('Password hasheado:', hashedPassword);
        console.log(userToSend);

        // Create a new Event
        const responseCreateUser = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToSend),
        });

        // { success, event, message}
        const dataCreateUser = await responseCreateUser.json();
        console.log(dataCreateUser);
        return dataCreateUser;
    }

    const handleUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUSER = await createUser();
            console.log(newUSER);

            if (newUSER.success) {
                // Mostrar diálogo de éxito
                alert('User created successfully!\nPassword for user: ' + 
                      passwordGenerator());
                
                // Limpiar el formulario
                setName('');
                setEmail('');
                setPhone('');
                setBirthday(new Date());
                setHireDate(new Date());
                setContactName('');
                setContactPhone('');
                setGuardCard(false);
                setIsActive(false);
                setLevel(UserLevel.STAFF);
            } else {
                alert('Error creating user: ' + (newUSER.error || 'Unknown error'));
            }

        } catch (error) {
            console.error("ERROR", error);
        }
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
                            <span className="ml-3 font-bold p-3">{isActive ? "Active" : "Inactive"}</span>
                            {/* HIDDEN INPUT */}
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                className="hidden"
                            />
                            {/* SWITCH BUTTON STYLE */}
                            <div className={`w-14 h-7 flex items-center p-1 rounded-full transition-all ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                {/* CIRCLE ANIMATION */}
                                <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
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
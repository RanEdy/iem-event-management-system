import { IUser } from "@/entities/IUser";
import { DAOLocator } from "@/persistence/DAOLocator";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
// Import bcrypt if you are going to use password hashing in the future.
import bcrypt from 'bcrypt'; // <-- Uncomment or add this line


/**
 * Class with methods for everything related to the user.
 * Utilizes Prisma ORM for database communication through DAO instances.
 * @author Erandi Angel
 */

// Define an interface for the validation result
interface ValidationResult {
    isValid: boolean;
    error: string;
    generatedPassword?: string; // Optional, only included if isValid is true
}

export class UserService {
    // Defines the number of salting rounds (cost factor).
    // A higher value is safer but slower. 10-12 is a good starting point.
    private saltRounds = 10;

    constructor() { }

    /**
     * Finds a user by email and verifies the password using bcrypt.
     * @param email The user's email.
     * @param password The plain text password to verify.
     * @returns The user object if credentials are valid, otherwise null.
     */
    async verifyCredentials(email: string, password: string): Promise<IUser | null> {
        try {
            const user = await DAOLocator.userDao.findByEmail(email);

            if (!user) {
                console.log(`User not found with email: ${email}`);
                return null;
            }

            // Compare the password provided with the stored hash
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                console.log(`Invalid password for email: ${email}`);
                return null; // Incorrect password
            }

            console.log(`Credentials verified for email: ${email}`);
            return user; // Valid credentials
        }
        catch (error) {
            console.error("Error verifying credentials:", error);
            // Consider whether to return null or throw a specific error
            return null; // Error during verification
        }
    }



    /**
     * Searches for a unique entry that matches with the id in the user table.
     * @param id The primary key of the user.
     * @returns A unique object of type User if found. Otherwise return null.
     */
    async findById(id: number): Promise<IUser | null> {
        return DAOLocator.userDao.findById(id);
    }

    /**
     * Searches for all the entries of the user table.
     * @returns An array of user objects found in the table.
     */
    async findAll(): Promise<IUser[]> {
        return DAOLocator.userDao.findAll();
    }

    /**
    * Creates a new user entry in the database with a hashed password.
    * @param userData The object containing the user's information, excluding the ID.
    *                 The password should be plain text here.
    * @returns A boolean, "true" if the creation was successful, otherwise "false".
    */
    async create(userData: Omit<IUser, 'id'>): Promise<boolean> {
        try {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);

            // Create user object with hashed password
            const userToCreate = {
                ...userData,
                password: hashedPassword
            };

            await DAOLocator.userDao.create(userToCreate);
            console.log(`User created successfully for email: ${userData.email}`);
            return true;
        }
        catch (error) {
            console.error("User could not be created:", error);
            return false;
        }
    }

    /**
    * Updates an existing user entry in the database.
    * IMPORTANT: If updating the password, ensure it's hashed first.
    * This example assumes the password in userData might already be hashed
    * or is not being updated. Add hashing logic if plain text password update is needed.
    * @param userData The object containing the user's updated information.
    * @returns A boolean, "true" if the update was successful, otherwise "false".
    */
    async update(userData: IUser): Promise<boolean> {
        try {
            // !! WARNING !!
            // If you allow password updates here, you MUST make sure you
            // that the password in `userData.password` is hashed BEFORE
            // to call this function, or add logic here to hash it
            // if it is detected to be a plaintext password.
            // For simplicity, this example assumes that the password is not updated.
            // or that it is already hashed.

            await DAOLocator.userDao.update(userData);
            console.log(`User updated successfully for ID: ${userData.id}`);
            return true;
        }
        catch (error) {
            console.error("User could not be updated:", error);
            return false;
        }
    }

    /**
    * Inserts or updates a user entry in the database.
    * @param userData The object containing the user's information.
    * @returns A boolean, "true" if the operation was successful, otherwise "false".
    */
    async upsert(userData: IUser): Promise<boolean> {
        try {
            await DAOLocator.userDao.upsert(userData);
            return true;
        }
        catch (error) {
            console.error("User could not be updated or created (upsert)");
            return false;
        }
    }

    /**
    * Deletes a user entry from the database by its ID.
    * @param id The primary key of the user to be deleted.
    * @returns A boolean, "true" if the deletion was successful, otherwise "false".
    */
    async deleteById(id: number): Promise<boolean> {
        try {
            await DAOLocator.userDao.deleteById(id);
            return true;
        }
        catch (error) {
            console.error("User could not be deleted");
            return false;
        }
    }

    /**
    * Validates user data based on specific criteria.
    * @param userData The object containing the user's information.
    * @returns An object with a boolean indicating if the data is valid,
    *          an error message if the data is invalid, and a generated password if valid.
    */
    async validateUserData(userData: {
        name: string;
        email: string;
        phone: string;
        birthday: Date;
        hireDate: Date;
        contactName: string;
        contactPhone: string;
    }): Promise<ValidationResult> {

        // Destructure the userData object
        const { name, email, phone, birthday, hireDate, contactName, contactPhone } = userData;

        // Regular expressions for validation
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s()-]+$/;
        const today = new Date();

        // Validate each field
        if (!name?.trim()) return { isValid: false, error: 'The name is required' };
        if (!nameRegex.test(name)) return { isValid: false, error: 'The name must only contain letters' };
        if (!email?.trim()) return { isValid: false, error: 'The email is required' };
        if (!emailRegex.test(email)) return { isValid: false, error: 'The email format is not valid' };
        if (!phone?.trim()) return { isValid: false, error: 'The phone number is required' };
        if (!phoneRegex.test(phone)) return { isValid: false, error: 'The phone number must only contain numbers, parentheses, or hyphens' };

        //Check if the email is already registered
        const existingUser = await DAOLocator.userDao.findByEmail(email);
        if (existingUser) {
            return { isValid: false, error: 'The e-mail address is already registered' };
        }
        
        //Let's make sure birthday is a Date object
        //For reasons unknown to me, for age validations, the value of birthday cannot be used directly, since it is not recognized as a date type object.
        const birthdayDate = new Date(birthday);

        if (!birthday) return { isValid: false, error: 'The birth date is required' };
        
        // Use birthdayDate instead of birthday
        const age = today.getFullYear() - birthdayDate.getFullYear();
        const monthDiff = today.getMonth() - birthdayDate.getMonth();
        
        if (age < 16 || (age === 16 && monthDiff < 0)) {
            return { isValid: false, error: 'The minimum age must be 16 years old' };
        }

        if (!hireDate) return { isValid: false, error: 'The hire date is required' };
        if (hireDate > today) return { isValid: false, error: 'The hire date cannot be in the future' };
        if (!contactName?.trim()) return { isValid: false, error: 'The emergency contact name is required' };
        if (!nameRegex.test(contactName)) return { isValid: false, error: 'The emergency contact name must only contain letters' };
        if (!contactPhone?.trim()) return { isValid: false, error: 'The emergency contact phone number is required' };
        if (!phoneRegex.test(contactPhone)) return { isValid: false, error: 'The emergency contact phone number must only contain numbers, parentheses, or hyphens' };

        //if all validations pass, generate a password and return it
        const generatedPassword = await this.passwordGenerator(name, email, birthday, phone);
        console.log("Generated password: " + generatedPassword);

        return {
            isValid: true,
            error: '',
            generatedPassword
        };
    }

    /**
    * Generates a password based on user information.
    * @param name The user's name.
    * @param email The user's email.
    * @param birthday The user's birth date.
    * @param phone The user's phone number.
    * @returns A string representing the generated password.
    */
    async passwordGenerator(name: string, email: string, birthday: Date, phone: string): Promise<string> {
        const firstName = name.split(' ')[0].toLowerCase();
        const age = new Date().getFullYear() - new Date(birthday).getFullYear();
        const emailPrefix = email.split('@')[0].split('.')[0];
        const lastFourDigits = phone.replace(/\D/g, '').slice(-4).padStart(4, '0');

        const generatedPassword = `${firstName}${age}${emailPrefix}${lastFourDigits}`;

        return generatedPassword;
    }
}
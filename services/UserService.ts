import { IUser } from "@/entities/IUser";
import { DAOLocator } from "@/persistence/DAOLocator";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
// Import bcrypt if you are going to use password hashing in the future.
import bcrypt from 'bcrypt'; // <-- Uncomment or add this line
import crypto from 'crypto';
import nodemailer from 'nodemailer';


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
            console.log(`Intentando verificar credenciales para email: ${email}`);
            const user = await DAOLocator.userDao.findByEmail(email);
    
            if (!user) {
                console.log(`Usuario no encontrado con email: ${email}`);
                return null;
            }
    
            console.log(`Usuario encontrado: ${user.email}, verificando contraseña...`);
            // Compare the password provided with the stored hash
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                console.log(`Contraseña inválida para email: ${email}`);
                return null; // Incorrect password
            }
    
            console.log(`Credenciales verificadas para email: ${email}`);
            return user; // Valid credentials
        }
        catch (error) {
            console.error("Error verificando credenciales:", error);
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
        const phoneRegex = /^[+\d\s()-]+$/; 
        const today = new Date();

        // Validate each field
        if (!name?.trim()) return { isValid: false, error: 'The name is required' };
        if (!nameRegex.test(name)) return { isValid: false, error: 'The name must only contain letters' };
        if (name.length > 40) return { isValid: false, error: 'The name cannot exceed 40 characters' };
        if (!email?.trim()) return { isValid: false, error: 'The email is required' };
        if (!emailRegex.test(email)) return { isValid: false, error: 'The email format is not valid' };
        if (email.length > 40) return { isValid: false, error: 'The email cannot exceed 40 characters' };
        if (!phone?.trim()) return { isValid: false, error: 'The phone number is required' };        
        if (!phoneRegex.test(phone)) return { isValid: false, error: 'The phone number must only contain numbers, +, parentheses, or hyphens' };  
        if (phone.length > 18) return { isValid: false, error: 'The phone number cannot exceed 18 characters in total' };
         
        const numericDigits = phone.replace(/\D/g, '');
        if (numericDigits.length < 7 || numericDigits.length > 15) {
            return { isValid: false, error: 'The phone number must contain between 7 and 15 digits' };
        }

        //Check if the email is already registered
        const existingUser = await DAOLocator.userDao.findByEmail(email);
        if (existingUser) {
            return { isValid: false, error: 'The e-mail address is already registered' };
        }
        
        //Let's make sure birthday and hireDate are a Date object
        const birthdayDate = new Date(birthday);
        const hireDateDate = new Date(hireDate);

        if (!birthday) return { isValid: false, error: 'The birth date is required' };

        // Check if the user is at least 16 years old
        const age = today.getFullYear() - birthdayDate.getFullYear();
        const monthDiff = today.getMonth() - birthdayDate.getMonth();
        if (age < 16 || (age === 16 && monthDiff < 0)) {
            return { isValid: false, error: 'The minimum age must be 16 years old' };
        }

        if (!hireDate) return { isValid: false, error: 'The hire date is required' };
        if (hireDateDate > today) return { isValid: false, error: 'The hire date cannot be in the future' };
        if (hireDateDate < birthdayDate) return { isValid: false, error: 'The hire date cannot be before the birth date' };

        // Check if the user has at least 16 years between birth date and hire date
        const yearDiff = hireDateDate.getFullYear() - birthdayDate.getFullYear();
        const hireMonthDiff = hireDateDate.getMonth() - birthdayDate.getMonth();
        const dayDiff = hireDateDate.getDate() - birthdayDate.getDate();
        if (yearDiff < 16 || (yearDiff === 16 && (hireMonthDiff < 0 || (hireMonthDiff === 0 && dayDiff < 0)))) {
            return { isValid: false, error: 'There must be at least 16 years between birth date and hire date' };
        }

        if (!contactName?.trim()) return { isValid: false, error: 'The emergency contact name is required' };
        if (!nameRegex.test(contactName)) return { isValid: false, error: 'The emergency contact name must only contain letters' };
        if (contactName.length > 40) return { isValid: false, error: 'The contact name cannot exceed 40 characters' };
        if (!contactPhone?.trim()) return { isValid: false, error: 'The emergency contact phone number is required' };     
        if (!phoneRegex.test(contactPhone)) return { isValid: false, error: 'The emergency contact phone number must only contain numbers, +, parentheses, or hyphens' };
        if (contactPhone.length > 18) return { isValid: false, error: 'The emergency contact phone number cannot exceed 18 characters in total' };
        
        const contactNumericDigits = contactPhone.replace(/\D/g, '');
        if (contactNumericDigits.length < 7 || contactNumericDigits.length > 15) {
            return { isValid: false, error: 'The emergency contact phone number must contain between 7 and 15 digits' };
        }

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

    /**
    * Handles the request to reset a user's password.
    * Generates a reset token, stores it, and sends an email to the user.
    * @param email The email of the user requesting a password reset.
    * @returns A boolean indicating if the request was processed successfully.
    */
    async requestPasswordReset(email: string): Promise<boolean> {
        try {
            const user = await DAOLocator.userDao.findByEmail(email);
            if (!user) {
                console.log(`Password reset request for non-existent email: ${email}`);
                return true;
            }

            const token = crypto.randomBytes(32).toString('hex');
            const expires = new Date(Date.now() + 30 * 60 * 1000); // Token valid for 30 minutes

            // En lugar de userWithToken que incluye todos los campos de 'user':
            // const userWithToken = {
            //     ...user,
            //     resetPasswordToken: token,
            //     resetPasswordExpires: expires,
            // };

            // Crear un payload específico para la actualización del token.
            // Esto clarifica la intención de actualizar solo estos campos para el usuario identificado por user.id.
            // UserDAO.update debe usar 'id' para la cláusula 'where' y el resto para 'data',
            // asegurándose de que 'id' no se incluya en el payload 'data' de Prisma.
            const updatePayload = {
                id: user.id, // Necesario para que el DAO identifique al usuario
                resetpasswordtoken: token,
                resetpasswordexpires: expires,
            };
            
            // Se realiza un cast a IUser. Esto asume que los demás campos de IUser son opcionales
            // o que UserDAO.update maneja correctamente actualizaciones parciales.
            // NOTA: Si UserDAO.update sigue pasando el campo 'id' de este objeto al 'data' de Prisma,
            // el error persistirá. La solución fundamental está en cómo UserDAO.update construye la llamada a Prisma.
            await DAOLocator.userDao.update(updatePayload as IUser);


            const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
            
            // Email content based on the provided image
            const emailHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="font-size: 24px; color: #333;">Hello ${user.name || 'User'},</h2>
                    <p style="font-size: 16px; color: #555;">
                        We received a request to reset your password. If it was you who requested it, click on the link below:
                    </p>
                    <p style="margin: 20px 0;">
                        <a href="${resetUrl}" style="font-size: 16px; color: #007bff; text-decoration: none;">
                            &#128279; Reset password
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #777;">
                        This link is valid for 30 minutes. If you do not reset your password within that time, you will have to request a new link again.
                    </p>
                    <p style="font-size: 14px; color: #777; margin-top: 20px;">
                        If you did not request a password reset, you can ignore this message. No change will be made.
                    </p>
                    <p style="font-size: 16px; color: #555; margin-top: 30px;">
                        Thank you,
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        - The IEM Team
                    </p>
                </div>
            `;

            // Configure Nodemailer transporter
            // IMPORTANT: Set up these environment variables:
            // EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE (true/false), EMAIL_USER, EMAIL_PASS, EMAIL_FROM
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT || "587"),
                secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER, // your email user
                    pass: process.env.EMAIL_PASS, // your email password
                },
            });

            await transporter.sendMail({
                from: `"The IEM Team" <${process.env.EMAIL_FROM}>`, // sender address
                to: user.email, // list of receivers
                subject: "Password Reset Request", // Subject line
                html: emailHtml, // html body
            });

            console.log(`Password reset email sent to: ${user.email}`);
            return true;

        } catch (error) {
            console.error("Error during password reset request:", error);
            return false;
        }
    }
}
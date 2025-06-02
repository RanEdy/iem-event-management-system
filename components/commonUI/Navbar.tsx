"use client";

import React, {useState} from 'react';
import { UserLevel } from '@prisma/client';
import { NavbarButton } from './NavbarButton';
// Importa los iconos que necesites, por ejemplo:
import { FaUserFriends, FaFolderOpen, FaClipboardList, FaUser, FaUserShield, FaUserCog, FaTimes } from "react-icons/fa";
import { useNavigation } from '@/contexts/NavigationContext';
import { useLogin } from '../loginUI/LoginProvider';



type NavbarProps = {
    level: UserLevel; // Esta prop 'level' parece ser del componente Navbar en sí, no necesariamente del usuario en sesión.
                     // Nos basaremos en userSession.level para el icono del usuario.
    options: string[];
}


const Navbar: React.FC<NavbarProps> = ({level, options}) => 
{
    const { currentPage, setCurrentPage } = useNavigation();
    const { setUserSession } = useLogin(); // Obtener el estado y el setUserSession del context
    const { userSession } = useLogin(); 
    const [ isProfileOpen, setIsProfileOpen ] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [editableInfo, setEditableInfo] = useState({
      name: userSession?.name || '',
      email: userSession?.email || '',
      phone: userSession?.phone || '',
      contactName: userSession?.contactName || '',
      contactPhone: userSession?.contactPhone || '',
    });

    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const initiateLogout = () => {
      setLogoutDialogOpen(true);
  };

    const handleLogout = async () => {
      
      try {
        const response = await fetch('/api/user/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setUserSession(null); 
          setIsProfileOpen(false);
          window.location.href = '/login' // Actualiza el estado de sesión en el contexto
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    const[initialInfo, setInitialInfo] = useState({
      name: userSession?.name || '',
      email: userSession?.email || '',
      phone: userSession?.phone || '',
      contactName: userSession?.contactName || '',
      contactPhone: userSession?.contactPhone || '',
    });

    const isModified = () => {
      return JSON.stringify(editableInfo) !== JSON.stringify(initialInfo);
    };

    const [errors, setErrors] = useState<{[key: string]: string}>({
      name: '',
      email: '',
      phone: '',
      contactName: '',
      contactPhone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    


    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditableInfo(prev => ({
        ...prev,
        [name]: value,
      }))
    };

    const handleSubmit = async () => {
      setIsSubmitting(true);
      setErrors({
       name: '',
        email: '',
        phone: '',
        contactName: '',
        contactPhone: '',
        general: ''
      });
      try{
        const validation = await fetch('/api/user/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editableInfo.name,
            email: editableInfo.email, //"edit@test.com",
            phone: editableInfo.phone,
            contactName: editableInfo.contactName,
            contactPhone: editableInfo.contactPhone,
            birthday: userSession?.birthday,
            hireDate: userSession?.hireDate,
            currentUserID: userSession?.id
            //id: currentUser.id,
            //level: userSession?.level,*/
          }),
        });

        const validationResult = await validation.json();
        
        if(!validationResult.success){
          if(validationResult.errors){
          setErrors(prev =>({
            ...prev,
            ...validationResult.errors,
          }));
        } else if(validationResult.field && validationResult.error){
          setErrors(prev =>({
           ...prev,
           [validationResult.field]: validationResult.error
          }));
        } else {
          setErrors(prev =>({
          ...prev,
           general: validationResult.error || 'Validation failed'
          }));
          
        }
        setIsSubmitting(false);
        
        
        return;
      }
        
        const response = await fetch(`/api/user/${userSession?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editableInfo),
        });

        if (response.ok) {
          const updatedData = await response.json();
          if(userSession){
            const updatedUserSession = {
              ...userSession,
              ...editableInfo
            };
            setUserSession(updatedUserSession);
          }
            setInitialInfo(editableInfo);
            setIsProfileOpen(false);
            setSuccessMessage('Profile updated successfully');
            setSuccessDialogOpen(true);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating user:', error);
        setErrors({
          ...errors,
          general: 'An unexpected error occurred wile updating the profile.'
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderUserIcon = () => {
        if (!userSession) {
            return <FaUser className="w-3/5 h-3/5 text-white self-center"/>; // Icono por defecto si no hay sesión
        }

        switch (userSession.level) {
            case UserLevel.MASTER:
                return <FaUserCog className="w-3/5 h-3/5 text-white self-center"/>; // Ejemplo para MASTER
            case UserLevel.ADMIN:
                return <FaUserShield className="w-3/5 h-3/5 text-white self-center"/>; // Ejemplo para ADMIN
            case UserLevel.STAFF:
                return <FaUser className="w-3/5 h-3/5 text-white self-center"/>; // Ejemplo para STAFF
            default:
                return <FaUser className="w-3/5 h-3/5 text-white self-center"/>; // Icono por defecto
        }
    };
    
    return (
      <>
        <div className="flex h-32 w-full p-6 m-0 shadow-lg shadow-gray-700 items-center justify-between bg-bluedark-gradient-r">
            {/* Logo Img */}
            <div className="flex-shrink-0">
                <img className="h-30 w-48" src="/img/iem_icon_white.png"/>
            </div>

            {/* Option Buttons */}
            <div className="h-full w-auto flex flex-row justify-between flex-shrink-0">
                <NavbarButton 
                    name={"Events"} 
                    icon={<FaClipboardList className="text-white h-3/4 w-3/4"/>}
                    onClick={() => setCurrentPage("Events")}
                />
                {(userSession?.level === UserLevel.MASTER || userSession?.level === UserLevel.ADMIN) && (
                    <>
                        <NavbarButton 
                            name={"Users"} 
                            icon={<FaUserFriends className="text-white h-3/4 w-3/4"/>}
                            onClick={() => setCurrentPage("Users")}
                        />
                        <NavbarButton 
                            name={"Archives"} 
                            icon={<FaFolderOpen className="text-white h-3/4 w-3/4"/>}
                            onClick={() => setCurrentPage("Archives")}
                        />
                    </>
                )}
            </div>

            {/* User Info */}
            <div className="flex flex-shrink-0 items-center"> 
                {userSession && ( 
                    <span className="text-white font-semibold mr-4">{userSession.name}</span> 
                )}
                <button className="flex w-16 h-16 bg-bluedark-gradient-r justify-center rounded-full" onClick={() => setIsProfileOpen(true)}>
                    {renderUserIcon()} {/* Llama a la función para renderizar el icono */}
                </button>
            </div>
        </div>
        {/* Profile Sidebar */}
        {isProfileOpen &&(
          <div className='fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto border-l-4 border-gray-200'>
            <div className="flex h-32 w-full p-6 m-0 shadow-lg shadow-gray-700 items-center justify-between bg-bluedark-gradient-r">
              <h2 className='text-2xl font-bold text-white'>Profile Information</h2>
              <button onClick={() => setIsProfileOpen(false)} className='text-gray-500 hover:text-gray-700'>
                <FaTimes size={24} />
              </button>
            </div>
            <div className='space-y-4 p-6 pt-4'>
              {/* Campos editables */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={editableInfo.name}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                />
                {errors.name && <div className='mt-1 text-sm text-red-600'>{errors.name}</div>}
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={editableInfo.email}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={editableInfo.phone}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Emergency Contact Name</label>
                  <input
                    type='text'
                    name='contactName'
                    value={editableInfo.contactName}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Emergency Contact Phone Number</label>
                  <input
                    type='tel'
                    name='contactPhone'
                    value={editableInfo.contactPhone}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                  />
                  </div>
                  {/* Read-only Fields */}
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>DOB</label>
                    <div className='w-full p-2 bg-gray-100 rounded-md'>
                      {userSession?.birthday ? new Date(userSession.birthday).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Hire Date</label>
                    <div className='w-full p-2 bg-gray-100 rounded-md'>
                      {userSession?.hireDate? new Date(userSession.hireDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  {errors.general && (
                  <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
                    <p className='text-sm text-red-600'>{errors.general}</p>
                  </div>
)}
                  <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || !isModified()}
                  className={`w-full mt-6 text-white py-2 px-4 rounded-md transition-colors
                    ${isSubmitting || !isModified() 
                      ? 'bg-gray-300 cursor-not-allowed'  // Botón deshabilitado: gris claro
                      : 'bg-bluedark-gradient-r hover:opacity-75'}  // Botón activo: azul con hover
                  `}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}</button>
                    <button 
                      onClick={initiateLogout}
                      className='w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white 
                      rounded-md transition-colors'>Log Out</button>
                </div>
            </div>
        )}
        {logoutDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
                        <p className="text-gray-700">Are you sure you want to log out?</p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setLogoutDialogOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        {successDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-2">Success</h3>
              <p className="text-gray-700">{successMessage}</p>
              <button
                onClick={() => setSuccessDialogOpen(false)}
                className="mt-4 px-4 py-2 bg-bluedark-gradient-r hover:opacity-75 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
}

export default Navbar;
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/components/loginUI/LoginProvider';
import { EventsPage } from "@/components/eventsUI/EventsPage";
import { ArchivesPage } from "@/components/ArchivesUI/ArchivesPage";
import { UsersPage } from "@/components/usersUI/UsersPage";
import { useNavigation } from "@/contexts/NavigationContext";

export default function MainPage() {
    const { currentPage } = useNavigation();
    const { userSession, isLoading } = useLogin();
    const router = useRouter();

    useEffect(() => {
        // If it is not loading and there is no user session, redirect to /login
        if (!isLoading && !userSession) {
            router.push('/login');
        }
    }, [userSession, isLoading, router]); // UseEffect dependencies

    // If it is loading or there is no session (and the redirection has not yet occurred),
    // you can display a loader or nothing to avoid flickering of the content.
    if (isLoading || !userSession) {
        return <div>Cargando...</div>; // Or a more elaborate loading component
    }

    // If there is a session, render the content of the page.
    return (
        <>
            {currentPage === "Events" ? (
                <EventsPage />
            ) : currentPage === "Users" ? (
                <UsersPage />
            ) : (
                <ArchivesPage />
            )}
        </>
    );
}
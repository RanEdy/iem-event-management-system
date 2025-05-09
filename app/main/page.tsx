"use client";

import { EventsPage } from "@/components/eventsUI/EventsPage";
import { ArchivesPage } from "@/components/ArchivesUI/ArchivesPage";
import { UsersPage } from "@/components/usersUI/UsersPage";
import { useNavigation } from "@/contexts/NavigationContext";

export default function MainPage() {
    const { currentPage } = useNavigation();

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
"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.accessToken !== null );

    useEffect(() => {
        // Check if the user is authenticated, redirect to login if not.
        if (!isAuthenticated) {
            router.push('/'); // Redirect to the login page.
        }
    }, [isAuthenticated, router]);

    return <>{children}</>;
};

export default ProtectedRoute;
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export const ProtectedRoutes = (props) => {
    const { Components } = props; // Changed from "Components" to "Component" for consistency
    const navigate = useNavigate();
    const location = useLocation()
    console.log('params', location.pathname);

    useEffect(() => {
        let login = localStorage.getItem('login');
        if (!login) {
            navigate('/login');
           
        }
        // if(login && location.pathname == '/login') {
        //     navigate('/dashboard')
        //     alert()
        // }

        

        // Cleanup function to avoid memory leaks
        return () => {
            // Cleanup code if needed
        };
    }, []); // Added an empty dependency array

    return (
        <>
            <Components />
        </>
    );
};

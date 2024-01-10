import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export const ProtectedRoutes = (props) => {
    const { Components } = props; // Changed from "Components" to "Component" for consistency
    const navigate = useNavigate();
    const location = useLocation()
    console.log('params', location.pathname);
    let login = localStorage.getItem('login');
    // useEffect(() => {
    //     let login = localStorage.getItem('login');
    //     if (!login) {
    //         navigate('/login');
           
    //     }
     
        

    //     // Cleanup function to avoid memory leaks
    //     return () => {
    //         // Cleanup code if needed
    //     };
    // }, []); // Added an empty dependency array



    useEffect(() => {
        if (!login) {
            navigate('/login');
        }else if(login && location.pathname === '/') {
            navigate('/dashboard');
          }
    }, [navigate,login , location.pathname]);
    return (
        <>
            <Components />
        </>
    );
};
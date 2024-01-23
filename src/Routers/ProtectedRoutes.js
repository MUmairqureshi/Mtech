import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
export const ProtectedRoutes = (props) => {
    const { Components } = props;
    const navigate = useNavigate();

    const loginToken = localStorage.getItem('login');

    const apiStatus = () => {
        const formDataMethod =  new FormData();
        formDataMethod.append('token', loginToken);
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/auth/check-token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                if(data?.status === false) {
                    localStorage.removeItem('login');
                    navigate('/')
                }
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }

    useEffect(() => {
        let login = localStorage.getItem('login');
        if (!login) {
            navigate('/');
           
        }

        apiStatus()

       
    })
    return (
        <>
            <Components />
        </>
    )
}

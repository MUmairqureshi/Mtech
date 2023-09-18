import { useState, useEffect } from 'react';
const LogoutData = localStorage.getItem('login');
const base_url = 'https://custom.mystagingserver.site/mtrecords/public/api/'
function useApi(endpoint) {
    const [apiData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            document.querySelector('.loaderBox').classList.remove("d-none");
            try {
                const response = await fetch(base_url + endpoint, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LogoutData}` // Include the token in the headers
                    }
                });

                if (!response.ok) {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                document.querySelector('.loaderBox').classList.add("d-none");
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err);
                document.querySelector('.loaderBox').classList.add("d-none");
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint]);

    return { apiData, loading, error };
}

export default useApi;

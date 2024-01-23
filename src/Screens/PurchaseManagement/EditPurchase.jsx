import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { useNavigate } from "react-router";

import CustomButton from "../../Components/CustomButton";
export const EditPurchase = () => {
    const { id } = useParams();
    
    const [successStatus, setSuccessStatus] = useState('Server Error!');
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [merchant, setMerchant] = useState()
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const purchaseType = [
        {
            id: 'Partial',
            name: 'Partial'
        },
        {
            id: 'Full',
            name: 'Full'
        }
    ]


    const fetchMerchantData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/merchant-listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
                setMerchant(data?.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    }

    //   https://custom3.mystagingserver.site/mtrecords/public/api/admin/purchase-add-edit/1
    const getUserData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/get-purchase/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                 
                document.querySelector('.loaderBox').classList.add("d-none");
                setViewleads(data?.data?.lead_id);
                setFormData(data?.data);

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    }


    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

         
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/purchase-add-edit/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                setShowModal(true)
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    };


    useEffect(() => {
        getUserData()
        fetchMerchantData()
    }, [])


    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //      
    // };


























    const [unitid, setUnitid] = useState();



    const userData = (uniID) => {
         
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/user-units/${uniID}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                 
                document.querySelector('.loaderBox').classList.add("d-none");
                setUnitid(data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    }



   











    const [viewleads, setViewleads] = useState('');


    const fetchData = async () => {
        
        try {
            const response = await fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/view-leads/${viewleads}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            });

            const data = await response.json();

            userData(data?.leads.unit_id);
            // Process the data as needed
             ;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        
        if (name === 'lead_id') {
            setViewleads(value);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
         ;
    };


    useEffect(() => {
        fetchData();
    }, [viewleads]);





    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Purchase
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                {/* <CustomInput
                                                    label='Lead ID'
                                                    required
                                                    id='name'
                                                    type='number'
                                                    placeholder='Enter Lead ID'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="lead_id"
                                                    value={formData.lead_id}
                                                    onChange={handleChange}
                                                /> */}


                                                <CustomInput
                                                    label='Lead ID'
                                                    required
                                                    id='name'
                                                    disabled
                                                    type='text'
                                                    placeholder='Enter Lead ID'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="lead_code"
                                                    value={formData.lead_code}
                                                // onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Name'
                                                    id='name'
                                                    type='text'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    disabled
                                                    value={formData.leaddetail?.name}
                                                // onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Email'
                                                    id='name'
                                                    type='email'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="email"
                                                    disabled
                                                    value={formData.leaddetail?.email}
                                                // onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Received Amount'
                                                    id='name'
                                                    type='number'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="received"
                                                    disabled
                                                    value={formData.leaddetail?.received}
                                                // onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Purchase Amount'
                                                    required
                                                    id='amount'
                                                    type='number'
                                                    placeholder='Enter Purchase Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="purchase_amount"
                                                    value={formData.purchase_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Purchase Date'
                                                    // required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Enter Purchase Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="purchase_date"
                                                    value={formData.purchase_date}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="user_id"
                                                    label="User ID"
                                                    required
                                                    value={formData.user_id}
                                                    option={initalRole}
                                                    onChange={handleChange}
                                                />

                                            </div> */}

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="purchase_type"
                                                    label="Purchase Type"
                                                    required
                                                    value={formData.purchase_type}
                                                    option={purchaseType}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="purchase_user_id"
                                                    label="User Id"
                                                    required
                                                    value={formData.purchase_user_id}
                                                    option={unitid}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            {/* <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="merchant_id"
                                                    label="Merchant"
                                                    required
                                                    value={formData.merchant_id}
                                                    option={merchant}
                                                    onChange={handleChange}
                                                />

                                            </div> */}
                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <label>Reason*</label>
                                                    <textarea value={formData?.reason} name="reason" className="mainInput" onChange={handleChange}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading={successStatus}  />

            </DashboardLayout>
        </>
    );
};


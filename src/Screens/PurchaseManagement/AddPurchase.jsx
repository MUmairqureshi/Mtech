import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddPurchase = () => {
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [merchant, setMerchant] = useState()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({});
    const [messgaeShow, setMessageShow] = useState();
    const [leadStatus, setLeadStatus] = useState(false);
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
                console.log(data)
                setMerchant(data?.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
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

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/purchase-add-edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                console.log("purchase_type_response", response)
                return response.json();
            })
            .then((data) => {
                console.log("data", data);
                document.querySelector('.loaderBox').classList.add("d-none");
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };
    console.log("purchase_type_formDataMethod", formData)

    useEffect(() => {
        fetchMerchantData()
    }, [])


    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     console.log(formData)
    // };




















    const handleFetch = (event) => {
        const { name, value } = event.target;
        if (name === 'lead_code') {
            setViewleads(value);
        }
    };




    const [unitid, setUnitid] = useState();



    const userData = (uniID) => {
        console.log("unitid", uniID)
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
                console.log('user', data?.data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setUnitid(data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }



    console.log("unitid", unitid)











    const [viewleads, setViewleads] = useState('');


    const fetchData = async () => {
        console.log("viewleads", viewleads)
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
            console.log("data.leads.unit_id", data)

            if (data?.status) {
                setMessageShow('Lead Verified')
                setLeadStatus(true)
            } else {
                setMessageShow('Lead not exist')
                setLeadStatus(false);
            }

            console.log("data.leads.unit_id", data?.leads)
            userData(data?.leads.unit_id);
            // Process the data as needed
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        console.log("name", name, value)
        if (name === 'lead_id') {
            setViewleads(value);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData);
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
                                Add Purchase
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
                                                <CustomInput
                                                    label='Lead Code'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Lead Code'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="lead_code"
                                                    value={formData.lead_code}
                                                    onChange={handleChange}
                                                    onBlur={handleFetch}
                                                />
                                                {
                                                    messgaeShow && (
                                                        <p className={leadStatus ? 'text-success' : 'text-danger'}>{messgaeShow}</p>
                                                    )
                                                }
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
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Purchase has been Successfully Added.' />


            </DashboardLayout>
        </>
    );
};


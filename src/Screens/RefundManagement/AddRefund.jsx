import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { useNavigate } from "react-router";

import CustomButton from "../../Components/CustomButton";
export const AddRefund = () => {
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [merchant, setMerchant]= useState()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({});
    const [successStatus, setSuccessStatus] = useState('Server Error!');

    const refundType = [
        {
            id: 'Partial',
            name: 'Partial'
        },
        {
            id: 'Full',
            name: 'Full'
        }
    ]


    const fetchMerchantData = () =>  {
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


    const fectchBrandData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/role-listing',
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
                
                setrole(data.roles);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                
            })
    }


    const fetchUnitData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/unit-listing',
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
                setUnit(data.units);
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
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/refund-add-edit`, {
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
                    data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                    setShowModal(true)
               
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                
            })
    };


    useEffect(() => {
        fectchBrandData()
        fetchUnitData()
        fetchMerchantData()
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
      };


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add Refund
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
                                                    label='Enter Lead Code'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Lead Code'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="lead_code"
                                                    value={formData?.lead_code}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Refund Amount'
                                                    required
                                                    id='amount'
                                                    type='number'
                                                    placeholder='Enter Refund Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="refund_amount"
                                                    value={formData.refund_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                      
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Refund Date'
                                                    // required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Enter Refund Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="refund_date"
                                                    value={formData.refund_date}
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
                                                    name="refund_type"
                                                    label="Refund Type"
                                                    required
                                                    value={formData.refund_type}
                                                    option={refundType}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="merchant_id"
                                                    label="Merchant"
                                                    required
                                                    value={formData.merchant_id}
                                                    option={merchant}
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
                <CustomModal show={showModal} close={() => { setShowModal(false) ; goBack() }} success heading={successStatus} />


            </DashboardLayout>
        </>
    );
};


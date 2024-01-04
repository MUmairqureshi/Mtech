import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddChargeBack = () => {
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [merchant, setMerchant]= useState()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({});

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

    const chargebackType = [
        {
            id: 'Fraudulent',
            name: 'Fraudulent'
        },
        {
            id: 'Product Unacceptable',
            name: 'Product Unacceptable'
        },
        {
            id: 'Product Not Received',
            name: 'Product Not Received'
        },
        {
            id: 'Credit Not Processed',
            name: 'Credit Not Processed'
        }
    ]


    const fetchMerchantData = () =>  {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
    
        fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/merchant-listing',
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


    const fectchBrandData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/role-listing',
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
                setrole(data.roles);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }


    const fetchUnitData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/unit-listing',
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
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setUnit(data.units);
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
        fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/chargeback-add-edit`, {
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
                console.log(data);
                document.querySelector('.loaderBox').classList.add("d-none");
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
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
        console.log(formData)
    };



    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add ChargeBack
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
                                                    name="chargeback_amount"
                                                    value={formData.chargeback_amount}
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
                                                    name="chargeback_date"
                                                    value={formData.chargeback_date}
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
                                                    name="chargeback_type"
                                                    label="Refund Type"
                                                    required
                                                    value={formData.chargeback_type}
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

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="reason"
                                                    label="Reason Type"
                                                    required
                                                    value={formData.reason}
                                                    option={chargebackType}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                <label>Reason*</label>
                                                <textarea value={formData?.description} name="description" className="mainInput" onChange={handleChange}></textarea>
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
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Refund has been Successfully Added.' />


            </DashboardLayout>
        </>
    );
};


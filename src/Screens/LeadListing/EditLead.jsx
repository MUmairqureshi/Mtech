import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const EditLead = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [user, setUser] = useState();
    const [brands, setBrands] = useState({});
    const [unit, setUnit] = useState({});



    const fectchBrandData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/brand-listing',
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
                setBrands(data.brands);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
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
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setUnit(data.units);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }


    const getUserData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/view-leads/${id}`,
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
                setFormData(data?.leads);
                userData(data?.leads?.unit_id)
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
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/leads-add-edit/${id}`, {
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
                console.log(data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };


    useEffect(() => {
        getUserData()
        fectchBrandData()
        fetchUnitData()
        
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'unit_id') {
            userData(value)
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };


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
                console.log('user', data?.data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setUser(data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }



    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Lead Detail
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Source Name'
                                required
                                id='name'
                                type='text'
                                placeholder='Enter source'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="source"
                                value={formData?.source}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Enter Product'
                                required
                                id='product'
                                type='text'
                                placeholder='Enter Product'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="product"
                                value={formData?.product}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Email'
                                required
                                id='email'
                                type='email'
                                placeholder='Enter Email'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="email"
                                value={formData?.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Name'
                                required
                                id='name'
                                type='text'
                                placeholder='Enter Name'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Phone'
                                required
                                id='phone'
                                type='number'
                                placeholder='Enter phone'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="phone"
                                value={formData?.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Quoted Amount'
                                required
                                id='amount'
                                type='number'
                                placeholder='Enter Quoted Amount'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="quoted_amount"
                                value={formData?.quoted_amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Amount Received'
                                required
                                id='received'
                                type='number'
                                placeholder='Enter Received Amount'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="received"
                                value={formData?.received}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CustomInput
                                label='Amount Recovery'
                                required
                                id='recovery'
                                type='number'
                                placeholder='Enter Recovery Amount'
                                labelClass='mainLabel'
                                inputClass='mainInput'
                                name="recovery"
                                value={formData?.recovery}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-4">
                            <SelectBox
                                selectClass="mainInput"
                                name="brand"
                                label="Brand"
                                required
                                value={formData?.brand}
                                option={brands}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="col-md-4 mb-4">
                            <SelectBox
                                selectClass="mainInput"
                                name="unit_id"
                                label="Unit"
                                required
                                value={formData?.unit_id}
                                option={unit}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="col-md-4 mb-4">
                            <SelectBox
                                selectClass="mainInput"
                                name="sales_rep"
                                label="Sales Rep"
                                required
                                value={formData.sales_rep}
                                option={user}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="col-md-4 mb-4">
                            <SelectBox
                                selectClass="mainInput"
                                name="account_rep"
                                label="Account Rep"
                                required
                                value={formData.account_rep}
                                option={user}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="inputWrapper">
                                <div className="form-controls">
                                    <label htmlFor="">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control shadow border-0"
                                        id=""
                                        cols="30"
                                        rows="10"
                                        value={formData?.description}
                                        onChange={handleChange}
                                    >

                                    </textarea>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-12">
                            <CustomButton variant='primaryButton' text='Submit' type='submit' onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Lead Update Successfully.' />

            </DashboardLayout>
        </>
    );
};


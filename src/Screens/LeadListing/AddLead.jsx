import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddLead = () => {
    const [brands, setBrands] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState();
    const [formData, setFormData] = useState({
        source: '',
        brand: '',
        product: '',
        email: '',
        name: '',
        phone: '',
        description: '',
        amount: '',
        received: '',
        recovery: '',
        sales_rep: '',
        account_rep: ''
    });

    const sourcename = [
        {
            id: '1',
            name: 'PPC'
        },
        {
            id: '2',
            name: 'Organic  '
        },
        {
            id: '3',
            name: 'SMS'
        },
        {
            id: '4',
            name: 'OB'
        },
        {
            id: '5',
            name: 'SMM'
        },
        {
            id: '6',
            name: 'Up-Sell'
        },
        {
            id: '7',
            name: 'Org-Up-Sell'
        },
        {
            id: '8',
            name: 'OB-Up-Sell'
        },
        {
            id: '9',
            name: 'SMM-Up-Sell'
        }
        ,
        {
            id: '10',
            name: 'Other'
        }

    ]

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

                document.querySelector('.loaderBox').classList.add("d-none");
                setBrands(data.brands);
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

    // const handleChange = (event) => {

    //     const { name, value } = event.target;
    //     if (name === 'unit_id') {
    //         userData(value)
    //     }
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));

    //     console.log(formData)
    // };

    const [remainingWords, setRemainingWords] = useState(100);



    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     const wordCount = value.trim().split(/\s+/).length; // Counting words

    //     if (wordCount <= 100) { // Change 100 to your desired word limit
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: value,
    //         }));
    //         setRemainingWords(100 - wordCount); // Change 100 to your desired word limit
    //     } else {
    //         // Truncate the text to the specified word limit
    //         const truncatedText = value
    //             .trim()
    //             .split(/\s+/)
    //             .slice(0, 100)
    //             .join(' ');

    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: truncatedText,
    //         }));

    //         setRemainingWords(0);  
    //     }
    // };

    // const handleChange = (event) => {
    //     const { name, value } = event.target;

    //      if (event.target.tagName === "TEXTAREA") {
    //         const wordLimit = 100;
    //         const wordCount = value.trim().split(/\s+/).length;

    //         if (wordCount <= wordLimit) {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));
    //             setRemainingWords(wordLimit - wordCount);
    //         } else {
    //             const truncatedText = value
    //                 .trim()
    //                 .split(/\s+/)
    //                 .slice(0, wordLimit)
    //                 .join(' ');

    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: truncatedText,
    //             }));

    //             setRemainingWords(0);
    //         }
    //     } else {  
    //         const characterLimit = 12;  

    //         if (name  === phone && name  === quoted_amount && name  === received ) {

    //             if (value <= characterLimit) {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));



    //     }
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));
    //         // }
    //     }
    // };





    const [remainingNumber, setRemainingNumber] = useState(12);
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (event.target.tagName === 'TEXTAREA') {
            const wordLimit = 100;
            const wordCount = value.trim().split(/\s+/).length;

            if (wordCount <= wordLimit) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setRemainingWords(wordLimit - wordCount);
            } else {
                const truncatedText = value
                    .trim()
                    .split(/\s+/)
                    .slice(0, wordLimit)
                    .join(' ');

                setFormData((prevData) => ({
                    ...prevData,
                    [name]: truncatedText,
                }));

                setRemainingWords(0);
            }
        } else if (
            name === 'phone' ||
            name === 'quoted_amount' ||
            name === 'received' ||
            name === 'recovery'
        ) {
            const characterLimit = 12;

            if (value.length <= characterLimit) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setRemainingNumber(characterLimit - value.length);
            } else {
                setRemainingNumber(0);
            }
        } else if (name === 'unit_id') {
            userData(value)
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,


            }));
        }
    };



    const LogoutData = localStorage.getItem('login');


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
                setUser(data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }
    // const handleSubmit = async (values) => {
    //     try {
    //         setSubmitting(true);
    //         // Perform form submission logic here
    //         console.log(values);
    //         // Set submitting to false after successful submission
    //         setSubmitting(false);
    //     } catch (error) {
    //         // Handle form submission error
    //         console.error(error);
    //         setSubmitting(false);
    //     }
    // };
    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/leads-add-edit`, {
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
                ;
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };


    useEffect(() => {
        fectchBrandData()
        fetchUnitData()
        // userData()
    }, [])


    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };



    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().required('name is required'),
    //     product: Yup.string()
    //         .min(2, 'product must be minimum 2')
    //         .max(10, 'product must not be more than 10 characters')
    //         .required('product is required'),
    //     email: Yup.string().email('Invalid email').required('Email is required'),
    //     phone: Yup.number().required('phone is required'),
    //     password: Yup.string()
    //         .min(6, 'Password must be at least 6 characters')
    //         .required('Password is required'),
    //     confirmPassword: Yup.string()
    //         .oneOf([Yup.ref('password')], 'Passwords must match')
    //         .required('Confirm Password is required'),
    // });
    const validationSchema = Yup.object().shape({
        phone: Yup.number()
            .min(2, 'product must be minimum 2')
            .max(10, 'must not be more than 10 characters')
            .required('Enter Product is required'),

        email: Yup.string().email('Invalid email').required('Email is required'),
        source: Yup.string().required('Source Name is required'),
        brand: Yup.string().required('Brand is required'),
        name: Yup.string().required('name is required'),
        // recovery: Yup.string().required('recovery is required'),
        product: Yup.number()
            .min(2, 'product must be minimum 2')
            .max(10, 'must not be more than 10 characters')
            .required('Enter Product is required'),
        description: Yup.string()
            .min(2, ' must be minimum 10')
            .max(10, 'description must not be more than 100 characters'),

        quoted_amount: Yup.number()
            .min(2, ' must be minimum 2')
            .max(10, 'must not be more than 10 characters')
            .required('Quoted Amount is required'),
        received: Yup.number().min(2, ' must be minimum 2')
            .max(10, 'must not be more than 10 characters')
            .required('received Amount is required'),
    });
    const formik = useFormik({
        initialValues: {
            source: '',
            brand: '',
            product: '',
            email: '',
            name: '',
            phone: '',
            quoted_amount: '',
            received: '',
            recovery: '',
            sales_rep: '',
            account_rep: '',
            description: '',
        },
        validationSchema,
        onSubmit: handleSubmit
    });
    console.log("formik", formik)
    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add Lead Form
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">


                                                <SelectBox
                                                    type='text'
                                                    selectClass="mainInput"
                                                    name="source"
                                                    label="Source Name"
                                                    value={formik?.values.source}
                                                    option={sourcename}
                                                    onChange={formik?.handleChange}
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
                                                    value={formik?.values.product}
                                                    onChange={formik?.handleChange}
                                                    onBlur={formik?.handleBlur}
                                                />
                                                {formik.errors.product && formik.touched.product && (
                                                    <div className="error">{formik.errors.product}</div>
                                                )}
                                                {console.log("formik.errors.product", formik.errors.product)}
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
                                                    value={formik?.values.email}
                                                    onChange={formik?.handleChange}
                                                />
                                                {formik.errors.email && formik.touched.email && (
                                                    <div className="error">{formik?.errors.email}</div>
                                                )}
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
                                                    value={formik?.values.name}
                                                    onChange={formik?.handleChange}
                                                />
                                                {formik.errors.name}


                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Phone"
                                                    required
                                                    id="phone"
                                                    type="number"
                                                    placeholder="Enter phone"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="phone"
                                                    value={formik?.values.phone}
                                                    onChange={formik?.handleChange}
                                                />
                                                {formik.errors.phone}

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Quoted Amount"
                                                    required
                                                    id="amount"
                                                    type="number"
                                                    placeholder="Enter Quoted Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="quoted_amount"
                                                    value={formik?.values.quoted_amount}
                                                    onChange={formik?.handleChange}
                                                />
                                                {formik.errors.quoted_amount}
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Amount Received"
                                                    id="received"
                                                    required={!formData.recovery}
                                                    type="number"
                                                    placeholder="Enter Received Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="received"
                                                    value={formik?.values.received}
                                                    onChange={formik?.handleChange}
                                                />
                                                {formik.errors.received}
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Amount Recovery"
                                                    id="recovery"
                                                    required={!formData.received}
                                                    type="number"
                                                    placeholder="Enter Recovery Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="recovery"
                                                    value={formik?.values.recovery}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>



                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="brand"
                                                    label="Brand"
                                                    required
                                                    value={formik?.values.brand}
                                                    option={brands}
                                                    onChange={formik?.handleChange}
                                                />

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="unit_id"
                                                    label="Unit"
                                                    required
                                                    value={formik?.values.unit_id}
                                                    option={unit}
                                                    onChange={formik.handleChange}
                                                />

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="sales_rep"
                                                    label="Sales Rep"
                                                    required
                                                    value={formik?.values.sales_rep}
                                                    option={user}
                                                    onChange={formik?.handleChange}
                                                />

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="account_rep"
                                                    label="Account Rep"
                                                    value={formik?.values.account_rep}
                                                    option={user}
                                                    onChange={formik.handleChange}
                                                />

                                            </div>








                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    {/* <div className="form-controls">
                                                        <label htmlFor="">Description</label>
                                                        <textarea
                                                            name="description"
                                                            className="form-control shadow border-0"
                                                            id=""
                                                            cols="30"
                                                            rows="10"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        >

                                                        </textarea>
                                                    </div> */}


                                                    <div className="form-controls">
                                                        <label htmlFor="description">Description</label>
                                                        <textarea
                                                            name="description"
                                                            className="form-control shadow border-0"
                                                            id="description"
                                                            cols="30"
                                                            rows="10"
                                                            value={formik?.values.description}
                                                            onChange={formik?.handleChange}
                                                        />
                                                        {formik.errors.description}
                                                    </div>

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

                <CustomModal
                    show={showModal}
                    close={() => {
                        setShowModal(false);
                        goBack();
                    }}
                    success
                    heading='Lead added Successfully.'
                />
            </DashboardLayout>
        </>
    );
};


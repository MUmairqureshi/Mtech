import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";

export const ChargeBackDetail = () => {

    const { id } = useParams();



    const [user, SetUser] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    useEffect(() => {
        const LogoutData = localStorage.getItem('login');
        document.title = 'Mt Records | Refund Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/get-chargeback/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                 
                document.querySelector('.loaderBox').classList.add("d-none");
                SetUser(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
             
            })
    }, [id]);


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                ChargeBack Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                           

                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">User Name</p>
                                    <p>{user?.chargebackuser?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Email Address</p>
                                    <p>{user?.chargebackuser?.email}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Charge Back Date</p>
                                    <p>{user?.chargeback_date}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Charge Back Type</p>
                                    <p>{user?.chargeback_type}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Charge Back Amount</p>
                                    <p>{`$ ${user?.chargeback_amount}`}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Merchant</p>
                                    <p>{user?.merchantdetail?.name}</p>
                                </div>

                                <div className="col-md-12 mb-4">
                                    <p className="secondaryText">Reason</p>
                                    <p>{user?.reason}</p>
                                </div>
                               
                               
                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};


import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faRemove, faTimes, faFilter, faEye } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import CustomTable from "../../Components/CustomTable";

export const TargetDetails = () => {

    const { id } = useParams();



    const [lead, setLead] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [leadData, setLeadData] = useState(false)

    const month = [
        "",
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octuber",
        "November",
        "December"
    ]



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
        document.title = 'Mt Records | Lead Management Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/get-unit-targets_details/${id}`,
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
                console.log(data)

                setLeadData(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }, [id]);

    const maleHeaders = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "username",
            title: "Unit Name",
        },
        {
            key: "target",
            title: "Target",
        },
        {
            key: "targetscore",
            title: "Target Score",
        },
        {
            key: "month",
            title: "Month"
        },
        {
            key: "year",
            title: "Year"
        },
        {
            key: "status",
            title: "Status",
        },
        // {
        //     key: "action",
        //     title: "Action",
        // },

    ];


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Current Target Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">

                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit Name:</p>
                                    <p>{leadData?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Set Target</p>
                                    <p>{`$ ${leadData?.current_month_target?.target}`}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Score Target</p>
                                    <p>{`$ ${leadData?.current_month_target?.target_score}`}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Month</p>
                                    <p>{month[leadData?.current_month_target?.month]}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Year</p>
                                    <p>{leadData?.current_month_target?.year}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Total Amount</p>
                                    <p>{`$ ${leadData?.total_sales}`}</p>

                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <h2 className="mainTitle">
                                        Target History
                                    </h2>
                                </div>
                                <div className="col-12">
                                    <CustomTable
                                        headers={maleHeaders}

                                    >
                                        <tbody>
                                            {leadData?.month_target?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="text-capitalize">
                                                        {leadData?.name}
                                                    </td>
                                                    {/* <td>{item?.current_month_target?.target ? `$ ${item?.current_month_target?.target}` : '$0'}</td> */}
                                                    <td>{item?.target ? `$ ${item?.target}` : '$0'}</td>
                                                    <td>{`$ ${item?.target_score}`}</td>
                                                    <td>{month[item?.month]}</td>
                                                    <td>{item?.year}</td>
                                                    <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td>
                                                    {/* <td>
                                                        <Dropdown className="tableDropdown">
                                                            <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                <FontAwesomeIcon icon={faEllipsisV} />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                <Link className="tableAction" to={`/target-listing/target-detail/${item?.id}`}><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View Details</Link>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </CustomTable>

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


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faPencil, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";

export const ChargeBackManagement = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false)
  const [copiedId, setCopiedId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate('/add-chargeback')
  }


  const coppied = (id, lead_code) => {
    navigator.clipboard.writeText(`${lead_code}`);
    setCopied(true);
    setCopiedId(id);
    setTimeout(() => {
      setCopied(false);
      setCopiedId(null);
    }, 1000);
  };



  
  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  const filterData = data.filter(item =>
    item?.leaddetail?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const chargeback = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/chargeback-listing',
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
        setData(data?.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })

  }
  useEffect(() => {
    document.title = 'Mt Records | Charge Back Management';
    chargeback()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "leadid",
      title: "Lead Code",
    },
    {
      key: "refundAmount",
      title: "Charge Back Amount",
    },
    {
      key: "Charge BackDate",
      title: "Charge Back Date",
    },
    {
      key: "Charge BackUser",
      title: "Charge Back User",
    },
    {
      key: "Charge BackType",
      title: "Charge Back Type",
    },
        
    {
      key: "merchant",
      title: "Merchant",
    },
    {
      key: "action",
      title: "Action",
    },
  ];
  console.log("currentItems", currentItems)



  const removeItem = (catId) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/chargeback-delete/${catId}`,
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
        chargeback()
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }



  const [isCopied, setIsCopied] = useState(false);
  
 


  const copyToClipboard = async () => {

    try {
      await navigator.clipboard.writeText(currentItems);
      setIsCopied(true);
    } catch (err) {
      console.error('Unable to copy to clipboard.', err);
    }
  };
  return (
    <>
      <DashboardLayout>
      {/* <button onClick={copyToClipboard}>Copy to Clipboard</button> */}

 
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Charge Back Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton text="Add New Charge Back" variant='primaryButton' onClick={hanldeRoute} />
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders} >
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.lead_code}
                              <button
                                onClick={() => coppied(item.id, item?.lead_code)}
                                className="bg-transparent border-0 text-secondary"   >
                                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                              </button>
                              {copied && copiedId === item.id && (
                                <span className="text-success px-3 py-1 rounded-pill">Copied</span>
                              )}
                            </td>
                            {/* <td>{item?.username}</td> */}
                            <td>{`$ ${item?.chargeback_amount}`}</td>
                            <td>{item?.chargeback_date}</td>
                            <td>{item?.leaddetail?.email}</td>
                            <td>{item?.chargeback_type}</td>
                            <td>{item?.merchantdetail?.name}</td>
 
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/chargeback-detail/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/edit-chargeback/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</Link>
                                  <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1" onClick={() => { removeItem(item?.id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
                                </Dropdown.Menu>
                                  </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />
          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
        </div>
 
      </DashboardLayout>
    </>
  );
};

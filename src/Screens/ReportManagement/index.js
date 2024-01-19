import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faCheck, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";

export const ReportManagement = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserFrom] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [formData, setFormData] = useState({});
  const [brands, setBrands] = useState({});
  const [unit, setUnit] = useState({});

  // const optionData = [
  //   {
  //     name: "Active",
  //     code: "1"
  //   },
  //   {
  //     name: "Inactive",
  //     code: "0"
  //   },
  // ]

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const monthList = [
    {
      code: 1,
      name: 'January'
    },
    {
      code: 2,
      name: 'Feburay'
    }, {
      code: 3,
      name: 'March'
    },
    {
      code: 4,
      name: 'April'
    },
    {
      code: 5,
      name: 'May'
    },
    {
      code: 6,
      name: 'June'
    },
    {
      code: 7,
      name: 'July'
    },
    {
      code: 8,
      name: 'August'
    },
    {
      code: 9,
      name: 'September'
    },
    {
      code: 10,
      name: 'Octuber'
    },
    {
      code: 11,
      name: 'November'
    },
    {
      code: 12,
      name: 'December'
    }
  ]


  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

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




  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/unit-sheets-generate`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: formDataMethod

      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
         
        setData(data?.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        
      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Report Management';
    fectchBrandData()
    fetchUnitData()

  }, []);

  const maleHeaders = [
    {
      key: "unit",
      title: "UNIT",
    },
    {
      key: "agent",
      title: "AGENT",
    },
    {
      key: "target",
      title: "TARGET",
    },
    {
      key: "gross",
      title: "GROSS",
    },
    {
      key: "refunt",
      title: "REFUNDS & CB",
    },
    {
      key: "reversals",
      title: "REVERSALs",
    },
    {
      key: "purchase",
      title: "PURCHASE",
    },
    {
      key: "net",
      title: "Net",
    },
    {
      key: "acheived",
      title: "ACHEIVED",
    },
    {
      key: "should_be_at",
      title: "SHOULD BE AT",
    },




  ];







  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3 align-items-end">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-end">
                  <div className="col-md-12 mb-2">
                    <h2 className="mainTitle">Unit Sheets Reports</h2>
                  </div>
                  <div className="col-md-8 mb-2">
                    <div className="addUser align-items-center">
                      <SelectBox
                        selectClass="mainInput"
                        name="unit_id"
                        label="Select Unit"
                        value={formData.unit_id}
                        required
                        option={unit}
                        onChange={(event) => {
                          setFormData({ ...formData, unit_id: event.target.value });
                           
                        }}
                      />

                      <SelectBox
                        selectClass="mainInput"
                        name="month"
                        label="Status"
                        value={formData.month}
                        required
                        option={monthList}
                        onChange={(event) => {
                          setFormData({ ...formData, month: event.target.value });
                           
                        }}
                      />

                      {/* <CustomInput type="text" placeholder="Enter Year" name="year" value={formData.year}
                        label="Year"
                        inputClass="mainInput" onChange={(event) => {
                          setFormData({ ...formData, year: event.target.value });
                           
                        }} /> */}
                      <CustomButton variant='primaryButton' text='Search' type='button' onClick={fetchData} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {data.map((item, index) => (
                          <tr>
                            <td className="text-capitalize">
                              {item.unit_name}
                            </td>

                            <td>{item?.user_name}</td>
                            <td>{`$ ${item?.target}`}</td>
                            <td>{`$ ${item?.gross_sum}`}</td>
                            <td>{`$ ${item?.refunds}`}</td>
                            <td>{`$ ${item?.reversal}`}</td>
                            <td>{`$ ${item?.purchase}`}</td>
                            <td>{`$ ${item?.net}`}</td>
                            <td>{item?.achived}</td>
                            <td>{item?.should_be_at}</td>
                          </tr>
                        ))}
                      </tbody>

                      {/* <tbody>
                        <tr>
                          <td className="text-capitalize">
                            {data.unit_name}
                          </td>

                          <td>{data?.user_name}</td>
                          <td>{data?.gross_sum}</td>
                          <td>{data?.target}</td>
                          <td>{data?.refunds}</td>
                          <td>{data?.chargeback}</td>
                          <td>{data?.purchase}</td>
                          <td>{data?.net}</td>
                        </tr>
                      </tbody> */}
                    </CustomTable>
                    {/* <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </>
  );
};

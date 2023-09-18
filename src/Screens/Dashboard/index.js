import { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import StatCard from "../../Components/StatsCard/index.js";
import { stats } from "../../Config/Data";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";

import "./style.css";

export const Dashboard = () => {
  const [statistics, setStatistics] = useState([]);
  const LogoutData = localStorage.getItem('login');
  const fetchLeadData = () => {
    fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/leads-amount',
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
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {

    document.title = 'Mt Records | Dashboard';
    fetchLeadData()
    setStatistics(stats)
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  {statistics.map((stats) => (
                    <div className="col-xl-4 col-md-6 stats" key={stats.id}>
                      <StatCard item={stats} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Total Sales</h3>
                  <SelectBox selectClass="mainInput" name="Monthly" required option={'optionData'}

                  />
                </div>
                <div className="graph-wrapper">
                  <CChart
                    type="line"
                    height="90"
                    options={{
                      scales: {
                        y: {
                          suggestedMin: 0,
                          suggestedMax: 40,
                        },
                      },
                    }}
                    data={{
                      labels: ["Nov 2010"],
                      tension: "0.5",
                      datasets: [
                        {
                          label: "Total Amount",

                          backgroundColor: "rgb(0 41 59 / 81%)",
                          borderColor: "#00293B",
                          pointBackgroundColor: "#00293B",
                          pointBorderColor: "#00293B",
                          borderWidth: 1,
                          data: [35],
                          tension: 0.5,
                        },
                        {
                          label: "Amount Pending",
                          backgroundColor: "rgb(1 22 215 / 81%)",
                          borderColor: "#0116d7",
                          pointBackgroundColor: "#0116d7",
                          borderWidth: 1,
                          pointBorderColor: "#0116d7",
                          data: [20],
                          tension: 0.5,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

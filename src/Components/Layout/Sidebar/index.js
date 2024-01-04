import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faTasks,
  faMountainCity,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/role-management') ? 'active' : ''}`} to="/role-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <span className="sideLinkText">Roles Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/lead-listing') ? 'active' : ''}`} to="/lead-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Lead Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/refund-management') ? 'active' : ''}`} to="/refund-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Refund Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/chargeback-management') ? 'active' : ''}`} to="/chargeback-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Charge Back Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/brand-listing') ? 'active' : ''}`} to="/brand-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faTasks} />
            </span>
            <span className="sideLinkText">Brand Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/unit-listing') ? 'active' : ''}`} to="/unit-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMountainCity} />
            </span>
            <span className="sideLinkText">Unit Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="sideLinkText">User Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/merchant-management') ? 'active' : ''}`} to="/merchant-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMountainCity} />
            </span>
            <span className="sideLinkText">Merchant Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Sales</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

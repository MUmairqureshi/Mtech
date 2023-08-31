import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faTasks
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
          <Link className={`sideLink ${location.pathname.includes('/brand-listing') ? 'active' : ''}`} to="/brand-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Brand Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/unit-listing') ? 'active' : ''}`} to="/unit-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Unit Management</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

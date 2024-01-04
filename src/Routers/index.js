import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";

import { LeadListing } from "../Screens/LeadListing";
// import DepartDetails from "../Screens/LeadListing/DepartDetails";
import { UnitListing } from "../Screens/UnitListing";
import { AddLead } from "../Screens/LeadListing/AddLead";
import { DetailListing } from "../Screens/LeadListing/DetailListig";

import { UserManagement } from "../Screens/UserManagement";
import { UserDetail } from "../Screens/UserManagement/UserDetail";
import { AddUser } from "../Screens/UserManagement/AddUser";
import { EditUser } from "../Screens/UserManagement/EditUser";

import { RefundManagement } from "../Screens/RefundManagement";
import { AddRefund } from "../Screens/RefundManagement/AddRefund";
import { EditRefund } from "../Screens/RefundManagement/EditRefund";
import { RefundDetail } from "../Screens/RefundManagement/RefundDetail";

import { ChargeBackManagement } from "../Screens/ChargeBackManagement";
import { AddChargeBack } from "../Screens/ChargeBackManagement/AddChargeBack";
import { EditChargeBack } from "../Screens/ChargeBackManagement/EditChargeBack";
import { ChargeBackDetail } from "../Screens/ChargeBackManagement/ChargeBackDetail";

import { BrandListing } from "../Screens/BrandListing";
import { Roles } from "../Screens/Roles";

import { UnitTarget } from "../Screens/UnitTarget";
import { TargetDetails } from "../Screens/UnitTarget/targetDetails";

import { MerchantManagement } from "../Screens/MerchantManagement";

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";


export default function AdminRouter() {
  return (
    <BrowserRouter basename="/customProject">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        <Route path="/dashboard" element={ <ProtectedRoutes Components={Dashboard}  />} />

        <Route path="/role-management" element={<ProtectedRoutes Components={Roles} />} />

        <Route path="/lead-listing" element={<ProtectedRoutes Components={LeadListing} />} />
         <Route path="/lead-detail/:id" element={<ProtectedRoutes Components={DetailListing} />} />
        <Route path="/add-lead/" element={<ProtectedRoutes Components={AddLead} />} />


        <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} />
        <Route path="/user-detail/:id" element={<ProtectedRoutes Components={UserDetail} />} />
        <Route path="/add-user/" element={<ProtectedRoutes Components={AddUser} />} />
        <Route path="/edit-user/:id" element={<ProtectedRoutes Components={EditUser} />} />

        <Route path="/unit-listing" element={<ProtectedRoutes Components={UnitListing} />} />
        <Route path="/brand-listing" element={<ProtectedRoutes Components={BrandListing} />} />
        {/* <Route path="/department-management/depart-details/:id" element={<ProtectedRoutes Components={DepartDetails} />} /> */}

        <Route path="/target-listing" element={<ProtectedRoutes Components={UnitTarget} />} />
        <Route path="/target-listing/target-detail/:id" element={<ProtectedRoutes Components={TargetDetails} />} />
        
        <Route path="/merchant-management" element={<ProtectedRoutes Components={MerchantManagement} />} />

        <Route path="/refund-management" element={<ProtectedRoutes Components={RefundManagement} />} />
        <Route path="/refund-detail/:id" element={<ProtectedRoutes Components={RefundDetail} />} />
        <Route path="/add-refund/" element={<ProtectedRoutes Components={AddRefund} />} />
        <Route path="/edit-refund/:id" element={<ProtectedRoutes Components={EditRefund} />} />

        <Route path="/chargeback-management" element={<ProtectedRoutes Components={ChargeBackManagement} />} />
        <Route path="/chargeback-detail/:id" element={<ProtectedRoutes Components={ChargeBackDetail} />} />
        <Route path="/add-chargeback/" element={<ProtectedRoutes Components={AddChargeBack} />} />
        <Route path="/edit-chargeback/:id" element={<ProtectedRoutes Components={EditChargeBack} />} />

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

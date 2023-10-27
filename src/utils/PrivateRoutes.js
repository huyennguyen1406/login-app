import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from "./common";

const PrivateRoutes = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes;
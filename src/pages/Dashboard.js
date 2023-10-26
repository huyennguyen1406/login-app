import React from "react";
import { useNavigate } from 'react-router-dom';
import { getUser, removeUserSession } from '../utils/common';

const Dashboard = props => {
    const history = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        history('/login');
    }

    return (
        <div>
            Welcome {user.name}!<br/> <br/>
            <input type="button" onClick={handleLogout} value="Logout"/>
        </div>
    );
}

export default Dashboard;
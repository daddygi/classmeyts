import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/Sidebar';
import Head from 'next/head';
interface UserDashboardProps {
}
const UserDashboard: React.FC<UserDashboardProps> = () => {

    return (
        <><Header title="Dashboard" /><Sidebar /></>
    );
};

export default UserDashboard;
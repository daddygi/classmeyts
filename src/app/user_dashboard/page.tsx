import React from 'react';
import Header from '../components/header';
interface UserDashboardProps {
}
const UserDashboard: React.FC<UserDashboardProps> = () => {

    return (
        <div>
            <Header title="Dashboard" />
            <div>
                <p>This is the user dashboard page content.</p>
            </div>
        </div>
    );
};

export default UserDashboard;
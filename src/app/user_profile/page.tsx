import React from 'react';
import Header from '../components/header';

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = ({}) => {
  return (
    <div>
      <Header title="User Profile" /> 
      <div>
        <p>This is the user profile page content.</p>
      </div>
    </div>
  );
};

export default UserProfile;

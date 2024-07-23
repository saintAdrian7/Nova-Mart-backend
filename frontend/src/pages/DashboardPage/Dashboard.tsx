import React from 'react';
import { CssBaseline } from '@mui/material';
import DashboardLayout from '../../Components/AdminDashboard/DashBoardLayout';
import DashboardContent from '../../Components/AdminDashboard/DashBoardContent';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import UserDashboard from '../../Components/UserDashBoard/UserDashBoard';


const DashBoard: React.FC = () => {
const {state} = useAuth()
const user = state.loggedInUser
  return (
    <>
    <CssBaseline />
    {user?.role === 'ADMIN' ? (
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    ) : (
      <UserDashboard />
    )}
  </>
    
  );
}

export default DashBoard;

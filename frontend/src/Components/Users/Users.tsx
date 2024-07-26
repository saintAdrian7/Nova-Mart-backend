import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { User } from "../../Models/Models";
import UserDetailsPage from "./UserDetails";
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, IconButton, styled } from '@mui/material';

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '0.5rem',
  marginBottom: '2rem',
  width: '100%',
  maxWidth: '500px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));


const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>()
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token')

  const handleUserClick = async (id:string) => {
    const response = await axios.get(`https://nova-mart-server.onrender.com/api/users/${id}`)
    setSelectedUser(response.data.user)
   
    
  }

  

  const fetchAllUsers = async () => {
    const response = await axios.get("https://nova-mart-server.onrender.com/api/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setUsers(response.data.users);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleEdit = async (id: string, role: string) => {
    try {
      await axios.patch(`https://nova-mart-server.onrender.com/api/users/${id}`, { role },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchAllUsers()
      
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://nova-mart-server.onrender.com/api/users/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };




  return (
    <>
    <SearchBar sx={{ml:'auto', mr:'auto', mt:'10px'}}>
        <InputBase
          placeholder="Search Users Here"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1, ml: 1 }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </SearchBar>
    <div className="users">
      <div className="users-cards">
        {users.map(user => (
          <UserCard
            key={user._id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUserClick = {handleUserClick}
          />
        ))}
      </div>
      <div className="user-details">
        {!selectedUser && <p>Click On user details to see User Details</p>}
        {selectedUser && <UserDetailsPage selectedUser={selectedUser} />}
        

      </div>

    </div>
    </>
  );
};

export default UserManagement;

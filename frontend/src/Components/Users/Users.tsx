import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { User } from "../../Models/Models";



const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  

  const fetchAllUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    setUsers(response.data.users);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleEdit = async (id: string, role: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${id}`, { role });
      fetchAllUsers()
      
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };



  return (
    <div>
      <div>
        {users.map(user => (
          <UserCard
            key={user._id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  );
};

export default UserManagement;

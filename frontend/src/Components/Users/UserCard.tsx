import React from "react";
import { Card, CardContent, Typography, Avatar, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { User } from "../../Models/Models";


const UserCard: React.FC<{ user: User; onUserClick: (id:string) => void, onEdit: (id: string, role: string) => void; onDelete: (id: string) => void;  }> = ({ user, onEdit, onUserClick, onDelete }) => {
  const handleEdit = () => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    onEdit(user._id, newRole);
  };


  return (
    <Card 
      sx={{
        maxWidth: 345,
        margin: "16px",
        borderRadius: "8px",
        boxShadow: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Avatar
        alt={`${user.firstName} ${user.lastName}`}
        src={user.image || ""} 
        sx={{ width: 80, height: 80, margin: "16px" }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Role: {user.role}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: 2,
          }}
        >
          <Tooltip title="View Details">
            <IconButton onClick={()=>onUserClick(user._id)} color="primary" >
              <InfoIcon  />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="warning" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(user._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;

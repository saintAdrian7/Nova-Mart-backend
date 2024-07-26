import React, { useState, useEffect } from 'react';
import { 
  Table, TableHead, TableRow, TableCell, TableBody, 
  TextField, Select, MenuItem, Button, Card, CardContent, Typography, CircularProgress, Box, SelectChangeEvent
} from '@mui/material';
import axios from 'axios';
import { Order } from '../../Models/Models';


const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('https://nova-mart-server.onrender.com/api/orders',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ); 
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const token = localStorage.getItem('token');

    await axios.patch(
      `https://nova-mart-server.onrender.com/api/orders/${orderId}`, 
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setOrders(orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));

  };

  const filteredOrders = Array.isArray(orders) ? orders.filter(order => 
    order.user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? order.status === filterStatus : true)
  ) : [];

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Manage Orders
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="Search by User"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Select
            value={filterStatus}
            onChange={handleFilterChange}
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">
              <em>All Statuses</em>
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{[order.user.firstName,' ', order.user.lastName]}</TableCell>
                  <TableCell>
                    {order.products.map(({ product, quantity }) => (
                      <div key={product._id}>
                        {product.Name} - {quantity} pcs
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value as Order['status'])}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrders;

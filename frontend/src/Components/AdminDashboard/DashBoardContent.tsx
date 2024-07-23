import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Chart from './Chart';
import Orders from './Orders';

const DashboardContent: React.FC = () => {
  return (
    <Grid container spacing={3}>
 
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
  
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Orders
          </Typography>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes'

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI!).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

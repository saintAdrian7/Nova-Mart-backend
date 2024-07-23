import React from 'react';
import Footer from '../../Components/Footer/Footer';
import CreateProduct from '../../Features/Products/ProductForm';


const HomePage: React.FC = () => {
  return (
    <>
    <div>
     <CreateProduct />
    </div>
    <Footer />
    </>
  );
}

export default HomePage;

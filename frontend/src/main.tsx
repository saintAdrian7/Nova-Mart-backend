import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthProvider } from './context/AuthContext/AuthContextProvider.tsx'
import { ProductProvider } from './context/ProductContext/ProductContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ProductProvider>
    
   
  </React.StrictMode>,
)

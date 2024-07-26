import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import './LayoutPage.css'
import { useAuth } from "../../context/AuthContext/AuthContextConsts";
import { useState } from "react";
import LoginRegisterModal from "../../Components/LoginRegistermodel/LoginRegisterModel";
import Footer from "../../Components/Footer/Footer";
export default function LayoutPage(){
const  {state} = useAuth()
const [isModalOpen, setIsModalOpen] = useState(false);

const toogleModal = () => {
   setIsModalOpen(!isModalOpen);
}
const closeModal = () => {
   setIsModalOpen(false);
 };

return (
   <div className="layoutpage">
    <Navbar tooglemodal={toogleModal} />
    {state.displayLogin &&   <LoginRegisterModal open={isModalOpen} onClose={closeModal} />}
 
      <Outlet />
      <Footer />
   </div>
)

}
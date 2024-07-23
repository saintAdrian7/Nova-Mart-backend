import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Button, Box } from "@mui/material";
import LoginForm from "../../Features/Authentication/LoginForm/LoginForm";
import RegistrationForm from "../../Features/Authentication/RegistrationForm/RegistrationForm";


const LoginRegisterModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {isLogin ? "Login" : "Register"}
        <Button
          onClick={() => setIsLogin(!isLogin)}
          variant="text"
          color="primary"
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {isLogin ? <LoginForm /> : <RegistrationForm/>}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRegisterModal;

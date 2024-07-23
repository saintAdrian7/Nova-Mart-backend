import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext/AuthContextConsts";
import { LoginUser } from "../../../context/AuthContext/AuthContextActions";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from "@mui/material";

const LoginForm: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await LoginUser(dispatch, {
        email,
        password,
      });
      setEmail('')
      setPassword('')
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {state.loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <form noValidate autoComplete="off" style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {state.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Something went wrong. Check password or email.
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default LoginForm;

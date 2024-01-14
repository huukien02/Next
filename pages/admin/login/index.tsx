import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import Link from "next/link";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import NavbarAdmin from "@/component/admin/NavbarAdmin";

const LoginAdmin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/admin-login",
        {
          username,
          password,
        }
      );

      if (response.data.status === 200) {
        alert("Đăng nhập thành công");
        localStorage.setItem("userLogin", JSON.stringify(response.data.user));
        router.push("/admin/home");
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Container sx={{ marginTop: 10 }} component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Đăng Nhập Admin
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Đăng Nhập
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginAdmin;

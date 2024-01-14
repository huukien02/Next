import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/create", {
        username: username,
        password: password,
      });

      if (response.data.status == 200) {
        alert("Đăng kí thành công");
        setPassword("");
        setUsername("");
      } else {
        alert("Đăng kí thất bại");
      }
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <>
      <NavBar />
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
            Đăng Kí
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
            onClick={handleSignup}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Đăng Kí
          </Button>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default Signup;

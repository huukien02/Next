// components/Forbidden.js
import React from "react";
import { Container, Typography, Button } from "@mui/material";

const Forbidden = () => {
  return (
    <Container>
      <Typography variant="h1">403 Forbidden</Typography>
      <Typography variant="body1">
        You don't have permission to access this resource.
      </Typography>
    </Container>
  );
};

export default Forbidden;

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        p: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              "& > *": {
                marginX: 2,
              },
            }}
          >
            <Box>
              <FacebookIcon style={{ fontSize: 30 }} />
            </Box>
            <Box>
              <GoogleIcon style={{ fontSize: 30 }} />
            </Box>
            <Box>
              <YouTubeIcon style={{ fontSize: 30 }} />
            </Box>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography>
              <HomeIcon /> Hoàng Mai, Hà Nội
            </Typography>

            <Typography>
              <LocalPhoneIcon /> 0914.128.394
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography>© 2024 STEM CLUB. Tất cả các quyền được bảo lưu.</Typography>
            <Typography>© Khoa công nghệ thông tin</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

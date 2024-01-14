// components/ImageSlider.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const images = [
  "https://2.bp.blogspot.com/-yvXzw4d-a0Q/VMFPE2-Ae_I/AAAAAAAAVa8/OMqBmolf_To/s1600/Hinh-nen-powerpoint-cong-nghe-thong-tin%2B(11).jpg",
  "https://topdev.vn/blog/wp-content/uploads/2020/08/computer-science-la-gi-muc-luong-co-cao-khong-1.jpg",
  "https://png.pngtree.com/background/20230527/original/pngtree-laptop-with-multiple-mobile-devices-and-laptop-on-display-picture-image_2770797.jpg",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // useEffect(() => {
  //   const intervalId = setInterval(nextSlide, 2000);
  //   return () => clearInterval(intervalId);
  // }, [currentIndex]);

  return (
    <Container sx={{ paddingTop: 3 }}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ width: "100%", height: "350px" }}
        />
      </Paper>
    </Container>
  );
};

export default ImageSlider;

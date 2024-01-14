// components/ImageSlider.js
import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";

const images = [
  "http://clbtinhoc.cuongpham.vn/img/banner.png",
  "https://topdev.vn/blog/wp-content/uploads/2020/08/computer-science-la-gi-muc-luong-co-cao-khong-1.jpg",
  "https://png.pngtree.com/background/20230527/original/pngtree-laptop-with-multiple-mobile-devices-and-laptop-on-display-picture-image_2770797.jpg",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

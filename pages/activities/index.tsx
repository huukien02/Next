import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import axios from "axios";

const Activities = () => {
  const [activities, setActivities] = useState<any>([]);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/activities");
        setActivities(response.data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleDetailActive = (content: any) => {
    alert(content);
  };

  const handleJoin = () => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      alert("Đã tham gia hoạt động");
    } else {
      alert("Bạn phải đang nhập");
    }
  };

  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} `;
  };

  return (
    <>
      <NavBar />
      <Box sx={{ paddingBottom: 8, paddingTop: 5 }}>
        <Container>
          {activities.map((activity: any, index: any) => (
            <Paper
              key={index}
              elevation={3}
              style={{ padding: "10px", marginBottom: "16px" }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {activity.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Phí tham gia: {activity.fee}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Số lượng người tham gia: {activity.participants}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Ngày bắt đầu: {formatDateString(activity.startDate)}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Ngày kết thúc: {formatDateString(activity.dueDate)}
                </Typography>
                <Button
                  sx={{ marginTop: 4 }}
                  onClick={() => handleDetailActive(activity.content)}
                  variant="contained"
                  color="info"
                >
                  Detail
                </Button>
                <Button
                  sx={{ marginTop: 4, marginLeft: 3 }}
                  onClick={() => handleJoin()}
                  variant="contained"
                  color="info"
                >
                  Tham Gia
                </Button>
              </CardContent>
            </Paper>
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Activities;

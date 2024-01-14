import Footer from "@/component/Footer";
import ImageSlider from "@/component/ImageSlider";
import NavBar from "@/component/NavBar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function HomePages() {
  const [newsList, setNewsList] = useState<any>();
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

  useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/news");
        setNewsList(response.data.list_news);
      } catch (error: any) {
        console.error("Error fetching news list", error.message);
      }
    };
    fetchNewsList();
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
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes} - ${day}/${month}/${year} `;
  };

  return (
    <>
      <NavBar />
      <Typography
        sx={{ paddingTop: 5, textAlign: "center", fontFamily: "monospace" }}
        variant="h4"
        color="initial"
      >
        Câu Lạc Bộ Tin Học
      </Typography>
      <ImageSlider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            sx={{ paddingTop: 5, textAlign: "center", fontFamily: "monospace" }}
            variant="h5"
            color="initial"
          >
            Danh sách tin tức
          </Typography>
          <Container sx={{ marginTop: 5, marginBottom: 15 }}>
            {newsList?.map((news: any, index: any) => (
              <Paper
                key={index}
                elevation={3}
                style={{ marginBottom: "16px", padding: "16px" }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {news.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Date:{formatDateString(news.created_at)}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {news.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            ))}
          </Container>
        </Grid>

        <Grid item xs={6}>
          <Typography
            sx={{ paddingTop: 5, textAlign: "center", fontFamily: "monospace" }}
            variant="h5"
            color="initial"
          >
            Danh sách hoạt động
          </Typography>
          <Container sx={{ marginTop: 5, marginBottom: 15 }}>
            {activities.map((activity: any, index: any) => (
              <Paper
                key={index}
                elevation={3}
                style={{ padding: "10px", marginBottom: "16px" }}
              >
                <Card>
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
                </Card>
              </Paper>
            ))}
          </Container>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default HomePages;

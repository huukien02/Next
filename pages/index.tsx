import BackgroundSwitch from "@/component/BackgroundSwitch";
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
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function HomePages() {
  const [newsList, setNewsList] = useState<any>();
  const [activities, setActivities] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const [background, setBackground] = useState("white");

  const [currentPageNew, setCurrentPageNew] = useState(1);
  const [totalPagesNew, setTotalPagesNew] = useState(1);
  const itemsPerPageNew = 3;

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [totalPagesActive, setTotalPagesActive] = useState(1);
  const itemsPerPageActive = 3;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/activities");
        const totalItems = response.data.activities.length;
        setTotalPagesActive(Math.ceil(totalItems / itemsPerPageActive));

        const startIndex = (currentPageActive - 1) * itemsPerPageActive;
        const endIndex = startIndex + itemsPerPageActive;
        const slicedActivities = response.data.activities.slice(
          startIndex,
          endIndex
        );
        setActivities(slicedActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [currentPageActive]);

  useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/news");
        const totalItems = response.data.list_news.length;
        setTotalPagesNew(Math.ceil(totalItems / itemsPerPageNew));

        const startIndex = (currentPageNew - 1) * itemsPerPageNew;
        const endIndex = startIndex + itemsPerPageNew;
        const slicedNewsList = response.data.list_news.slice(
          startIndex,
          endIndex
        );
        setNewsList(slicedNewsList);
      } catch (error: any) {
        console.error("Error fetching news list", error.message);
      }
    };
    fetchNewsList();
  }, [currentPageNew]);

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

  const handleToggle = () => {
    setBackground((prev) => (prev === "white" ? "lightgray" : "white"));
  };

  return (
    <Box sx={{ backgroundColor: background, height: "100%" }}>
      <NavBar />
      <BackgroundSwitch onToggle={handleToggle} />
      <Typography
        sx={{
          marginTop: 5,
          paddingBottom: 2,
          paddingTop: 2,
          textAlign: "center",
          width: "40%",
          marginLeft: "30%",
          color: "#005CCC",
          fontWeight: "bold",
          boxShadow: "5px 5px 10px lightgray",
          borderRadius: "10px",
          borderLeft: "4px solid #005CCC",
          borderRight: "4px solid #005CCC",
          textShadow:
            "2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(255, 255, 255, 0.3)",
        }}
        variant="h4"
        color="initial"
      >
        Câu Lạc Bộ Tin Học
      </Typography>
      <ImageSlider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginTop: 8,
              paddingBottom: 2,
              paddingTop: 2,
              textAlign: "center",
              fontFamily: "monospace",
              borderLeft: "4px solid #005CCC",
              borderRight: "4px solid #005CCC",
              boxShadow: "15px 15px 10px lightgray",
              width: "80%",
              marginLeft: "10%",
              borderRadius: "20px",
              color: "#005CCC",
            }}
            variant="h5"
            color="initial"
          >
            Danh sách tin tức
          </Typography>
          <Container sx={{ marginTop: 5, marginBottom: 15 }}>
            <Box sx={{ paddingBottom: 4 }}>
              <Pagination
                count={totalPagesNew}
                page={currentPageNew}
                variant="outlined"
                color="primary"
                onChange={(event, value) => setCurrentPageNew(value)}
              />
            </Box>
            {newsList?.map((news: any, index: any) => (
              <Paper
                key={index}
                elevation={3}
                style={{ marginBottom: "16px", padding: "16px" }}
              >
                <Card
                  sx={{
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0px 5px 15px #005CCC",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#005CCC",
                        textAlign: "center",
                        paddingBottom: 1,
                        paddingTop: 1,
                        borderRadius: "10px",
                      }}
                      variant="h6"
                      component="div"
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography variant="body1" color="initial">
                          <AccessTimeIcon color="primary" />
                        </Typography>
                        <Typography
                          sx={{ marginLeft: 1 }}
                          variant="body1"
                          color="initial"
                        >
                          <small>{formatDateString(news.created_at)}</small>
                        </Typography>
                      </Box>
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
            sx={{
              marginTop: 8,
              paddingBottom: 2,
              paddingTop: 2,
              textAlign: "center",
              fontFamily: "monospace",
              borderLeft: "4px solid #005CCC",
              borderRight: "4px solid #005CCC",
              boxShadow: "15px 15px 10px lightgray",
              width: "80%",
              marginLeft: "10%",
              borderRadius: "20px",
              color: "#005CCC",
            }}
            variant="h5"
            color="initial"
          >
            Danh sách hoạt động
          </Typography>

          <Container sx={{ marginTop: 5, marginBottom: 15 }}>
            <Box sx={{ paddingBottom: 4 }}>
              <Pagination
                variant="outlined"
                color="primary"
                onChange={(event, value) => setCurrentPageActive(value)}
                count={totalPagesActive}
                page={itemsPerPageActive}
              />
            </Box>
            {activities?.map((activity: any, index: any) => (
              <Paper
                key={index}
                elevation={3}
                style={{ padding: "16px", marginBottom: "16px" }}
              >
                <Card
                  sx={{
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0px 5px 15px #005CCC",
                      cursor: "pointer",
                    },
                  }}
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
                </Card>
              </Paper>
            ))}
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default HomePages;

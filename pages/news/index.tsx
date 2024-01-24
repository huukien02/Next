import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Paper,
  Box,
  TextField,
} from "@mui/material";
import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import axios from "axios";

function News() {
  const [newsList, setNewsList] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes} - ${day}/${month}/${year} `;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNewsList = newsList?.filter((news: any) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <TextField
        label="Tìm kiếm tin tức"
        variant="outlined"
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Box sx={{ paddingBottom: 8, paddingTop: 5 }}>
        <Container>
          {filteredNewsList?.map((news: any, index: any) => (
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
                    Date: {formatDateString(news.created_at)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {news.content}
                  </Typography>
                </CardContent>
                <CardContent>
                  <img
                    src={news.image}
                    alt=""
                    style={{
                      width: "50%",
                      height: "200px",
                    }}
                  />
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default News;

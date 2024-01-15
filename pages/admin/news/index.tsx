import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@mui/material";
import axios from "axios";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import Footer from "@/component/Footer";
import Forbidden from "@/component/admin/Forbidden";

const News = () => {
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCreateNews = async () => {
    try {
      const response = await axios.post("http://localhost:3000/news/create", {
        title,
        content,
      });

      if (response.data.status == 200) {
        alert("Tạo tin thành công");
        setContent("");
        setTitle("");
        setChange((prev) => !prev);
      } else {
        alert("Tạo tin thất bại");
      }
    } catch (error: any) {
      console.error("Error creating news", error.message);
    }
  };

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
  }, [change]);

  const handleDeleteNews = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/news/delete/${id}`
      );

      if (response.status === 200) {
        alert(`Xóa thành công `);
        setChange((prev) => !prev);
      } else {
        alert("Error deleting user");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
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
      {user?.role == 0 ? (
        <Box>
          <NavbarAdmin />
          <Container sx={{ paddingBottom: 14 }}>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateNews}
              >
                Create News
              </Button>
            </Paper>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="h5">News List</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newsList.map((news: any) => (
                    <TableRow key={news.id}>
                      <TableCell>{news.id}</TableCell>
                      <TableCell>{news.title}</TableCell>
                      <TableCell>{news.content}</TableCell>
                      <TableCell>{formatDateString(news.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteNews(news.id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Container>
          <Footer />
        </Box>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default News;

// pages/feedback.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Rating,
  Box,
} from "@mui/material";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Forbidden from "@/component/admin/Forbidden";

const FeedbackPage = () => {
  const [user, setUser] = useState<any>();
  const [content, setContent] = useState<any>();
  const [change, setChange] = useState<any>();
  const [feedbackData, setFeedbackData] = useState<any>();
  const [rate, setRate] = useState<any>(5);

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch("http://localhost:3000/feedback/");
        const data = await response.json();
        setFeedbackData(data.list_feedback);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [change]);

  const handleFeedback = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/feedback/create",
        {
          rate,
          content,
          userId: user.id,
        }
      );
      console.log(response.data);
      if (response.data.status == 200) {
        alert("Đóng góp ý kiến thành công");
        setContent("");
        setRate(5);

        setChange((prev: any) => !prev);
      } else {
        alert("Đóng góp ý kiến thất bại");
      }
    } catch (error: any) {
      // Handle errors
      console.error("Error creating news", error.message);
    }
  };

  const handleDeleteFeedback = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/feedback/delete/${id}`
      );

      if (response.status === 200) {
        alert(`Xóa thành công `);
        setChange((prev: any) => !prev);
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
      {user ? (
        <>
          <NavBar />

          <Container sx={{ paddingBottom: 15 }}>
            <Typography
              variant="h4"
              color="initial"
              sx={{
                fontFamily: "monospace",
                textAlign: "center",
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              Feedback
            </Typography>
            <List>
              {feedbackData?.map((feedback: any, index: any) => (
                <Paper
                  key={index}
                  elevation={3}
                  style={{ marginBottom: "16px", padding: "16px" }}
                >
                  <Typography variant="body1" color="initial">
                    <strong>{feedback.user.username} </strong>
                    <Rating
                      size="small"
                      sx={{ marginLeft: 3 }}
                      name="simple-controlled"
                      value={feedback.rate}
                    />
                  </Typography>
                  <ListItem>
                    <ListItemText
                      primary={feedback.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {feedback.content}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="caption"
                            color="textSecondary"
                          >
                            Thời Gian: {formatDateString(feedback.created_at)}
                          </Typography>
                          {user?.id == feedback.user.id && (
                            <>
                              <Button
                                sx={{ marginLeft: 2 }}
                                onClick={() =>
                                  handleDeleteFeedback(feedback.id)
                                }
                              >
                                <DeleteIcon color="error" />
                              </Button>
                            </>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>

            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Box>
                <Typography>Đánh giá</Typography>
                <Rating
                  name="simple-controlled"
                  value={rate}
                  onChange={(event, newValue) => {
                    setRate(newValue);
                  }}
                />
              </Box>
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
                onClick={handleFeedback}
              >
                Create News
              </Button>
            </Paper>
          </Container>

          <Footer />
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default FeedbackPage;

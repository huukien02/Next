// pages/rules.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import axios from "axios";

const RulesPage = () => {
  const [listRules, setListRule] = useState<any>();

  useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rules");
        setListRule(response.data.rules);
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
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nội Quy
        </Typography>
        {listRules?.map((rule: any, index: any) => (
          <Paper
            key={index}
            elevation={3}
            style={{ padding: "16px", marginBottom: "16px" }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {rule.title}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              {rule.content}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Thời gian:{formatDateString(rule.created_at)}
            </Typography>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Ghi chú: {rule.note}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default RulesPage;

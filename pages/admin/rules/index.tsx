import Footer from "@/component/Footer";
import Forbidden from "@/component/admin/Forbidden";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Rules() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [note, setNote] = useState("");
  const [listRules, setListRule] = useState<any>();
  const [change, setChange] = useState(false);

  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCreateRules = async () => {
    try {
      const response = await axios.post("http://localhost:3000/rules/create", {
        title,
        content,
        note,
      });

      if (response.data.status == 200) {
        alert("Tạo nội quy thành công");
        setContent("");
        setTitle("");
        setNote("");
        setChange((prev) => !prev);
      } else {
        alert("Tạo nội quy thất bại");
      }
    } catch (error: any) {
      console.error("Error creating news", error.message);
    }
  };

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
  }, [change]);

  const handleDeleteRules = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/rules/delete/${id}`
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
              <TextField
                label="Note"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRules}
              >
                Create Rules
              </Button>
            </Paper>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="h5">Nội Quy</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listRules?.map((rule: any) => (
                    <TableRow key={rule.id}>
                      <TableCell>{rule.id}</TableCell>
                      <TableCell>{rule.title}</TableCell>
                      <TableCell>{rule.content}</TableCell>
                      <TableCell>{rule.note}</TableCell>
                      <TableCell>{formatDateString(rule.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteRules(rule.id)}
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
}

export default Rules;

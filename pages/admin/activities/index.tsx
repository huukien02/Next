import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  Container,
} from "@mui/material";
import axios from "axios";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import Footer from "@/component/Footer";
import Forbidden from "@/component/admin/Forbidden";

function Activities() {
  const [change, setChange] = useState<any>();
  const [activities, setActivities] = useState<any>([]);

  const [name, setName] = useState<any>();
  const [fee, setFee] = useState<any>();
  const [participants, setParticipants] = useState<any>();
  const [content, setContent] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [dueDate, setDueDate] = useState<any>();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAddActivity = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/activities/create",
        { name, fee, participants, startDate, dueDate, content }
      );

      if (response.data.status == 200) {
        alert("Tạo hoạt động thành công");
        setChange((prev: any) => !prev);
        setName("");
        setFee("");
        setParticipants("");
        setContent("");
        setStartDate("");
        setDueDate("");
      } else {
        alert("Tạo hoạt động thấ bại");
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

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
  }, [change]);

  const handleDeleteActive = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/activities/delete/${id}`
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

  const handleDetailActive = (content: any) => {
    alert(content);
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
      {
        (user?.role == 0 ? (
          <>
            <NavbarAdmin />
            <Container sx={{ paddingBottom: 14 }}>
              <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                <TextField
                  label="Tên"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  label="Nội dung"
                  fullWidth
                  margin="normal"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <TextField
                  label="Giá"
                  fullWidth
                  margin="normal"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />

                <TextField
                  label="Số lượng"
                  fullWidth
                  margin="normal"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                />

                <TextField
                  type="date"
                  fullWidth
                  margin="normal"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <TextField
                  type="date"
                  fullWidth
                  margin="normal"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddActivity}
                >
                  Create Active
                </Button>
              </Paper>
              <Box sx={{ paddingBottom: 5, paddingTop: 10 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Fee</TableCell>
                      <TableCell>Participants</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activities?.map((activity: any) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.name}</TableCell>
                        <TableCell>{activity.fee}</TableCell>
                        <TableCell>{activity.participants}</TableCell>
                        <TableCell>
                          {formatDateString(activity.startDate)}
                        </TableCell>
                        <TableCell>
                          {formatDateString(activity.dueDate)}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDetailActive(activity.content)}
                            variant="contained"
                            color="info"
                          >
                            Detail
                          </Button>
                          <Button
                            sx={{ marginLeft: 2 }}
                            onClick={() => handleDeleteActive(activity.id)}
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
              </Box>
            </Container>
            <Footer />
          </>
        ) : (
          <Forbidden />
        ))
      }
    </>
  );
}

export default Activities;

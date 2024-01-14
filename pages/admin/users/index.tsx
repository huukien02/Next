import Footer from "@/component/Footer";
import Forbidden from "@/component/admin/Forbidden";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [change, setChange] = useState(false);
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data.list_user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [change]);

  const handleDeleteUser = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/delete/${id}`
      );

      // Check the response status
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

  return (
    <>
      {user?.role == 0 ? (
        <>
          <NavbarAdmin />
          <Paper sx={{ marginTop: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.role == 0 ? "Admin" : "User"}</TableCell>
                    <TableCell>
                      {user.role !== 0 && (
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Footer />
        </>
      ) : (
        <>
          <Forbidden />
        </>
      )}
    </>
  );
}

export default Users;

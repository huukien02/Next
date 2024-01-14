import Footer from "@/component/Footer";
import BarChart from "@/component/admin/Chart";
import Chart from "@/component/admin/Chart";
import Forbidden from "@/component/admin/Forbidden";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function HomeAdmin() {
  const [user, setUser] = useState<any>();
  const [activities, setActivities] = useState<any>([]);
  const [users, setUsers] = useState<any>();
  const [newsList, setNewsList] = useState([]);
  const [listRules, setListRule] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data.list_user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const chartData = {
    labels: ["Người Dùng", "Hoạt Động", "Quy Định", "Tin Tức", "Phản Hồi"],
    values: [
      users?.length,
      activities?.length,
      listRules?.length,
      newsList?.length,
      4,
    ],
  };

  return (
    <>
      {user?.role == 0 ? (
        <Box sx={{ paddingBottom: 10 }}>
          <NavbarAdmin />
          <BarChart data={chartData} />
          <Footer />
        </Box>
      ) : (
        <Forbidden />
      )}
    </>
  );
}

export default HomeAdmin;

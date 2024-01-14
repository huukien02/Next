import Footer from "@/component/Footer";
import Forbidden from "@/component/admin/Forbidden";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function Feedback() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      {user?.role == 0 ? (
        <Box>
          <NavbarAdmin />
          <Footer />
        </Box>
      ) : (
        <Forbidden />
      )}
    </>
  );
}

export default Feedback;

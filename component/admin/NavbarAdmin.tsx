// components/CustomAppBar.js
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarAdmin = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <>
      {user?.role == 0 && (
        <AppBar position="static">
          <AppBar position="static">
            <Toolbar>
              <Link href="/admin/home" passHref>
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Thống kê
                </Button>
              </Link>
              <Link href="/admin/users" passHref>
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Người dùng
                </Button>
              </Link>
              <Link href="/admin/news" passHref>
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Tin tức
                </Button>
              </Link>
              <Link href="/admin/activities" passHref>
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Hoạt động
                </Button>
              </Link>
              <Link href="/admin/rules" passHref>
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Nội quy
                </Button>
              </Link>
              {/* <Link href="/admin/feedback" passHref>
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Ý kiến
                </Button>
              </Link> */}
              {!user ? (
                <Link href="admin/login" passHref>
                  <Button
                    sx={{
                      "&:hover": { backgroundColor: "#1a237e" },
                      color: "white",
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleLogout}
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                  }}
                >
                  Đăng xuất
                </Button>
              )}
              {user && (
                <Button
                  sx={{
                    "&:hover": { backgroundColor: "#1a237e" },
                    color: "white",
                    marginLeft: 80,
                  }}
                >
                  Xin chào: {user.username}
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </AppBar>
      )}
    </>
  );
};

export default NavbarAdmin;

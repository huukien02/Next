import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const NavBar = () => {
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
    router.push("/login");
  };

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Link href="/" passHref>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "#1a237e" },
                  color: "white",
                }}
              >
                Trang chủ
              </Button>
            </Link>
            <Link href="/news" passHref>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "#1a237e" },
                  color: "white",
                }}
              >
                Tin tức
              </Button>
            </Link>
            <Link href="/activities" passHref>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "#1a237e" },
                  color: "white",
                }}
              >
                Hoạt động
              </Button>
            </Link>
            <Link href="/rules" passHref>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "#1a237e" },
                  color: "white",
                }}
              >
                Nội quy
              </Button>
            </Link>
            <Link href="/feedback" passHref>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "#1a237e" },
                  color: "white",
                }}
              >
                Ý kiến
              </Button>
            </Link>
            {!user ? (
              <Link href="/login" passHref>
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

            <Link href="/signup" passHref>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "#1a237e" },
                  color: "white",
                }}
              >
                Đăng kí
              </Button>
            </Link>
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
      </Box>
    </>
  );
};

export default NavBar;

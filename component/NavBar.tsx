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
      <Box sx={{ display: "flex" }}>
        <img
          src="http://clbtinhoc.cuongpham.vn/logo.png"
          alt=""
          style={{ width: "150px" }}
        />
        <Box sx={{ marginTop: 4 }}>
          <Typography
            sx={{ color: "#005CCC", fontWeight: "bold" }}
            variant="h3"
            color="initial"
          >
            CLB TIN HỌC
          </Typography>
          <Typography
            sx={{ color: "#005CCC", fontSize: "20px" }}
            variant="body1"
            color="initial"
          >
            Tin thi học, không tin thì chuồn
          </Typography>
        </Box>
        <Box sx={{ marginLeft: 90 }}>
          <img
            style={{ width: "200px" }}
            src="https://inkythuatso.com/uploads/images/2021/12/logo-truong-dai-hoc-kinh-te-ky-thuat-cong-nghiep-inkythuatso-01-25-09-30-52.jpg"
            alt=""
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: 1 }}>
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
                  backgroundColor: "#1a237e",
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

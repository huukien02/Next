// components/CustomAppBar.js
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import WavingHandIcon from "@mui/icons-material/WavingHand";
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
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="http://clbtinhoc.cuongpham.vn/logo.png"
                alt=""
                style={{ width: "150px" }}
              />

              <Box sx={{ marginTop: 4, marginLeft: 10 }}>
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
            </Box>

            <Box>
              <img src="http://cntt.ntt.edu.vn/upload/file/banner.png" alt="" />
            </Box>

            <Box>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2ixppveYbsFut3mtUKsns5bYNjixedk6rm2T5SpWSA&s"
                // src="https://inkythuatso.com/uploads/images/2021/12/logo-truong-dai-hoc-kinh-te-ky-thuat-cong-nghiep-inkythuatso-01-25-09-30-52.jpg"
                alt=""
              />
            </Box>
          </Box>

          <Box sx={{ marginTop: 1 }}>
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
                    Hoạt đông
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
                      "&:hover": { fontWeight: "bold" },
                      color: "white",
                      marginLeft: "auto",
                    }}
                  >
                    Đăng xuất
                  </Button>
                )}

                <Link href="/signup" passHref>
                  <Button
                    sx={{
                      "&:hover": { fontWeight: "bold" },
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
                    }}
                  >
                    <WavingHandIcon />{" "}
                    <small style={{ display: "float", marginLeft: "5px" }}>
                      {user.username}
                    </small>
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </Box>
        </>
      )}
    </>
  );
};

export default NavbarAdmin;

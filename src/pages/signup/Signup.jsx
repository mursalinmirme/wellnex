import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../assets/signup.jpg";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// select related
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Signup = () => {
  const [errorMsg, setErrorMsg] = React.useState("");
  const { createUser, updateUserProfile } = useAuth();
  const [createLoading, setCreatLoading] = React.useState(false);
  const axiosPublic = useAxiosPublic();
  const [age, setAge] = React.useState("");
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const navigate = useNavigate();
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const profilePic = data.get("profilePic");
    const userRole = data.get("userRole");
    // console.log('User role is', userRole);
    setCreatLoading(true);
    // validations
    if (!name) {
      setErrorMsg("Please enter your name");
      setCreatLoading(false);
      return;
    }
    if (!email) {
      setErrorMsg("Please enter your email");
      setCreatLoading(false);
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password");
      setCreatLoading(false);
      return;
    }
    if (!/^.{6,}$/.test(password)) {
      setErrorMsg("password should be at least 6 character ");
      setCreatLoading(false);
      return;
    }
    if (!userRole) {
      setErrorMsg("Please select your role");
      setCreatLoading(false);
      return;
    }
    if (!profilePic.name) {
      setErrorMsg("Please select you profile picture");
      setCreatLoading(false);
      return;
    }

    if (
      profilePic.type !== "image/jpeg" &&
      profilePic.type !== "image/jpg" &&
      profilePic.type !== "image/png"
    ) {
      setErrorMsg("Please select jpeg, jpg or png format Image");
      setCreatLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email");
      setCreatLoading(false);
      return;
    }

    createUser(email, password)
      .then((res) => {
        const formData = new FormData();
        formData.append("image", profilePic);
        // upload profile pic
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_imageBB_API
            }`,
            formData
          )
          .then((resp) => {
            const uploadImgUrl = resp.data.data.display_url;
            updateUserProfile(name, resp.data.data.display_url)
              .then(() => {
                // console.log('profile update result', updateResp);
                const usersData = {
                  name,
                  email,
                  image: uploadImgUrl,
                  role: userRole,
                };
                axiosPublic
                  .post("/users", usersData)
                  .then(() => {
                    axiosSecure
                      .get(`/user/${email}`)
                      .then((roleResp) => {
                        if (roleResp.data.userRole === "Participants") {
                          setCreatLoading(false);
                          toast.success("Registration successfull");
                          return navigate("/dashboard/participant-profile");
                        }
                        if (roleResp.data.userRole === "Organizers") {
                          setCreatLoading(false);
                          toast.success("Registration successfull");
                          return navigate("/dashboard/organizer-profile");
                        }
                        if (
                          roleResp.data.userRole === "Healthcare Professionals"
                        ) {
                          setCreatLoading(false);
                          toast.success("Registration successfull");
                          return navigate("/professional-dashboard");
                        }
                        if (
                          roleResp.data.userRole === "admin"
                        ) {
                          setCreatLoading(false);
                          toast.success("Registration successfull");
                          return navigate("/manage-users");
                        }
                      })
                      .catch((rollErr) => {
                        setCreatLoading(false);
                        toast.error(rollErr.message);
                      });
                  })
                  .catch((dbErr) => {
                    setCreatLoading(false);
                    toast.error(dbErr.message);
                  });
              })
              .catch((updateChatch) => {
                setCreatLoading(false);
                toast.error(updateChatch.message);
              });
          })
          .catch((error) => {
            setCreatLoading(false);
            toast.error(error.message);
          });
      })
      .catch((err) => {
        setCreatLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <Box
      sx={{
        width: { xs: "95%", lg: "80%" },
        margin: "0 auto",
        marginTop: "40px",
        marginBottom: "60px",
      }}
    >
      <Helmet>
        <title>Wellnex | Sign Up</title>
      </Helmet>
      <Grid container component="main">
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signup})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "white" }}>
              <img
                style={{ width: "50px", borderRadius: "50%" }}
                src="./logo.png"
                alt=""
              />
            </Avatar>
            <Typography component="h1" fontWeight={"700"} variant="h5">
              Sign Up
            </Typography>
            {errorMsg && (
              <Typography
                py={"10px"}
                color={"red"}
                component="p"
                fontWeight={"500"}
                variant="p"
              >
                {errorMsg}
              </Typography>
            )}
            <Typography>{user?.email}</Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Box mt={"15px"} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Account Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    name="userRole"
                    label="Account Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Participants"}>Participants</MenuItem>
                    <MenuItem value={"Organizers"}>Organizers</MenuItem>
                    <MenuItem value={"Healthcare Professionals"}>
                      Healthcare Professionals
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Grid mt={"10px"} py={"7px"}>
                <Typography variant="body1" mb={"3px"}>
                  Upload Profile:
                </Typography>
                <input
                  style={{ padding: "6px 0px" }}
                  type="file"
                  name="profilePic"
                  id="saveProfile"
                />
              </Grid>
              <Grid mt={"15px"}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "#0077B6",
                    color: "#ffffff",
                    fontWeight: "600",
                    py: "12px",
                    "&:hover": { background: "#0096C7", color: "#ffffff" },
                  }}
                >
                  {createLoading ? (
                    <CircularProgress
                      size={"28px"}
                      sx={{ color: "#ffffff" }}
                    ></CircularProgress>
                  ) : (
                    "Sign UP"
                  )}
                </Button>
              </Grid>
              <Grid mt={"25px"} textAlign={"center"}>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;

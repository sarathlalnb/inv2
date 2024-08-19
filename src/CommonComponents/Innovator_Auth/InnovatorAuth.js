import React from "react";
import "./InnovatorAuth.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Form } from "react-bootstrap";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import { ToastContainer, toast, Slide } from "react-toastify";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function InnovatorAuth() {
  const [showRegister, setShowRegister] = useState(false);
  const [selectUserType, setSelectUserType] = useState("");
  const { data, error, request: registerInvestor } = useApi("post");
  const { request: registerInnovator } = useApi("post");
  const { request: login } = useApi("post");

  const navigate = useNavigate();

  const [authInput, setAuthInput] = useState({
    full_name: "",
    username: "",
    password: "",
    mobile: "",
    email: "",
  });
  console.log(authInput);

  const signup = () => {
    setShowRegister(true);
  };

  const signIn = () => {
    setShowRegister(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthInput({ ...authInput, [name]: value });
  };

  const checkUserType = () => {
    console.log(selectUserType.user_type);
    return (
      <Form.Select
        className="user-type"
        onChange={(e) =>
          setSelectUserType({ ...selectUserType, user_type: e.target.value })
        }
      >
        <option className=" select" value="">
          Select User Type
        </option>
        <option className="select" value="Innovator">
          Innovator
        </option>
        <option className="select" value="Investor">
          Investor
        </option>
      </Form.Select>
    );
  };

  // ___________________________________________________________________________________________________________________________________________
  // registration
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("function working");
    try {
      let apiResponse;
      const payload = {
        full_name: authInput.full_name,
        username: authInput.username,
        password: authInput.password,
        email: authInput.email,
        mobile: authInput.mobile,
      };
      if (selectUserType.user_type === "Investor") {
        const url = `${endpoints.INVESTOR_REGISTERATION}`;
        apiResponse = await registerInvestor(url, payload);
        console.log(apiResponse, "response");
      } else {
        const url = `${endpoints.INNOVATOR_REGISTRATION}`;
        apiResponse = await registerInnovator(url, payload);
        console.log(apiResponse, "response");
      }
      const { response, error } = apiResponse;
      if (!error && response.data) {
        console.log(response?.data, "response");
        const responseMessage = "Registration success.!";
        toast.success(responseMessage, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setAuthInput({
          full_name: "",
          username: "",
          password: "",
          mobile: "",
          email: "",
        });
        setShowRegister(false);
      } else {
        // console.log(error.response.data, "error");
        const errorMessage =
          error.response.data || "Error occurred while registering.";
        console.log(errorMessage);
        toast.error(
          ...(errorMessage.username ||
            errorMessage.email ||
            errorMessage.password ||
            errorMessage.full_name),
          {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ___________________________________________________________________________________________________________________________________________
  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let apiResponse;
      const payload = {
        username: authInput.username,
        password: authInput.password,
      };
      const url = `${endpoints.LOGIN}`;
      apiResponse = await login(url, payload);
      console.log(apiResponse);
      const { response, error } = apiResponse;
      if (!error && response.data) {
        const responseMessage = response?.data?.message || "Login Success";
        toast.success(responseMessage, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        console.log(response.data.data);
        if (response.data.data.is_innovator) {
          navigate("/innovator/home");
        } else {
          navigate("/investor/home");
        }

        sessionStorage.setItem("token", response.data.token);
      } else {
        console.log(error.response.data.message);
        const responseMessage =
          error?.response?.data?.dh || "Incorrect Username or Password";
        toast.error(responseMessage, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {}
  };

  return (
    <div className="row">
      <img src="https://static.vecteezy.com/system/resources/previews/030/223/374/large_2x/black-and-white-background-of-financial-charts-generative-ai-free-photo.jpg" />

      {/* <div className="container auth-body"> */}
      <div className="slider">
        {showRegister ? (
          <form className="form">
            <span className="title">Sign Up</span>
            <div className="form_control">
              <input
                type="text"
                className="input"
                required
                name="full_name"
                value={authInput.full_name}
                onChange={handleInputChange}
              />
              <label className="label">Full Name</label>
            </div>
            <div className="form_control">
              <input
                type="text"
                className="input"
                required
                name="username"
                value={authInput.username}
                onChange={handleInputChange}
              />
              <label className="label">Username</label>
            </div>
            <div className="form_control">
              <input
                type="tel"
                className="input"
                name="mobile"
                value={authInput.mobile}
                onChange={handleInputChange}
                required
              />
              <label className="label">Phone</label>
            </div>
            <div className="form_control">
              <input
                type="email"
                className="input"
                name="email"
                value={authInput.email}
                onChange={handleInputChange}
                required
              />
              <label className="label">Email</label>
            </div>
            <div className="form_control">
              <input
                className="input"
                name="password"
                value={authInput.password}
                onChange={handleInputChange}
                required
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <label className="label">Password</label>
            </div>
            <div className="form_control select">{checkUserType()}</div>

            <button onClick={(e) => handleRegister(e)}>Sign Up</button>
            <span className="bottom_text">
              Already have an account?{" "}
              <a
                htmlFor="register_toggle"
                onClick={signIn}
                className="switch"
              >
                Sign In
              </a>
            </span>
          </form>
        ) : (
          <form className="form">
            <span className="title">Login</span>
            <div className="form_control">
              <input
                type="text"
                name="username"
                className="input"
                value={authInput.username}
                onChange={handleInputChange}
                required
              />
              <label className="label">Username</label>
            </div>
            <div className="form_control">
              <input
                name="password"
                type="password"
                className="input"
                value={authInput.password}
                onChange={handleInputChange}
                required
              />
              <label className="label">Password</label>
            </div>
            <button onClick={(e) => handleLogin(e)}>Login</button>
            <span className="bottom_text" onClick={signup}>
              Don't have an account?{" "}
              <a htmlFor="register_toggle" className="switch">
                Sign Up
              </a>
            </span>
          </form>
        )}
      </div>
      <ToastContainer />
      {/* </div> */}
    </div>
  );
}

export default InnovatorAuth;

import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import { Button, Tooltip } from "@mui/material";
import { Prev } from "react-bootstrap/esm/PageItem";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function InnovatorProfileEdit() {
  const navigate = useNavigate();
  const { request: profileView } = useApi("hget");
  const { request: editprofile } = useApi("mPut");

  const [profile, setProfile] = useState({});
  const [photo, setPhoto] = useState(null);

  // console.log(photo);
  // console.log(profile);
  // get profile
  const getProfile = async () => {
    try {
      let apiResponse;
      const url = `${endpoints.PROFILE}`;
      apiResponse = await profileView(url);
      const { response, error } = apiResponse;
      if (!error && response.data) {
        setProfile(response.data[0]);
        console.log(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   handle inputchange
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  //   handle imagechnage
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
      setProfile((prevState) => ({
        ...prevState,
        profile_pic: file,
      }));
    } else {
      setPhoto(null);
    }
  };

  //hadle update profile
  const handleUpdateProfile = async (e) => {
    let apiResponse;
    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("mobile", profile.mobile);
    formData.append("country", profile.country);
    formData.append("address", profile.address);
    formData.append("gender", profile.gender);
    formData.append("dob", profile.dob);
    formData.append("instagram", profile.instagram);
    formData.append("designation", profile.designation);
    formData.append("proff_bio", profile.proff_bio);
    formData.append("twitter", profile.twitter);
    formData.append("linkedin", profile.linkedin);
    formData.append("web", profile.web);
    formData.append("Location", profile.Location);
    if (profile.profile_pic instanceof File) {
      // Check if it's a file
      formData.append("profile_pic", profile.profile_pic);
    }
    // formData.append("profile_pic", profile.profile_pic);
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    try {
      const url = `${endpoints.EDIT_PROFILE}`;

      apiResponse = await editprofile(url, formData);
      const { response, error } = apiResponse;
      if (!error && response) {
        toast.success("Your Profile Updated", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        toast.error("Something went wrong..!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      console.log(apiResponse);
    } catch (error) {
      toast.error("An error occurred while updating your profile.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      console.error("Profile update error:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container ">
      <div className="border m-3 p-3">
        <h1 className="">Edit Profile</h1>

        <Row className="mt-5">
          <Col lg={4}>
            <div className="text-center ">
              <label htmlFor="edit-profile-img" className="edit-profile-img">
                <img
                  className="edit-profile-img"
                  src={
                    photo
                      ? photo
                      : `http://127.0.0.1:8000/${profile.profile_pic}` ||
                        "https://i.postimg.cc/R03PjdB0/istockphoto-1332100919-612x612.jpg"
                  }
                  alt=""
                />
                <input
                  style={{ border: "2px solid black", display: "none" }}
                  id="edit-profile-img"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </Col>
          <Col lg={8}>
            <input
              style={{ border: "2px solid black", textTransform: "capitalize" }}
              name="full_name"
              value={profile?.full_name}
              onChange={handleInputChange}
              type="text"
              className="input-field w-100 mt-4"
              placeholder="Name"
            />
            <Row>
              <Col>
                <input
                  style={{ border: "2px solid black" }}
                  onChange={handleInputChange}
                  value={profile?.designation || ""}
                  name="designation"
                  type="text"
                  className="input-field mt-2 w-100"
                  placeholder="Designation"
                />
              </Col>
              <Col>
                <input
                  style={{ border: "2px solid black" }}
                  value={profile?.Location || ""}
                  onChange={handleInputChange}
                  name="Location"
                  type="text"
                  className="input-field mt-2 w-100"
                  placeholder="Location"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <input
                  style={{ border: "2px solid black" }}
                  onChange={handleInputChange}
                  type="date"
                  className="input-field mt-2 w-100"
                  placeholder="Date Of Birth"
                  name="dob"
                  value={profile?.dob}
                />
              </Col>
              <Col>
                {/* <input
                  name="gender"
                  value={profile?.gender}
                  onChange={handleInputChange}
                  type="text"
                  className="input-field w-100 mt-2"
                  placeholder="Gender"
                /> */}

                <Form.Select
                  className="mt-2 "
                  style={{ border: "2px solid black" }}
                  aria-label="Default select example"
                  id="gender"
                  value={profile?.gender}
                  onChange={handleInputChange}
                  name="gender"
                >
                  <option value="">Select a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>

                {/* <select
                  id="gender"
                  value={profile?.gender}
                  onChange={handleInputChange}
                  name="gender"
                >
                  <option value="">Select an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select> */}
              </Col>
            </Row>
          </Col>
        </Row>
        <textarea
          onChange={handleInputChange}
          style={{ border: "2px solid black" }}
          name="proff_bio"
          value={profile?.proff_bio || ""}
          type="text"
          className="input-field w-100 mt-2"
          placeholder="Bio"
        />
        <br />
        <label htmlFor="">
          <b>Contact</b>
        </label>
        <br />

        <Row>
          <Col>
            <input
              style={{ border: "2px solid black" }}
              name="mobile"
              onChange={handleInputChange}
              value={profile?.mobile}
              type="text"
              className="input-field w-100 mt-2"
              placeholder="Phone Number"
            />
          </Col>
          <Col>
            <Tooltip title="Unable To Edit Email" placement="top">
              <input
                style={{ border: "2px solid black" }}
                onChange={handleInputChange}
                value={profile?.email || ""}
                disabled
                type="text"
                className="input-field w-100  mt-2"
                placeholder="Email"
              />
            </Tooltip>
          </Col>
        </Row>

        <textarea
          style={{ border: "2px solid black" }}
          onChange={handleInputChange}
          value={profile?.address || ""}
          name="address"
          type="text"
          className="input-field mt-2 w-100"
          placeholder="Address"
        />
        <br />
        <br />
        <label htmlFor="">
          <b>Links</b>
        </label>
        <Row>
          <Col>
            <input
              style={{ border: "2px solid black" }}
              name="instagram"
              value={profile?.instagram || ""}
              onChange={handleInputChange}
              type="text"
              className="input-field mt-2 w-100"
              placeholder="Instagram"
            />
          </Col>
          <Col>
            <input
              style={{ border: "2px solid black" }}
              onChange={handleInputChange}
              value={profile?.twitter || ""}
              name="twitter"
              type="text"
              className="input-field mt-2 w-100"
              placeholder="Twitter"
            />
          </Col>
          <Col>
            <input
              style={{ border: "2px solid black" }}
              onChange={handleInputChange}
              value={profile?.linkedin || ""}
              name="linkedin"
              type="text"
              className="input-field mt-2 w-100"
              placeholder="LinkedIn"
            />
          </Col>
          <Col>
            <input
              style={{ border: "2px solid black" }}
              onChange={handleInputChange}
              value={profile?.web || ""}
              name="web"
              type="text"
              className="input-field mt-2 w-100"
              placeholder="Website"
            />
          </Col>
        </Row>
        <br />
        <hr />
        <div className="text-end">
          <button
            variant=" button"
            onClick={(e) => handleUpdateProfile(e)}
            className="button p-1"
          >
            <b> Save Changes</b>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default InnovatorProfileEdit;

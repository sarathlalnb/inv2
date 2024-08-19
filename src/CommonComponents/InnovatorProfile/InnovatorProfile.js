import React, { useEffect, useState } from "react";
import "./InnovatorProfile.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";

function InnovatorProfile() {
  const { request: profileView } = useApi("hget");
  const [profile, setProfile] = useState(null);

  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/investor/messages" },
  ];

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

  // ____________________________________________________________________________________________________

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile-body ">
      <Header navObj={navObj} />
      <Container>
        <Row className="profile container w-100">
          <Col
            lg={4}
            className="  d-flex align-item-center justify-content-center"
          >
            <div>
              <img
                className="Profile-Img"
                src={
                  profile?.profile_pic
                    ? `http://127.0.0.1:8000/${profile.profile_pic}`
                    : "https://i.postimg.cc/rmJJBbDx/istockphoto-1332100919-612x612.jpg"
                }
                alt=""
              />
              {/* <Link to={"/profile-edit"} style={{ textDecoration: "none" }}>
                <div className="text-center">
                  <div className="mb-6 ">
                    <i class="fa-solid fa-pen text-dark "></i>
                  </div>
                </div>
              </Link> */}
            </div>{" "}
          </Col>

          <Col lg={8} className="details">
            <Row className="">
              <Col lg={9} className="">
                <h1 style={{ textTransform: "capitalize" }}>
                  {profile ? profile.full_name : "Full Name"}
                </h1>
                <span className="ms-2">
                  <i class="fa-solid fa-location-dot"></i> {profile?.Location}
                </span>
                <span className="ms-2">
                  <Link to={"/profile-edit"} style={{ textDecoration: "none" }}>
                    <button className="btn btn-outline-dark">
                      {" "}
                      <i class="fa-solid fa-pen text-dark "></i>
                      Edit Profile
                    </button>
                  </Link>
                </span>
              </Col>
              <Col lg={3} className="align-item-center justify-content-center ">
                <div className="fs-3 d-flex mt-2 social-media-icons ">
                  <a href={profile?.instagram}>
                    {" "}
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href={profile?.twitter} style={{ color: "black" }}>
                    <i class="fa-brands fa-square-x-twitter ms-4"></i>
                  </a>
                  <a href={profile?.linkedin} style={{ color: "black" }}>
                    {" "}
                    <i class="fa-brands fa-linkedin ms-4"></i>
                  </a>
                  <a href={profile?.web} style={{ color: "black" }}>
                    {" "}
                    <i class="fa-solid fa-link ms-4"></i>
                  </a>
                </div>
                {/* <div className="text-center mt-4 d-flex">
                <Link
                  to={"/innovator/profile-edit"}
                  style={{ textDecoration: "none" }}
                >
                  <button className="button p-1">
                    <b>Edit Profile</b>
                  </button>
                </Link>
              </div> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="text-center">
        {" "}
        <span className="about-head ms-2">{profile?.proff_bio}</span>
      </Container>

      <div className="about container w-100 mt-4">
        <Row className="mt-4 text-center">
          <Col>
            {/* <span className="about-head">
              <h4>Professional Bio{"   "}</h4>
            </span>
            <p>{profile?.proff_bio}</p> */}
            <span className="about-head">
              <h4 className="mb-3">Contact{"   "}</h4>
            </span>

            <p>
              Phone :<b>+91 {profile?.mobile}</b>
            </p>
            <p>
              Email :<b>{profile?.email}</b>
            </p>
            <p>
              Address : <b>{profile?.address}</b>
            </p>
          </Col>
          <Col>
            <span className="about-head">
              <h4 className="mb-3">Basic Details{"   "}</h4>
            </span>
            <p>
              Designation :<b> {profile?.designation} </b>
            </p>
            <p>
              Date Of Birth :<b> {profile?.dob} </b>
            </p>
            <p>
              Gender :<b> {profile?.gender}</b>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default InnovatorProfile;

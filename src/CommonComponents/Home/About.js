import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutusImg from "../../Assets/aboutusImg.jpg";
import aboutImg from "../../Assets/aboutImg.jpg";
import Header from "../Header/Header";

function About() {
  // const navObj = [
  //   { text: "Home", link: "/" },
  //   { text: "About Us", link: "/aboutus" },
  // ];
  return (
    <>
      {/* <Header navObj={navObj} /> */}
      <div className="aboutUs-body pt-5 pb-5 mb-5">
        <Container>
          <h5 className="mb-4">. about us</h5>

          <Row>
            <Col>
              <h1 className="aboutUs-head">
                <b>
                  Where Vision Meets <span className="head2">Investment</span>{" "}
                  for Tomorrow's <span className="head2">Innovations.</span>
                </b>
              </h1>
              <div className="align-item-center justify-content-center d-flex">
                <img src={aboutusImg} className="aboutUsImg w-100" alt="" />
              </div>{" "}
            </Col>
            <Col className=" about-us">
              <p className="">
                At Crowdfunding Ideas Platform, we're dedicated to
                revolutionizing the way innovative ideas come to life. Our
                platform serves as a dynamic hub where visionary creators and
                forward-thinking investors converge to drive the future of
                innovation. <br /> <br />
                Our mission is to empower creators by providing a platform where
                they can showcase their ideas and gain support from investors
                who believe in their potential. We strive to foster
                collaboration, transparency, and success through cutting-edge
                technology and a user-centric approach. <br /> <br />
                What sets us apart is our commitment to security, reliability,
                and user experience. With robust features such as secure
                financial transactions, real-time project monitoring,
                personalized dashboards, and direct messaging, we create a
                seamless environment for idea exchange and investment
                opportunities. <br /> <br />
                Join us today and become part of a thriving community where
                ideas transform into reality, and investments drive
                groundbreaking achievements.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default About;

import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo-white.png";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

function Footer() {
  return (
    <>
      <div className="footer-body ">
        <Container>
          <Row>
            <Col lg={4} md={4}>
              <div className="d-flex">
                <img src={logo} className="logo-footer" alt="" />
                <h2 className="mt-2 ms-3">
                  <b>
                    {" "}
                    <span>
                      {" "}
                      Capital<span className="head2">Clue</span>
                    </span>
                  </b>
                </h2>
              </div>
              <div className="mt-4">
                1234, Silicon Valley Road, Bangalore - 560001, Karnataka, India
              </div>
              <div className=" d-flex mt-3 ">
                <div className="media-icons ">
                  {" "}
                  <i class="fa-brands fa-instagram"></i>
                </div>
                <div className="media-icons  ms-4">
                  {" "}
                  <i class="fa-brands fa-square-x-twitter"></i>
                </div>
                <div className="media-icons  ms-4">
                  {" "}
                  <i class="fa-brands fa-linkedin "></i>
                </div>
                <div className="media-icons  ms-4">
                  <i class="fa-solid fa-link"></i>
                </div>
              </div>
            </Col>
            <Col lg={1} md={0}></Col>
            <Col lg={3}>
              <div>
                <h2 className="mt-3 ">Links</h2>
                <Link style={{ textDecoration: "none" }} className="text-white">
                  Home
                </Link>{" "}
                <br />
                <Link style={{ textDecoration: "none" }} className="text-white">
                  About Us
                </Link>
                <br />
                <Link style={{ textDecoration: "none" }} className="text-white">
                  Services
                </Link>
              </div>
            </Col>

            <Col lg={4} md={4}>
              <h2 className="mt-3 ">Feedback</h2>
              <Rating
              className=""
              style={{ borderColor: 'red' }}
                name="simple-controlled"
              
              />
              <textarea
                type="text"
                className="input-field w-100 mt-2"
                placeholder="Message"
              />
              <br />
              <div className="text-end">
                {" "}
                <button className="button  ">
                  <b>Submit</b>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="text-center text-black">
        &#169; 2023 | all right reserved | investory{" "}
      </div>
    </>
  );
}

export default Footer;

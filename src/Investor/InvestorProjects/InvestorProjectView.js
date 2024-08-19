import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "./InvestorProject.css";
import { Link, useParams } from "react-router-dom";
import Header from "../../CommonComponents/Header/Header";
import { ToastContainer, toast, Slide } from "react-toastify";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import { GiPayMoney } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import { IoIosSend } from "react-icons/io";

function InvestorProjectView() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [profile, setProfile] = useState({});
  const [project, setProject] = useState([]);
  const [projectD, setProjectD] = useState([]);
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [investInput, setInvestInput] = useState({
    full_name: "",
    account_no: "",
    mobile_number: "",
    rate: 0,
  });
  const [investorMessage, setInvestorMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const { request: profileView } = useApi("hget");
  const { id } = useParams();
  const { request: projectview } = useApi("get");
  const { request: investProject } = useApi("post");

  // get profile
  const getProfile = async () => {
    try {
      let apiResponse;
      const url = `${endpoints.PROFILE}`;
      apiResponse = await profileView(url);
      const { response, error } = apiResponse;
      if (!error && response.data) {
        setProfile(response.data[0]);
        // console.log(response.data[0]);
        // console.log(profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profile && profile.full_name) {
      setInvestInput({
        ...investInput,
        full_name: profile.full_name,
      });
    }
  }, [profile]);

  // payment
  const payment = async () => {
    Swal.fire({
      imageUrl:
        "https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png",
      imageHeight: 300,
      imageAlt: "Payment Successfull",
    });
    setShow(false);
  };

  //getSingleProject
  const getSingleProject = async () => {
    try {
      const url = `${endpoints.PROJECT_VIEW}${id}`;
      const apiResponse = await projectview(url);
      const { response, error } = apiResponse;
      console.log(response.data);
      if (!error && response) {
        setProject(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  };
  const getsummary = async () => {
    try {
      const url = `${endpoints.GET_INVESTMENT_SUMMARY}/${id}/`;
      const apiResponse = await projectview(url);
      const { response, error } = apiResponse;
      console.log(response.data);
      if (!error && response) {
        setProjectD(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  };

  // get Project Updates
  const getProjectUpdates = async () => {
    try {
      const getProjectUpdatesUrl = `${endpoints.GET_PROJECT_UPDATE}${id}`;
      let updatesResponse = await projectview(getProjectUpdatesUrl);
      const { response, error } = updatesResponse;
      if (!error && response) {
        setProjectUpdates(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //INVEST_IN_PROJECT
  const InvestProject = async (e) => {
    e.preventDefault();
    try {
      // console.log(investInput);
      const payload = investInput;
      let investUrl = `${endpoints.INVEST_IN_PROJECT}${id}`;
      let investResponse = await investProject(investUrl, payload);
      let { response, error } = investResponse;
      if (!error && response) {
        let responseMessage = "Succesfully Invested";
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
        setShow(false);
        addToInvest();
        // console.log("success");
        setInvestInput({
          full_name: "",
          account_no: "",
          mobile_number: "",
          rate: 0,
        });
        payment();
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToInvest = async () => {
    try {
      let investUrl = `${endpoints.ADD_INVESTMENT}${id}`;
      let investResponse = await investProject(investUrl);
      let { response, error } = investResponse;
      if (!error && response) {
        console.log("Successfully added to invest");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //SEND  FIRST MESSAGE
  const { request: sendMessage } = useApi("post");
  const handleSendFirstMessage = async () => {
    try {
      const url = `${endpoints.SEND_FIRST_MESSAGE}${project.id}`;
      let messageResponse;
      const payload = {
        message: investorMessage,
      };
      messageResponse = await sendMessage(url, payload);
      let { response, error } = messageResponse;
      if (!error && response) {
        setInvestorMessage("");
        handleNotify();
        handleClose1();
        let responseMessage = "Message Succesfully Sent";
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  // SEND NOTIFICATION
  const { request: sendNotification } = useApi("post");
  const handleNotify = async () => {
    try {
      const url = `${endpoints.SEND_NOTIFICATION}${project.id}`;
      let notificationResponse;
      notificationResponse = await sendNotification(url);
      const { error, response } = notificationResponse;
      if (!error && response) {
        console.log("Notification Sent");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProject();
    getProjectUpdates();
    getProfile();
    getsummary();
  }, [id]);

  //NAVOBJECT
  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/investor/messages" },
  ];

  function getMonthsDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const yearsDifference = d2.getFullYear() - d1.getFullYear();
    const monthsDifference = d2.getMonth() - d1.getMonth();

    return yearsDifference * 12 + monthsDifference;
  }

  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>

      <div className="main-div">
        <div>
          <div className="d-flex justify-content-between">
            <Link to={"/investor/home"}>
              <Button
                variant="dark rounded-0 "
                className="ms-2 mt-2 rounded-pill"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
            </Link>
            <Link to={"/innovator/messages"}>
              <AiFillMessage className="fs-1 mt-2 " color="black" />
            </Link>
          </div>
        </div>

        <div className="main-div">
          <Container fluid={"sm"} className="">
            <Row>
              <Col>
                <img
                  className="img-fluid mb-3"
                  src={`http://127.0.0.1:8000/${project.image}`}
                  alt=""
                  style={{ height: "400px", borderRadius: "10px" }}
                />
              </Col>
              <Col className="">
                <Card
                  className=" px-2 shadow"
                  style={{ width: "100%", height: "400px" }}
                >
                  <Card.Body>
                    <Card.Title className="fs-3 fw-bold text-center">
                      <h1>{project.project_name}</h1>
                    </Card.Title>
                    <Card.Text>
                      <div
                        style={{ textAlign: "justify" }}
                        className="mt-4 px-3"
                      >
                        <b>Description: </b>
                        {project.description}
                        <p className="mt-2">
                          <b>Duration:</b>{" "}
                          {getMonthsDifference(
                            project.date,
                            project.end_date
                          ) || "N/A"}
                        </p>
                      </div>
                      <div className="fw-bold mt-3 px-3">
                        <div className="text-center">
                          <h5>Target Amount</h5>{" "}
                        </div>
                        <ProgressBar
                          variant="success"
                          className="striped"
                          now={(project.amount / project.amount) * 100}
                          label={`₹${project.amount}`}
                          title={`₹${project.amount} / ₹${project.targetAmount}`}
                          style={{ height: "30px" }}
                          data-bs-theme="dark"
                        />
                      </div>
                      <div className="fw-bold mt-3 px-3">
                        <div className="text-center">
                          <h5>Balance Amount</h5>{" "}
                        </div>
                        <ProgressBar
                          variant="success"
                          className="striped"
                          label={`₹${projectD.balance_amount}`}
                          title={`₹${project.balance_amount}`}
                          style={{ height: "30px" }}
                          data-bs-theme="dark"
                        />
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="text-center">
              <button
                className="btn btn-outline-secondary mt-2 w-25 me-3"
                onClick={handleShow}
              >
                Make Investment
                <GiPayMoney className="fs-4" />
              </button>
              <button
                className="btn btn-outline-success mt-2 w-25"
                onClick={handleShow1}
              >
                Send Message
                <IoIosSend className="fs-4" />
              </button>
            </div>
            <div>
              <Accordion defaultActiveKey="1" className="my-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    <h5>
                      {" "}
                      <MdOutlineUpdate /> See Project Updates
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {projectUpdates?.length > 0
                        ? projectUpdates.map((project, index) => (
                            <p>
                              <FaCheckCircle /> {project.update_message}
                            </p>
                          ))
                        : "No project Updates"}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <ToastContainer />

            {/* MODAL FOR PAYMENT  */}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Payment Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Full Name"
                  value={profile.full_name}
                  readOnly
                />
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Account Number"
                  onChange={(e) =>
                    setInvestInput({
                      ...investInput,
                      account_no: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control mb-3"
                  type="number"
                  placeholder="Mobile Number"
                  onChange={(e) =>
                    setInvestInput({
                      ...investInput,
                      mobile_number: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="rate"
                  onChange={(e) =>
                    setInvestInput({ ...investInput, rate: e.target.value })
                  }
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={InvestProject}>
                  Pay
                </Button>
              </Modal.Footer>
            </Modal>
            {/* MODAL FOR FIRST MESSAGE */}
            <Modal
              show={show1}
              onHide={handleClose1}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Send a Message </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Your Message"
                  onChange={(e) => setInvestorMessage(e.target.value)}
                  value={investorMessage}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                  Close
                </Button>
                <Button variant="success" onClick={handleSendFirstMessage}>
                  Send
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </div>
      </div>
    </>
  );
}

export default InvestorProjectView;

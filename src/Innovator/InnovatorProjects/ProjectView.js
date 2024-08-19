import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Modal,
  ProgressBar,
  Row,
  Card,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import "./InnovatorProject.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import CardSkeleton from "../../CommonComponents/Card Skeleton/CardSkeleton";
import Header from "../../CommonComponents/Header/Header";
import Accordion from "react-bootstrap/Accordion";
import { MdOutlineUpdate } from "react-icons/md";

function ProjectView() {
  const [project, setProject] = useState(null);
  console.log(project);
  const { request: projectview } = useApi("get");
  const { id } = useParams();
  const { request: UpdateProject } = useApi("post");
  const { request: GetInvestors } = useApi("get");
  const [updateInput, setUpdateInput] = useState({
    update_message: "",
  });
  const [show, setShow] = useState(false);
  const [investors, setInvestors] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navObj = [
    { text: "Dashboard", link: "/innovator/home" },
    { text: "My Projects", link: "/innovator/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const getSingleProject = async () => {
    try {
      const url = `${endpoints.PROJECT_VIEW}${id}`;
      const apiResponse = await projectview(url);
      const { response, error } = apiResponse;
      // console.log(response);
      if (!error && response) {
        setProject(response.data[0]);
        // console.log(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  };
  useEffect(() => {
    getSingleProject();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdateInput({ ...updateInput, [name]: value });
  };

  // get Project Updates
  const getInvestorDetails = async () => {
    try {
      const getInvestorDetailUrl = `${endpoints.GET_INVESTOR_LIST}${id}`;
      let InvestorDetail = await GetInvestors(getInvestorDetailUrl);
      const { response, error } = InvestorDetail;
      if (!error && response) {
        setInvestors(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvestorDetails();
  }, []);

  // console.log("invest", investors);

  if (!project)
    return (
      <div>
        <CardSkeleton />
      </div>
    );

  const handleUpdate = async (e) => {
    try {
      const url = `${endpoints.UPDATE_PROJECT}${id}`;
      const payload = {
        update_message: updateInput.update_message,
      };
      const apiResponse = await UpdateProject(url, payload);
      // console.log(apiResponse);
      const { response, error } = apiResponse;
      // console.log(response, "message");
      if (!error && response) {
        // setProject(response.data[0]);
        getSingleProject();
        setShow(false);
        toast.success("Project Updations added Successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  };

  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>

      <div className="main-div">
        <Container fluid={"sm"} className="pb-0 text-center">
          <div className="text-end mt-3">
            {" "}
            <Button onClick={handleShow}>Add Updations</Button>
          </div>

          {/* <div className="row shadow">
            <div className="col p-1">
              <img
                className="img-fluid mb-3"
                src={`http://127.0.0.1:8000/${project.image}`}
                alt=""
                style={{ height: "400px" }}
              />
            </div>
            <div className="col">
              <div className="container mt-5 px-4">
                <h2>{project.project_name}</h2>
                <p style={{ textAlign: "justify" }} className="mb-5">
                  {project.description}
                </p>
              </div>
              <div className="w-75 mx-auto my-2">
                <h3>Amount raised</h3>
                <ProgressBar
                  variant="success"
                  className="striped"
                  now={(project.amount / project.amount) * 100}
                  label={`₹${project.amount}`}
                  title={`₹${project.amount} / ₹${project.targetAmount}`}
                  style={{ height: "30px" }}
                  data-bs-theme="dark"
                />
                <ListGroup className="w-75 mx-auto fw-bold  mb-5">
                  {project.investors?.map((i, index) => (
                    <ListGroup.Item
                      className="bg-transparent d-flex justify-content-evenly"
                      key={index}
                    >
                      {i.name} <span className="vr mx-4"></span> ₹{i.amount}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="d-flex justify-content-between mb-3">
                  <p>Deadline: {project.end_date || "N/A"}</p>
                </div>
              </div>
              <div>
                <span className="fw-bold">Updations:</span>
                {updateInput.update_message}
              </div>
            </div>
          </div> */}
          <Row className="py-3">
            <Col>
              <img
                className="img-fluid"
                src={`http://127.0.0.1:8000/${project.image}`}
                alt=""
                style={{ height: "400px", borderRadius: "10px" }}
              />
            </Col>
            <Col>
              <Card
                className=" px-2 shadow"
                style={{ width: "100%", height: "400px" }}
              >
                <Card.Body>
                  <Card.Title className="fs-3 fw-bold text-center">
                    <h1>{project.project_name}</h1>
                  </Card.Title>
                  <Card.Text>
                    <div style={{ textAlign: "justify" }} className="mt-4 px-3">
                      <b>Description: </b>
                      {project.description}
                      <p className="mt-2">
                        <b>Duration:</b> {project.end_date || "N/A"}
                      </p>
                    </div>
                    <div className="fw-bold mt-3 px-3">
                      <div className="text-center">
                        <h5>Amount raised</h5>{" "}
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
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-start ms-3">
            <Accordion defaultActiveKey="1" className="my-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {" "}
                  <h5>
                    {" "}
                    <MdOutlineUpdate /> See Investors
                  </h5>
                </Accordion.Header>
                <Accordion.Body>
                  <ol>
                    {investors?.length > 0
                      ? investors.map((project, index) => (
                          <li>
                            <p>
                              {" "}
                              <b>Investor Name: </b>
                              {project.full_name} &nbsp; &nbsp;{" "}
                              <b>Amount: &#8377;</b>
                              {project.amount}{" "}
                            </p>
                          </li>
                        ))
                      : "No Investors Yet!"}
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Updations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="input-field"
            type="text"
            placeholder="Message"
            name="update_message"
            value={updateInput.update_message}
            onChange={handleInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleUpdate(e)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ProjectView;

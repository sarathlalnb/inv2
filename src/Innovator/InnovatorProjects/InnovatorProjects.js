import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import "./InnovatorProject.css";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Header from "../../CommonComponents/Header/Header";

function InnovatorProjects() {
  const [show, setShow] = useState(false);
  const [cat, setCat] = useState([]);
  const [innovatorProjects, setInnovatorProjects] = useState([]);
  const [isEditForm, setIsEditForm] = useState(false);
  const [reload, setReload] = useState(false);

  const { request: getCategory } = useApi("get");
  const { request: addCategory } = useApi("post");
  const { request: addProjects } = useApi("mPost");
  const { request: getInnovatorProjects } = useApi("hget");
  const { request: deleteInnovatorProject } = useApi("delete");
  const { request: editInnovatorProject } = useApi("mPut");

  const [photo, setPhoto] = useState(null);
  const [projectData, setProjectData] = useState({
    project_name: "",
    description: "",
    amount: "",
    category: "",
    end_date: "",
    image: "",
  });

  const [inputValue, setInputValue] = useState("");

  const navObj = [
    { text: "Dashboard", link: "/innovator/home" },
    { text: "My Projects", link: "/innovator/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const uploadImage =
    "https://static.vecteezy.com/system/resources/thumbnails/002/058/031/small_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg";

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const getCategories = async () => {
    try {
      const url = `${endpoints.GET_CATEGORY}`;
      const { response, error } = await getCategory(url);
      if (!error && response.data) {
        setCat(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showEditForm = (project) => {
    setIsEditForm(true);
    setShow(true);
    setPhoto(null);
    setProjectData(project);
  };

  const showAddProjectForm = () => {
    setIsEditForm(false);
    setShow(true);
  };

  // ADD PROJECTS
  const addProject = async () => {
    const formData = new FormData();
    formData.append("project_name", projectData.project_name);
    formData.append("description", projectData.description);
    formData.append("amount", projectData.amount);
    formData.append("end_date", projectData.end_date);
    formData.append("image", projectData.image);
    formData.append("category", projectData.category);

    try {
      const url = `${endpoints.ADD_PROJECT}`;
      const { response, error } = await addProjects(url, formData);
      if (!error && response) {
        toast.success("Project Added Successfully", {
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

        setProjectData({
          project_name: "",
          description: "",
          amount: "",
          category: "",
          end_date: "",
          image: "",
        });
        setShow(false);
        setPhoto(null);
        getProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLE IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setProjectData((prevDetails) => ({
      ...prevDetails,
      image: file, // Ensure 'image' is set to the File object
    }));
  };

  // ADD CATEGORY
  const options = cat.map((category) => ({
    value: category.id,
    label: category.c_name,
  }));

  //CATEGORY CHANGE
  const handleCategoryChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      try {
        const url = endpoints.ADD_CATEGORY;
        const newCategory = { c_name: newValue.label };
        const { response, error } = await addCategory(url, newCategory);
        if (!error && response) {
          const createdCategory = response.data;
          setCat([...cat, createdCategory]);
          setProjectData({ ...projectData, category: createdCategory.id });
        }
      } catch (error) {
        console.error(error);
      }
    } else if (actionMeta.action === "select-option") {
      setProjectData({ ...projectData, category: newValue.value });
    }
  };

  // GET INNOVATOR PROJECTS
  const getProjects = async () => {
    try {
      const url = `${endpoints.GET_INNOVATOR_PROJECTS}`;
      const { response, error } = await getInnovatorProjects(url);
      if (!error && response) {
        setInnovatorProjects(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE PROJECT
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let apiResponse;
    const url = `${endpoints.DELETE_PROJECT}${id}`;
    try {
      apiResponse = await deleteInnovatorProject(url);
      setReload(true);
      toast.success("Project Deleted Successfully", {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setReload(false);
      getCategories();
      getProjects();
    }, 1000);
  }, [reload]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("project_name", projectData.project_name);
    formData.append("description", projectData.description);
    formData.append("amount", projectData.amount);
    formData.append("end_date", projectData.end_date);
    formData.append("category", projectData.category);
    if (projectData.image instanceof File) {
      formData.append("image", projectData.image);
    }

    const url = `${endpoints.EDIT_PROJECT}${projectData.id}`;
    try {
      const result = await editInnovatorProject(url, formData);
      if (!result.error) {
        toast.success("Project Updated Successfully", {
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
        setShow(false);
        getProjects();
      } else {
        toast.error("Failed to update project");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project");
    }
  };

  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>
      <div className="main-div ">
        <Container className="p-lg-5 p-2">
          <h3 className="pt-5 ps-2">Meet The Investors</h3>

          <Row>
            {innovatorProjects.length > 0 ? (
              innovatorProjects.map((project, index) => (
                <Col lg={4} sm={6} className="p-3" key={index}>
                  <Card className="rounded-0 border-0 text-black grey-card">
                    <Dropdown className="text-end">
                      <Dropdown.Toggle
                        style={{
                          textDecoration: "none",
                          backgroundColor: "transparent",
                          color: "black",
                          border: "0",
                          position: "realative",
                        }}
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => showEditForm(project)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => handleDelete(e, project.id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Card.Img
                      src={`http://127.0.0.1:8000/${project.image}`}
                      className="project-image rounded-0 m-0"
                    />
                    <Card.Body className="m-0">
                      <h3 className="project-title bg-white py-3 text-center mx-auto">
                        {project.project_name}
                      </h3>
                      <Card.Text style={{ textAlign: "justify" }}>
                        <h4>{project.description.slice(0, 100)}</h4>
                      </Card.Text>
                      <div className="text-end">
                        <Link to={`/projectview/${project.id}`}>
                          <Button variant="outline-dark rounded-0 ms-auto">
                            <i className="fa-solid fa-arrow-right"></i>
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-danger text-center mt-5">
                <p>
                  <b>No Projects Added Yet ...!</b>
                </p>
              </div>
            )}
          </Row>
          <Button
            onClick={showAddProjectForm}
            variant="outline-dark rounded-0 py-3 px-4"
            className="mx-auto d-flex align-items-center"
          >
            <span className="hidden">
              Add a project&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <i className="fa-solid fa-plus fa-xl"></i>
          </Button>
        </Container>
      </div>

      {/* Add project modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-addproject"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditForm ? "Edit Project" : "Add a new project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5">
          <div>
            <div className="text-center w-100">
              <label style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImage}
                />
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `http://127.0.0.1:8000/${projectData.image}`
                  }
                  alt="Cover Image Upload"
                  height={200}
                  className="border border-black p-3"
                  required
                />
                <p>Cover image (png / jpg)</p>
              </label>
            </div>
            <FloatingLabel label="Project name" className="mb-3">
              <Form.Control
                name="project_name"
                value={projectData.project_name}
                type="text"
                placeholder="Project name"
                maxLength={35}
                className="border-black"
                onChange={handleInput}
              />
            </FloatingLabel>
            <FloatingLabel label="Description" className="mb-3">
              <Form.Control
                name="description"
                value={projectData.description}
                onChange={handleInput}
                as="textarea"
                placeholder="Description"
                className="border-black"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <Row>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="border-black">₹</InputGroup.Text>
                  <FloatingLabel label="Target amount">
                    <Form.Control
                      name="amount"
                      value={projectData.amount}
                      onChange={handleInput}
                      type="number"
                      placeholder="Target amount"
                      className="border-black"
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>
              <Col sm={6}>
              <FloatingLabel label="Duration" className="mb-3">
              <Form.Control
                name="end_date"
                value={projectData.end_date}
                onChange={handleInput}
                type="text"
                maxLength={35}
                placeholder="Duration"
                className="border-black"
              />
            </FloatingLabel>
              </Col>
            </Row>

            <CreatableSelect
              options={options}
              onChange={handleCategoryChange}
              onInputChange={(newValue, actionMeta) => {
                if (actionMeta.action === "input-change") {
                  setInputValue(newValue);
                }
              }}
              placeholder="Select or create category"
            />
          </div>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShow(false)}>
            Close
          </Button>

          {isEditForm ? (
            <Button variant="outline-dark" onClick={handleUpdate}>
              Update Project
            </Button>
          ) : (
            <Button variant="outline-dark" onClick={addProject}>
              Add Project
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default InnovatorProjects;

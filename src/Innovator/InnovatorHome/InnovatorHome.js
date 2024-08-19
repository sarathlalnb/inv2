import React, { useEffect, useState } from "react";
import "./InnovatorHome.css";
import Aside from "../../CommonComponents/Aside/Aside";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { endpoints } from "../../services/defaults";
import { Bounce, ToastContainer, toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import CreatableSelect from "react-select/creatable";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function InnovatorHome() {
  const navObj = [
    { text: "Dashboard", link: "/innovator/home" },
    { text: "My Projects", link: "/innovator/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const [iPreviews, setIPreviews] = useState([]);
  const [vPreviews, setVPreviews] = useState([]);
  const [show, setShow] = useState(false);
  const [cat, setCat] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [projectData, setProjectData] = useState({
    project_name: "",
    description: "",
    amount: "",
    category: "",
    end_date: "",
    image: "",
  });
  const { request: getInnovatorProjects } = useApi("hget");
  const [innovatorProjects, setInnovatorProjects] = useState([]);

  const { request: getCategory } = useApi("get");
  const { request: addCategory } = useApi("post");
  const { request: addProjects } = useApi("mPost");

  const uploadImage =
    "https://static.vecteezy.com/system/resources/thumbnails/002/058/031/small_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg";

  const fetchAsideItems = () => {
    const asideObj = [
      { text: "Home", link: "/", icon: "th-large" },
      { text: "My Projects", link: "/innovator/projects", icon: "columns" },
      { text: "Messages", link: "/innovator/messages", icon: "envelope" },
      { text: "Investors", link: "/innovator/meetInvestors", icon: "envelope" },
    ];

    return <Aside asideObj={asideObj} />;
  };

  useEffect(() => {
    getProjects();
  }, []);

  // GET PROJECTS
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

  // GET CATEGORIES
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

  //HANDLE INPUTS
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
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
      image: file,
    }));
  };

  //ADD CATEGORY
  const options = cat.map((category) => ({
    value: category.id,
    label: category.c_name,
  }));

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      try {
        const url = endpoints.ADD_CATEGORY;
        const newCategory = { c_name: newValue.value };
        const { response, error } = await addCategory(url, newCategory);
        if (!error && response) {
          setCat([...cat, response.data]);
          setProjectData({ ...projectData, category: response.data.id });
        }
      } catch (error) {
        console.error(error);
      }
    } else if (actionMeta.action === "select-option") {
      setProjectData({ ...projectData, category: newValue.value });
    }
  };

  useEffect(() => {
    getCategories();
    getProjects();
  }, []);

  return (
    <>
      <div className="main-grid " style={{ overflowX: "scroll" }}>
        <div> {fetchAsideItems()}</div>
        <div className="p-5">
          <Row>
            <Col lg={4} className="add-project text-center mt-3">
              <h4>Add Project</h4>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
                recusandae Lorem ipsum dolor ament
              </p>
              <button
                onClick={() => setShow(true)}
                className="text-danger"
                style={{ backgroundColor: "transparent", border: "0" }}
              >
                <i class="fa-solid fa-plus"></i> CREATE NEW PROJECT
              </button>
            </Col>
            
             <Col id="col1" className="home-card text-center ">
              <h4 className="">{innovatorProjects.length}</h4>
              <h4 className="">Number of Projects</h4>
            </Col> 
            <Col id="col12" className="home-card text-center ">
            
          </Col> 
          </Row>

          {/* PROJECT LIST */}
          <div className="mt-2">
            <h3>My Projects</h3>
            <br />
            {innovatorProjects.length > 0 ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Target Amount</th>
                      <th>DeadLine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {innovatorProjects.slice(0, 8).map((project) => (
                      <tr key={project.id}>
                        <td>{project.project_name}</td>
                        <td>{project.amount}</td>
                        <td>{project.end_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Link to={"/innovator/projects"}>
                  {" "}
                  <div className="text-end mt-5">
                    <p>
                      View All Projects{" "}
                      <i class="fa-solid fa-arrow-right fa-beat"></i>
                    </p>
                  </div>
                </Link>
              </>
            ) : (
              <div className="text-danger text-center mt-5">
                {" "}
                <p>
                  <b>No Projects Added Yet!</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL FOR ADD PROJECT */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-addproject"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new project</Modal.Title>
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
                  src={photo ? URL.createObjectURL(photo) : uploadImage}
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
                    placeholder="Duration"
                    className="border-black"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <CreatableSelect
              options={options}
              onChange={handleCategoryChange}
              placeholder="Select or create category"
            />
          </div>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="outline-dark" onClick={addProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default InnovatorHome;

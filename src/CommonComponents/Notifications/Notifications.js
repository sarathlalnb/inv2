import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Col, Row } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import "./Notifications.css";
import { Box, IconButton, Button as MuiButton } from "@mui/material";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";

function Notifications() {
  const [open, setOpen] = React.useState(false);
  const { request: getNotification } = useApi("hget");
  const [notifications, setNotifications] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleNotifications = async () => {
    try {
      let apiResponse;
      const url = `${endpoints.GET_NOTIFICATION}`;
      apiResponse = await getNotification(url);
      const { response, error } = apiResponse;
      console.log(apiResponse, "notification");
      if (!error && response) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleNotifications();
  }, []);

  return (
    <div>
      <Badge
        onClick={handleClick}
        className="fs-2 me-4"
        badgeContent={notifications.length}
        color="primary"
      >
        <i class="fa-regular fa-bell"></i>
      </Badge>
      <Snackbar
        className=" snackbar"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        message={
          <>
            {notifications?.map((i, index) => (
              <div key={index}>
                <Row>
                  <Col lg={2}>
                    <Avatar alt="Remy Sharp" src={i.avatar} />
                  </Col>
                  <Col lg={10}>
                    <h6 className="ms-4 mt-2">{i.full_name}</h6>
                    {/* <p>{`${i.content.substring(0, 80)}${
                      i.content.length > 80 ? "..." : ""
                    }`}</p>                     */}
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
            <div className="snackbar-buttons">
              <button className="button p-2" size="small">
                <b> Clear All</b>
              </button>
              <button
                className="button p-2"
                size="small"
                aria-label="close"
                onClick={handleClose}
              >
                <b> Close</b>
              </button>
            </div>
          </>
        }
      />
      <></>
    </div>
  );
}

export default Notifications;

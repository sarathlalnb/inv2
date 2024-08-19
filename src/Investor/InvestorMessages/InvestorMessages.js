import React, { useEffect, useRef, useState } from "react";
import "./InnovatorMessages.css";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Container,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import Header from "../../CommonComponents/Header/Header";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import MessageBubble from "../../CommonComponents/MessageBubble/MessageBubble";
import { CiVideoOn } from "react-icons/ci";

function InvestorMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const { request: getMessages } = useApi("get");
  const [reload, setReload] = useState(false);
  const [msg, setMsg] = useState([]);

  const messagesEndRef = useRef(null);

  // NAV OBJECT
  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/investor/messages" },
  ];

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.get("id"));
    }
  }, [searchParams]);

  const users = [
    { id: 1, name: "Investor1" },
    { id: 2, name: "Investor2" },
    { id: 3, name: "Rich Investor1" },
  ];

  //GET MESSAGES
  const getMessage = async () => {
    try {
      const url = `${endpoints.GET_CHAT_HISTORY}${id}`;
      const { response, error } = await getMessages(url);
      if (!error && response.data) {
        const messages = response.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setMsg(messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage();
    setReload(false);
  }, [reload, id]);

  const handleSelectUser = (id) => {
    setSearchParams({ id });
  };

  const rendAvat = (l, id) => {
    const randomDarkColor = () => {
      const colorList = [
        "#8B4513",
        "#8B0000",
        "#CD853F",
        "#A0522D",
        "#B8860B",
        "#556B2F",
        "#2F4F4F",
        "#483D8B",
        "#228B22",
        "#4B0082",
        "#800000",
        "#8B008B",
        "#556B2F",
        "#556B2F",
        "#6B8E23",
        "#2F4F4F",
        "#483D8B",
        "#8B4513",
        "#8B0000",
        "#CD853F",
        "#A0522D",
        "#B8860B",
        "#556B2F",
        "#2F4F4F",
        "#483D8B",
        "#228B22",
        "#4B0082",
        "#800000",
        "#8B008B",
        "#556B2F",
        "#556B2F",
        "#6B8E23",
        "#2F4F4F",
        "#483D8B",
        "#8B4513",
        "#8B0000",
        "#CD853F",
        "#A0522D",
        "#B8860B",
        "#556B2F",
        "#2F4F4F",
        "#483D8B",
        "#228B22",
        "#4B0082",
        "#800000",
        "#8B008B",
        "#556B2F",
        "#556B2F",
        "#6B8E23",
        "#2F4F4F",
        "#483D8B",
      ];
      return colorList[parseInt(id) % colorList.length];
    };
    const newRandomColor = randomDarkColor();
    return (
      <div
        className="d-flex justify-content-center align-items-center fs-4 fw-bold me-2 rounded-5 p-3"
        style={{
          backgroundColor: newRandomColor,
          height: "30px",
          width: "30px",
        }}
      >
        {l[0]}
      </div>
    );
  };

  //SEND MESSAGE
  const [messageInput, setMessageInput] = useState("");
  const { request: sendMessage } = useApi("post");
  const handleSendMessage = async () => {
    const payload = {
      message: messageInput,
    };
    try {
      const url = `${endpoints.SEND_MESSAGE}${id}`;
      let messageResponse;
      messageResponse = await sendMessage(url, payload);
      let { response, error } = messageResponse;
      if (!error && response) {
        setMessageInput("");
        setReload(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET MESSAGELIST
  const [messageList, setMessageList] = useState([]);
  console.log(messageList);
  const { request: getMessageListInvestor } = useApi("get");
  const handleGetMessageList = async () => {
    try {
      const url = `${endpoints.GET_MESSAGE_LIST_INVESTOR}`;
      let messageListInvestorResponse;
      messageListInvestorResponse = await getMessageListInvestor(url);
      let { response, error } = messageListInvestorResponse;
      if (!error && response) {
        setReload(true);
        setMessageList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetMessageList();
  }, []);

  const navigate = useNavigate();
  const navToVideoCall = () => {
    navigate(`/videocall`);
  };

  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>
      <>
        <div className="msg-grid  bg-dark border  border-dark ">
          <div className="msg-left bg-dark my-3 me-1">
            <div className="d-flex justify-content-between">
              <h3 className="text-light ps-2">Contacts</h3>
              <button className="btn btn-outline-light" onClick={navToVideoCall}>
                <CiVideoOn className="fs-4" />
              </button>
            </div>
            {messageList?.length > 0 ? (
              <ListGroup data-bs-theme="dark" className="rounded-0">
                {messageList.map((i) => (
                  <ListGroup.Item
                    action
                    active={id && i.id == id && "active"}
                    className="border-0 px-lg-1 rounded"
                    variant="flush"
                    key={i.id}
                    onClick={() => handleSelectUser(i.id)}
                  >
                    <div className="d-flex align-items-center my-auto">
                      {rendAvat(i.username, i.id)}
                      <div className="">{i.username}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-secondary">
                {" "}
                You have no contacts! Visit investor's profile to message them.
              </p>
            )}
          </div>
          <div
            className="msg-right bg-light"
            style={{
              position: "relative",
              overflowY: "scroll",
            }}
          >
            <div style={{ overflowY: "scroll", minHeight: "75vh" }}>
              {msg?.length > 0 ? (
                msg.map((item) => (
                  <MessageBubble message={item} own={item.sender != id} />
                ))
              ) : (
                <h4 className="text-center pt-3">
                  Please Select an Innovator to Chat
                </h4>
              )}
            </div>

            <div className="msg-input-box" style={{ width: "68vw" }}>
              <InputGroup
                className="rounded-4"
                style={{ position: "sticky", bottom: "0" }}
              >
                <input
                  className="form-control msg-input  border border-black"
                  placeholder="Type your message here..."
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                  }}
                />
                <Button
                  variant="dark"
                  className="px-4"
                  onClick={handleSendMessage}
                >
                  <i className="fa-regular fa-paper-plane fa-xl"></i>
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default InvestorMessages;

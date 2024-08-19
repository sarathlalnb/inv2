import React, { useState } from "react";


function MessageBubble({ message, own }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: own ? "flex-end" : "flex-start",
        }}
      >
        <div className="messageTop d-flex " style={{ maxWidth: "300px" }}>
          
          <p
            className={
              own
                ? "messageText p-2 bg-success text-white"
                : "messageText p-2 bg-dark text-white"
            }
            style={{ maxWidth: "300px", margin: "10px", borderRadius:"5px" }}
          >
            {message?.message}
          </p>
        </div>

        <div className="messageBottom">
          {/* <p>{format(message?.createdAt)}</p> */}
        </div>
      </div>
    </>
  );
}

export default MessageBubble;
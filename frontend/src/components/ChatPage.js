import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function ChatPage({ currentChat, socket }) {
  const userId = useSelector((state) => state.auth.value.userId);

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMsg, setNewMsg] = useState("");

  useEffect(async () => {
    const response = await axios.post(
      "/api/messages/getmsg",
      {
        from: userId,
        to: currentChat,
      }
    );

    console.log(response.data);

    setMessages(response.data);
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat,
      from: userId,
      msg,
    });
    await axios.post("/api/messages/addmsg", {
      from: userId,
      to: currentChat,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
      console.log('msg')
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    console.log(arrivalMessage)
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{ width: "100%", height: "85vh" }}
      className="mx-auto bg-dark text-light"
    >
      {messages.map((message) => {
        return (
          <div style={{ textAlign: `${message.fromSelf ? "right" : "left"}` }} className = 'mx-4'>
            <p>{message.message}</p>
          </div>
        );
      })}
      <div
        className="row"
        style={{ bottom: "0px", position: "absolute", width: "70%" }}
      >
        <div className="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter The Message"
            style={{ marginLeft: "5px" }}
            onChange={(e) => setNewMsg(e.target.value)}
          />
        </div>
        <div className="col-sm-1">
          <button
            className="btn btn-primary"
            style={{ marginTop: "0px", marginLeft: "5px" }}
            onClick={() => {
              handleSendMsg(newMsg);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

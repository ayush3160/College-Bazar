import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ChatPage from "../components/ChatPage";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";

export default function Chat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const socket = useRef();

  const userId = useSelector((state) => state.auth.value.userId);

  const isLoggedIn = useSelector((state) => state.auth.value.loggedIn);

  const [contacts, setContacts] = useState([]);

  const [currentChat, setCurrentChat] = useState("");

  useEffect(() => {

    if(!isLoggedIn){
        navigate('/login')
    }

    fetch("/api/messages/newChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1: userId,
        user2: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.allChat);
        setContacts(data.allChat);
        setCurrentChat(id);
      });
  }, []);

  useEffect(() => {
    socket.current = io("/");
    socket.current.emit("add-user", userId);
  }, []);

  const handleChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30%" }}>
          <h1 style={{ textAlign: "center" }}>Your Chats</h1>
          {contacts.map((value) => {
            return (
              <div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "15%", width: "60%" }}
                  onClick={() => {
                    handleChat(value._id);
                  }}
                >
                  {value.name}
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ width: "70%" }}>
          {currentChat == "" ? (
            <h1>Welcome Click the user button to chat</h1>
          ) : (
            <ChatPage currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </div>
  );
}

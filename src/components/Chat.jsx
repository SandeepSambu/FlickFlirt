import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socketConnect from "../utils/socket";

const Chat = () => {
  const sender = useSelector((store) => store?.sender);
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const { connectedId } = useParams();
  const user = useSelector((store) => store?.user);
  const userId = user?._id;

  useEffect(() => {
    const socket = socketConnect(userId, connectedId);
    socket.connect();
    socket.emit("join", {});

    const msgListener = ({ name, text }) => {
      if (text.trim().length != 0)
        setMsgs((prevMsgs) => [{ name: name, text: text }, ...prevMsgs]);
    };
    socket.on("recieveMessage", msgListener);

    return () => {
      socket.off("recieveMessage", msgListener);
      socket.disconnect();
    };
  }, [connectedId, userId]);

  const sendMessage = () => {
    const socket = socketConnect(userId, connectedId);
    socket.emit("sendMessage", {
      name: user.firstName,
      text: newMsg,
    });
    setNewMsg("");
  };

  return (
    <div className="border border-neutral-500 p-5 mx-16 my-5 h-[600px] relative">
      <div className="mr-5 flex">
        <figure className="mr-5">
          <img
            src={sender?.photoURL}
            alt="user-photo"
            x
            className="w-[50px] h-[50px] rounded-3xl"
          />
        </figure>
        <h1 className="text-xl pt-2">
          {sender?.firstName} {sender?.lastName}
        </h1>
      </div>
      <div className="w-full bg-neutral-500 h-[1px] mt-3"></div>
      <div className="flex flex-col-reverse absolute bottom-20 w-full h-[420px] overflow-y-auto scrollbar-none">
        {msgs.map((m, index) => {
          const isUserMessage = user?.firstName === m?.name;
          return (
            <div
              key={index}
              className={`flex items-center my-3 h-10 ${
                isUserMessage ? "justify-end mr-10" : "justify-start"
              }`}
            >
              {!isUserMessage && (
                <img
                  className="rounded-full w-10 h-10 mx-2"
                  alt="Tailwind CSS chat bubble component"
                  src={sender?.photoURL}
                />
              )}
              <div className="pb-2">
                <p>{m?.name}</p>
                <p className="bg-neutral-500 px-3 py-1 rounded-full">
                  {m?.text}
                </p>
              </div>
              {isUserMessage && (
                <img
                  className="rounded-full w-10 h-10 mx-2"
                  alt="Tailwind CSS chat bubble component"
                  src={user?.photoURL}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="w-[1360px] h-[1px] bg-neutral-500 bottom-16 absolute">
        <div className="mt-5 flex ">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            className="bg-gray-400 bg-opacity-10 text-white px-2 w-[500px] border border-gray-400 rounded-full"
          />
          <button
            className="bg-blue-600 text-white px-2 py-1 mx-2 rounded-full"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

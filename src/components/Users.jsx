import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Skeleton from "./Skeleton";

const Users = ({ user }) => {
  if (!user)
    return (
      <div className="text-center font-bold text-3xl">
        <Skeleton />
      </div>
    );

  const dispatch = useDispatch();
  const [swipeStyle, setSwipeStyle] = useState({
    transform: "translateX(0) rotate(0deg)",
    transition: "none",
  });
  const [swiped, setSwiped] = useState(false);

  const { _id, firstName, lastName, photoURL, age, gender, about, skills } =
    user;
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwiped(true);
      setSwipeStyle({
        transform: "translateX(-100%) rotate(-30deg)",
        transition: "transform 0.3s ease-out",
      });
      handleSendRequest("ignored", _id);
      setTimeout(() => {
        setSwipeStyle({
          transform: "translateX(0) rotate(0deg)",
          transition: "none",
        });
        setSwiped(false);
      }, 300);
    },
    onSwipedRight: () => {
      setSwiped(true);
      setSwipeStyle({
        transform: "translateX(100%) rotate(30deg)",
        transition: "transform 0.3s ease-out",
      });
      handleSendRequest("interested", _id);
      setTimeout(() => {
        setSwipeStyle({
          transform: "translateX(0) rotate(0deg)",
          transition: "none",
        });
        setSwiped(false);
      }, 300);
    },
    onSwiping: (eventData) => {
      const { deltaX } = eventData;
      if (!swiped) {
        const rotation = (deltaX / 100) * 15;
        const translateX = deltaX;
        const scale = 1 - Math.abs(deltaX) / 500;

        setSwipeStyle({
          transform: `translateX(${translateX}px) rotate(${rotation}deg) scale(${scale})`,
          transition: "none",
        });
      }
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div className="flex justify-center mt-16 mb-5">
      <div
        {...handlers}
        className="card bg-base-300 w-80 shadow-xl"
        style={swipeStyle}
      >
        <figure>
          <img src={photoURL} alt="user-photo" className="h-60 w-full" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h3>{age}</h3>
          <h3>{gender}</h3>
          <h3>{skills.join(", ")}</h3>
          <h3 className="w-64 truncate">{about}</h3>
          <div className="card-actions justify-between my-3">
            <button
              className="btn btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

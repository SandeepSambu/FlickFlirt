import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const Users = ({ user }) => {
  const dispatch = useDispatch();

  if (!user)
    return (
      <div className="text-center font-bold text-3xl">No users found!</div>
    );

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

  return (
    <div className="flex justify-center mt-16 mb-5">
      <div className="card bg-base-300 w-80 shadow-xl">
        <figure>
          <img src={photoURL} alt="user-photo" className="h-60 w-full" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h3>{age}</h3>
          <h3>{gender}</h3>
          <h3>{skills}</h3>
          <h3 className="w-64 truncate">{about}</h3>
          <div className="card-actions justify-between my-3">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
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

Users.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    skills: PropTypes.array,
  }).isRequired,
};

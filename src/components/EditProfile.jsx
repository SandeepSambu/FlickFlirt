import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [about, setAbout] = useState(user.about || "");
  const [edit, setEdit] = useState(false);
  const [toast, setToast] = useState(false);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const handleChanges = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setEdit(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
  };
  return (
    <div className="flex justify-center gap-10">
      {edit && (
        <div className="flex justify-center mt-16 mb-24">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-bold text-2xl justify-center">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">Photo Url</span>
                  </div>
                  <input
                    type="text"
                    value={photoURL}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setPhotoURL(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <h1 className="text-red-500 text-lg">{}</h1>
              </div>
              <div className="card-actions justify-center mt-3">
                <button className="btn btn-primary" onClick={handleChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-16 mb-24">
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure className="h-60">
            <img src={photoURL} alt="user-photo" />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <h3>{age}</h3>
            <h3>{gender}</h3>
            <h3>{skills}</h3>
            <h3>{about}</h3>
            {!edit && (
              <div className="flex justify-center">
                <button
                  className="bg-primary rounded-lg px-5 py-3 text-lg text-black"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      {err && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{"Can't update Profile."}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    skills: PropTypes.array,
  }).isRequired,
};

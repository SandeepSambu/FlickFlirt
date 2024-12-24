import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = isLogin
        ? await axios.post(
            BASE_URL + "/login",
            {
              email,
              password,
            },
            { withCredentials: true }
          )
        : await axios.post(
            BASE_URL + "/signup",
            {
              firstName,
              lastName,
              email,
              password,
              photoURL,
              age,
              gender,
              skills,
              about,
            },
            { withCredentials: true }
          );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex justify-center mt-16 mb-24">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl justify-center">
            {isLogin ? "Login" : "SignUp"}
          </h2>
          <div>
            {!isLogin && (
              <>
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
                      setError("");
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
                      setError("");
                    }}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-3">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs my-3">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </label>
            {!isLogin && (
              <>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label">
                    <span className="label-text">Photo</span>
                  </div>
                  <input
                    type="text"
                    value={photoURL}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setPhotoURL(e.target.value);
                      setError("");
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
                      setError("");
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
                      setError("");
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
                      setError("");
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
                      setError("");
                    }}
                  />
                </label>
              </>
            )}
          </div>
          <div>
            <h1 className="text-red-500 text-lg">{error}</h1>
          </div>
          <div
            className="card-actions justify-center mt-3"
            onClick={handleLogin}
          >
            <button className="btn btn-primary">
              {isLogin ? "SignIn" : "SignUp"}
            </button>
          </div>
          <div className="text-center mt-5">
            <p>
              {isLogin ? "New Here, " : "Have an account, "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "SignUp" : "SignIn"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

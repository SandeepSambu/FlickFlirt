import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/recieve/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
      setSent(true);
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="text-center my-10 font-bold text-3xl">
        No requests found!!!!
      </div>
    );

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="font-bold text-3xl my-10">Requests</div>
        {requests &&
          requests.map((request) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              skills,
              photoURL,
            } = request.fromUserId;
            const requestId = request._id;
            return (
              <div
                key={_id}
                className="flex bg-base-300 shadow-xl w-6/12 h-52 rounded-xl"
              >
                <div className="w-4/12">
                  <figure className="">
                    <img
                      src={photoURL}
                      alt="user-photo"
                      className="h-52 rounded-l-xl"
                    />
                  </figure>
                </div>
                <div className="items-start my-5 w-8/12 flex flex-col justify-between">
                  <div className="">
                    <h1 className="font-bold text-2xl">
                      {firstName + " " + lastName}
                    </h1>
                    <h2>{age}</h2>
                    <h2>{gender}</h2>
                    {about && <h2>{about}</h2>}
                    {skills && <h2>{skills}</h2>}
                  </div>
                  <div className="mt-4 justify-between flex w-full">
                    <button
                      className="bg-green-500 m-2 px-5 py-2 text-black rounded-lg"
                      onClick={() => handleRequest("accepted", requestId)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 m-2 px-5 py-2 text-black rounded-lg mr-10"
                      onClick={() => handleRequest("declined", requestId)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="toast toast-top toast-center">
        {sent && (
          <div className="alert alert-success">
            <span>Request accepted successfully.</span>
          </div>
        )}
        {err && (
          <div className="alert alert-error">
            <span>Request declined successfully.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;

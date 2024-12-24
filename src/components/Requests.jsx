import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);
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
    } catch (err) {
      console.log(err);
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
                className="flex bg-base-300 shadow-xl h-48 rounded-xl mb-5 gap-4"
              >
                <div className="">
                  <figure className="">
                    <img
                      src={photoURL}
                      alt="user-photo"
                      className="h-48 rounded-l-xl"
                    />
                  </figure>
                </div>
                <div className="items-start my-3 flex flex-col">
                  <div className="">
                    <h2 className="font-bold text-2xl my-0.5">
                      {firstName + " " + lastName}
                    </h2>
                    <p className="my-0.5">
                      {age}, {gender}
                    </p>
                    {skills && <p className="my-0.5">{skills.join(", ")}</p>}
                    <div className="w-[500px]">
                      {about && <p className="truncate my-0.5">{about}</p>}
                    </div>
                  </div>
                  <div className="mt-4 justify-between flex w-full">
                    <button
                      className="bg-green-500 px-5 py-2 text-black rounded-lg"
                      onClick={() => {
                        handleRequest("accepted", requestId);
                        setAccept(true);
                        setTimeout(() => setAccept(false), 3000);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 px-5 py-2 text-black rounded-lg mr-10"
                      onClick={() => {
                        handleRequest("declined", requestId);
                        setDecline(true);
                        setTimeout(() => setDecline(false), 3000);
                      }}
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
        {accept && (
          <div className="alert alert-success">
            <span>Request accepted successfully.</span>
          </div>
        )}
        {decline && (
          <div className="alert alert-error">
            <span>Request declined successfully.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;

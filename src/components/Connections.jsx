import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0)
    return (
      <div className="text-center my-10 font-bold text-3xl">
        No connections found!!!!
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-3xl my-10">Connections</div>
      {connections &&
        connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            about,
            skills,
            photoURL,
          } = connection;
          return (
            <div
              key={_id}
              className="flex bg-base-300 shadow-xl w-5/12 h-44 rounded-xl mb-5"
            >
              <div className="mr-5">
                <figure className="">
                  <img
                    src={photoURL}
                    alt="user-photo"
                    className="h-44 rounded-l-xl"
                  />
                </figure>
              </div>
              <div className="items-start my-5">
                <h1 className="font-bold text-2xl mb-2">
                  {firstName + " " + lastName}
                </h1>
                <h2>{age}</h2>
                <h2>{gender}</h2>
                {skills && <h2>{skills.join(", ")}</h2>}
                {about && <h2>{about}</h2>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;

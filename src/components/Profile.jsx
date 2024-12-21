import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const loggedInUser = useSelector((store) => store.user);

  return loggedInUser && <EditProfile user={loggedInUser} />;
};

export default Profile;

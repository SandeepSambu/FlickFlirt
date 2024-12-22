import PropTypes from "prop-types";

const Users = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender, about, skills } = user;
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
          <h3>{about}</h3>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

Users.propTypes = {
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

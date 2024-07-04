import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/navbar.css';

const Navbar = ({ role, setRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    setRole('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <span className="navbar-welcome">Welcome, {role}</span>
      <div className="navbar-links">
        {location.pathname === '/add-data' ? (
          <Link to="/data">Back</Link>
        ) : (
          <Link to="/add-data">Add Data</Link>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default Navbar;

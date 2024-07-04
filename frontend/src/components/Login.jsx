import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/login.css';

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role);
    navigate('/data');
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2>Login</h2>
        <button onClick={() => handleLogin('admin')}>Login as Admin</button> <br />
        <button onClick={() => handleLogin('user')}>Login as User</button>
      </div>
    </div>
  );
};

Login.propTypes = {
  setRole: PropTypes.func.isRequired,
};

export default Login;

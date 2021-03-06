import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Fragment>
      {auth.isAuthenticated ? (
        <Redirect to='profile' />
      ) : (
        <div class='form-page-container'>
          <div class='form-wrapper'>
            <h1 className='text-center m-2'>Login</h1>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  className="input-style"
                  value={email}
                  onChange={(e) => onChange(e)}
                />

                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  minLength='6'
                  className="input-style mb-2"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='justify-content-center'>
                <button type='submit' className='btn btn-main w-100'>
                  Login
                </button>
              </div>
              <p class="mt-2 mb-05 text-secondary">Not got an account? <Link to="/register">Sign Up</Link></p>
              <p class="text-secondary">Forgotten your password? <Link to="/password-reset">Reset Password</Link></p>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);

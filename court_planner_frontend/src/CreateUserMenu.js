import React, {useState} from 'react';
import './CreateUserMenu.css';
import {createUser} from './api/user/createUser';

const CreateUserMenu = ({closeCreateUserMenu, navigateToSignIn}) => {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [verifyPassword, setVerifyPassword] = useState ('');

  const handleSubmit = async e => {
    e.preventDefault ();
    if (password !== verifyPassword) {
      console.log ('Passwords do not match!');
      return; 
    }
    try {
      const response = await createUser ({email, password});
      console.log (response);
    } catch (error) {
      console.error ('Error during user creation:', error);
    }
  };

  return (
    <div
      className="dim-background"
      onClick={e => {
        e.stopPropagation ();
      }}
    >
      <div className="create-user-window">
        <button className="close-button" onClick={closeCreateUserMenu}>
          X
        </button>
        <p>Create your user</p>
        <div className="new-user-text">
          Already have an account?{' '}
          <span
            className="log-in-link"
            onClick={navigateToSignIn}
            style={{cursor: 'pointer', textDecoration: 'underline'}}
          >
            Log in
          </span>
        </div>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <input
            className="email"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={e => setEmail (e.target.value)}
            required
          />
          <input
            className="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword (e.target.value)}
            required
          />
          <input
            className="verify-password"
            placeholder="Verify password"
            type="password"
            value={verifyPassword}
            onChange={e => setVerifyPassword (e.target.value)}
            required
          />
          <button className="create-account-button" type="submit">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateUserMenu;

import React from 'react';
import {Redirect} from "react-router-dom"

import auth from "../../services/auth";

const NotFound = () => {
  return auth.isAuthenticated ? <Redirect to="/profile" /> : <Redirect to="/" />
};

export default NotFound;

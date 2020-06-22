import React, {useState, useEffect} from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {

  function WithAuthentication({firebase}) {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
        ? setAuthUser(authUser.email)
        : setAuthUser(null)
        });
        console.log("authUser:", authUser)
      });
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...firebase} />
      </AuthUserContext.Provider>
      );
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;

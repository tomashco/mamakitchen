import React, {useState, useContext, useEffect} from 'react';
import FirebaseContext from './firebaseContext'; //da sistemare!

export const userContext = React.createContext({
  user: null,
})

export const useAuth = () => {
  const firebase = useContext(FirebaseContext)
  const [state, setState] = useState(() => {

    //const user = firebase.auth.currentUser
    const user = firebase.auth.onAuthStateChanged(authUser => authUser ? authUser.email : null )
    return {
      initializing: !user,
      user,
      }
    })
    function onChange(user) {
      setState({ initializing: false, user })
    }

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth.onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [firebase])

  return state
}

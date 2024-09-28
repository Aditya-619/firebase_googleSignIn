import { useState, useEffect } from "react";
import { auth, provider } from "./config/firebase"; // Ensure this is the correct path
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import Task from "./component/Task.jsx";

function App() {
  const [authState, setAuthState] = useState(() => {
    return window.localStorage.getItem('auth') === 'true';
  });
  const [token, setToken] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, provider);
      if (userCred) {
        window.localStorage.setItem('auth', 'true');
        setAuthState(true);
        const idToken = await userCred.user.getIdToken();
        setToken(idToken);
      }
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem('auth');
      setAuthState(false);
      setToken(null);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        window.localStorage.setItem('auth', 'true');
        setAuthState(true);
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        window.localStorage.removeItem('auth');
        setAuthState(false);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {authState ? (
        <>
          <Task token={token} />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Login with Google</button>
      )}
    </>
  );
}

export default App;

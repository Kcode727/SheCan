import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignIn from './signin.jsx'
import Home from './home.jsx';
import './App.css'

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <>
      {signedIn ? <Home /> : <SignIn onSignIn={() => setSignedIn(true)} />}
    </>
  );
}


export default App

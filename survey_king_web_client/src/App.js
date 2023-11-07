import './App.css';
import {Login} from './pages/Login'
import {Home} from "./pages/Home";
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const logIn = () => {
        setUserLoggedIn(true);
    }

    function logOut() {
        setUserLoggedIn(false);
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path=""
                        element={<Home userLoggedIn={userLoggedIn}/>}
                    />
                    <Route
                        path="/login"
                        element={<Login logIn={logIn}/>}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;

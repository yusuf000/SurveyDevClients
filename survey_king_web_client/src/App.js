import './App.css';
import {Login} from './pages/Login'
import {Home} from "./pages/Home";
import {Register} from "./pages/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home/>}
                    />
                    <Route
                        path="/login"
                        element={<Login/>}
                    />
                    <Route
                        path="/register"
                        element={<Register/>}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;

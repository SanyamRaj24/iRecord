import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Router >
      </NoteState>
    </>
  );
}

export default App;

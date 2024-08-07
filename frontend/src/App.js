import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useEffect } from "react";
import { assignUser, getUser } from "./contexts_store/reducer/user";
import readToken from "./utils/useReadToken";
import { useDispatch, useSelector } from "react-redux";
import AllDebates from "./pages/AllDebates";
import ThisDebate from "./pages/ThisDebate";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage.js"

function App() {
  const user = useSelector(getUser);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(assignUser(readToken()));
    //console.log(user);
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/debates" element={<AllDebates />} />
        <Route path="/thisdebate/:id" element={<ThisDebate />} />
        <Route path="/signup" element={!user ? (<Signup />) : (<Navigate to="/" />)} />
        <Route path="/login" element={!user ? (<Login />) : (<Navigate to="/" />)} />
        <Route path="/profile" element={!user ? (<Navigate to="/login" />) : (<ProfilePage />)} />
      </Routes>
    </div>
  );
}

export default App;

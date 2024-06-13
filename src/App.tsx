import { Route, Routes } from "react-router-dom";
import Profile from "./screens/Profile";
import Dashboard from "./screens/Dashboard";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendUserDetailsToStore } from "./store/slices/userSlice";

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = () => {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          dispatch(sendUserDetailsToStore({ user: result[0] }));
        })
        .catch((err) => {
          toast.error("Error fetching users");
        });
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

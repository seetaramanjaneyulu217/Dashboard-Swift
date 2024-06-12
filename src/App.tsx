import { Route, Routes } from "react-router-dom";
import Profile from "./screens/Profile";
import Dashboard from "./screens/Dashboard";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
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

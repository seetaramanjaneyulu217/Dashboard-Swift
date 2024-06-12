import { Route, Routes } from "react-router-dom";
import Profile from "./screens/Profile";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

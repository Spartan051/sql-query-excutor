import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/template/sidebar";
import Connections from "./components/routes/connections";
import Queries from "./components/routes/queries";
import Forms from "./components/routes/forms"
import Dashboard from "./components/routes/dashboard";


function App() {
  return (
    <>
    
<main className="flex">
<Sidebar />
    <Routes>
      <Route path="/connections" element={<Connections />} />
      <Route path="/queries" element={<Queries />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </main>
    </>
  );
}

export default App;

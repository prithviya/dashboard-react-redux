
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardComponent from './Component/Dashboard';
import PatientComponent from './Component/Patient'

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/" element={<PatientComponent />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

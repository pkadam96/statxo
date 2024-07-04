import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DataTable from './components/DataTable';
import AddRecordForm from './components/AddRecordForm';
import Navbar from './components/Navbar';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [data, setData] = useState([]);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  const handleAddRecord = (newRecord) => {
    setData(prevData => [...prevData, newRecord]);
  };

  return (
    <div>
      <Router>
        <div>
          {role && <Navbar role={role} setRole={setRole} />}
          <Routes>
            <Route path="/" element={<Login setRole={setRole} />} />
            <Route path="/data" element={<DataTable role={role} data={data} setData={setData} />} />
            <Route path="/add-data" element={<AddRecordForm onAdd={handleAddRecord} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

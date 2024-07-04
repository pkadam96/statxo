import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/addRecordForm.css';

const AddRecordForm = ({ onAdd }) => {

  const initialState = {
    quantity: '',
    amount: '',
    actionName: 'Action 1',
    actionType: 'Type A',
    actionNumber: '',
    Impact: 'Low',
    status: 'Pending'
  }

  const [newRecord, setNewRecord] = useState(initialState);

  const handleChange = e => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const recordToSubmit = {
      ...newRecord,
      postingYear: new Date().getFullYear(),
      postingMonth: new Date().toLocaleString('default', { month: 'long' }),
    };
    const response = await axios.post('https://statxo-4sgv.onrender.com/api/data', recordToSubmit);
    onAdd(response.data.newData);
    alert("Data Added Successfully !!!");
    setNewRecord(initialState);
  };

  return (
    <div className='add-data-container'>
      <form onSubmit={handleSubmit}>
        <h2>Add New Record</h2>
        <div>
          <input type="number" name="quantity" placeholder='Quantity' value={newRecord.quantity} onChange={handleChange} required />
        </div>
        <div>
          <input type="number" name="amount" placeholder='Amount' value={newRecord.amount} onChange={handleChange} required />
        </div>
        <div>
          <input type="text" name="actionNumber" placeholder='Action Number' value={newRecord.actionNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Action Name</label>
          <select name="actionName" value={newRecord.actionName} onChange={handleChange}>
            <option value="Action 1">Action 1</option>
            <option value="Action 2">Action 2</option>
            <option value="Action 3">Action 3</option>
          </select>
        </div>
        <div>
          <label>Action Type</label>
          <select name="actionType" value={newRecord.actionType} onChange={handleChange}>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
          </select>
        </div>
        <div>
          <label>Impact</label>
          <select name="impact" value={newRecord.impact} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={newRecord.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

AddRecordForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddRecordForm;

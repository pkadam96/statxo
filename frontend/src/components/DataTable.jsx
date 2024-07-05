import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/dataTable.css';

const DataTable = ({ role, data, setData }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [updatedIds, setUpdatedIds] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios.get('https://statxo-4sgv.onrender.com/api/data');
        setData(result.data);
    };

    useEffect(() => {
        setEditedData(data);
    }, [data]);

    const handleEdit = (id, field, value) => {
        const updatedData = editedData.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setEditedData(updatedData);

        if (!updatedIds.includes(id)) {
            setUpdatedIds([...updatedIds, id]);
        }
    };

    const handleSave = async () => {
        await axios.put('https://statxo-4sgv.onrender.com/api/data', editedData);
        setEditMode(false);

        const updatedRecords = editedData.filter(item => updatedIds.includes(item.id));
        const nonUpdatedRecords = editedData.filter(item => !updatedIds.includes(item.id));
        const newData = [...updatedRecords, ...nonUpdatedRecords];

        setData(newData);
        setUpdatedIds([]);
    };

    return (
        <div className="datatable-container">
            <h2>Data Table</h2>
            <div className='table-wrapper'>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Posting Year</th>
                            <th>Posting Month</th>
                            <th>Action Name</th>
                            <th>Action Type</th>
                            <th>Action Number</th>
                            <th>Impact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedData.map(row => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.quantity}</td>
                                <td>
                                    {editMode ? (
                                        <input type="number" value={row.amount} onChange={e => handleEdit(row.id, 'amount', e.target.value)} />
                                    ) : (row.amount)}
                                </td>
                                <td>{row.postingYear}</td>
                                <td>{row.postingMonth}</td>
                                <td>
                                    {editMode ? (
                                        <select value={row.actionName} onChange={e => handleEdit(row.id, 'actionName', e.target.value)} >
                                            <option value="Action 1">Action 1</option>
                                            <option value="Action 2">Action 2</option>
                                            <option value="Action 3">Action 3</option>
                                        </select>
                                    ) : (row.actionName)}
                                </td>
                                <td>
                                    {editMode ? (
                                        <select value={row.actionType} onChange={e => handleEdit(row.id, 'actionType', e.target.value)} >
                                            <option value="Type 1">Type 1</option>
                                            <option value="Type 2">Type 2</option>
                                            <option value="Type 3">Type 3</option>
                                        </select>
                                    ) : (row.actionType)}
                                </td>
                                <td>{row.actionNumber}</td>
                                <td>{row.Impact}</td>
                                <td>
                                    {editMode && role === 'admin' ? (
                                        <select value={row.status} onChange={e => handleEdit(row.id, 'status', e.target.value)}>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Approved">Approved</option>
                                        </select>
                                    ) : (row.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="data-table-actions">
                <button onClick={() => setEditMode(!editMode)}>
                    {editMode ? 'Cancel' : 'Edit'}
                </button>
                {editMode && <button onClick={handleSave}>Save</button>}
            </div>
        </div>
    );
};

DataTable.propTypes = {
    role: PropTypes.oneOf(['admin', 'user']).isRequired,
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
};

export default DataTable;

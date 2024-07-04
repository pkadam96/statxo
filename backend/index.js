const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

let data = [
  {
    id: 1, quantity: 100, amount: 100, postingYear: 2020, postingMonth: 'January',
    actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status:
      'Pending', Impact: "High"
  },
  {
    id: 2, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType:
      'Type2', actionNumber: '001', actionName: 'Action2', status: 'Pending', Impact: "Mid"
  },
  {
    id: 3, quantity: 120, amount: 100, postingYear: 2020, postingMonth: 'January',
    actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status:
      'Pending', Impact: "Low"
  },
  {
    id: 4, quantity: 132, amount: 100, postingYear: 2020, postingMonth: 'January',
    actionType: 'Type3', actionNumber: '001', actionName: 'Action3', status:
      'Pending', Impact: "High"
  },
  {
    id: 5, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType:
      'Type2', actionNumber: '001', actionName: 'Action3', status: 'Pending', Impact: "Low"
  },
];


app.get('/', (req, res) => {
  res.send("server is running !!!!!");
});

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.put('/api/data', (req, res) => {
  const updatedData = req.body;

  updatedData.forEach(item => {
    const index = data.findIndex(d => d.id === item.id);
    if (index !== -1) {
      data[index] = item;
    }
  });

  res.json({ message: 'Data updated successfully' });
});

app.post('/api/data', (req, res) => {
  const newData = req.body;
  const currentDate = new Date();
  const postingYear = currentDate.getFullYear();
  const postingMonth = currentDate.toLocaleString('default', { month: 'long' });

  newData.id = data.length + 1;
  newData.postingYear = postingYear;
  newData.postingMonth = postingMonth;
  data.push(newData);
  res.json({ message: 'New record added successfully', newData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

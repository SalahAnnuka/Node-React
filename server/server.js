const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Define route to handle data sent from the client
app.post('/api/saveUserData', (req, res) => {
    const userData = req.body;
  
    // Read existing user data from the JSON file
    fs.readFile('./json/users.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Parse existing user data
      let users = [];
      if (data) {
        try {
          users = JSON.parse(data);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
      }
  
      // Add new user data to the array
      users.push(userData);
  
      // Write updated user data back to the file
      fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        console.log('Data saved successfully');
        res.status(200).json({ message: 'Data saved successfully' });
      });
    });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

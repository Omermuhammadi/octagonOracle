const express = require('express');
const app = express();
const port = 5000;

// Basic route
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
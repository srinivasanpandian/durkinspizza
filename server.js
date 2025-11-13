const express = require('express');
const prerender = require('prerender-node');
const path = require('path');

// Set Prerender token (required)
prerender.set('prerenderToken', '63GIOd8cXk4djS1KyRyD');

const app = express();
const PORT = process.env.PORT || 3000;

// Use Prerender middleware BEFORE your routes that serve SPA
app.use(prerender);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Prerender middleware is active with token: 63GIOd8cXk4djS1KyRyD`);
});


const express = require("express");
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');


// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontreactesttech.onrender.com'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.get('/api/directoryToTree/:dir/:maxDepth', (req, res) => {
    res.json(directoryToTree(decodeURIComponent(req.params.dir), req.params.maxDepth));
  });

// Start the server
app.listen(port, () => {
    console.log(`Running`);
  });




  function directoryToTree(rootPath, maxDepth) {
    rootPath = rootPath;
    console.log(rootPath);
    return buildTree(rootPath, maxDepth);
  }
  
  function buildTree(currentPath, remainingDepth) {
    const stats = fs.statSync(currentPath);
    const nodeName = path.basename(currentPath);
    const nodeType = stats.isDirectory() ? 'dir' : 'file';
  
    const node = {
      path: currentPath,
      name: nodeName,
      type: nodeType,
      size: stats.size 
    };
  
    if(nodeType === 'dir'){
      node.children = [];
    }
    if (nodeType === 'dir' && remainingDepth > 0) {
      node.children = fs.readdirSync(currentPath).map(child => {
        const childPath = path.join(currentPath, child);
        return buildTree(childPath, remainingDepth - 1);
      });
    }
  
    return node;
  }
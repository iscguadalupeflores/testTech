import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// TreeView component to render nodes recursively
const TreeView = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <ul>
      {data.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

// TreeNode component to render a single node and its children
const TreeNode = ({ node }) => {
  const hasChildren = node.children && node.children.length > 0;
  let text = "Path: " + node.path +", Name: " +  node.name + ", Type: " +  node.type + ", Size: " +  node.size;
  return (
    <li>
      {text}
      {hasChildren && <TreeView data={node.children} />}
    </li>
  );
};



function App() {
  const [path, setPath] = useState("");
  const [maxDepth, setMaxDepth] = useState(0);
  const [jsonResult, setJsonResult] = useState({});

  const loadJson = async () => {
    let response = await fetch("https://testtech-4erh.onrender.com/api/directoryToTree/" + path + "/" + maxDepth);
    let json = await response.json();
    setJsonResult(json);
  }

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <th>
            <td>Directorio</td>
            <td><input type="text" placeholder="p.ejem: dummy_dir" onChange={(event) => {
              setPath(event.target.value);
            }} /></td>
            <td>Profundidad</td>
            <td><input type="number" placeholder="p.ejem: 1" min="0" onChange={(event) => {
              setMaxDepth(event.target.value);

            }} /></td>
            <td><button onClick={loadJson}>Explorar</button></td>
          </th>
        </table>

        <div>
          <TreeView data={[jsonResult]} />
        </div>
      </header>
    </div>
  );
}

export default App;

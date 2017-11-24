import React from 'react';

import DiffView from 'react-diff-view';

export default class Examples extends React.PureComponent {

  render() {
    const baseText = `
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Bug\\n');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
    `
    const newText = `
import http = from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\\n');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
    `
    return (<div>
      <h2>
        <a href = "https://github.com/wmzy/react-diff-view/blob/master/example/app/src/ExamplePage.js" className = "right" >
          <code > &lt; Source &gt; </code>
        </a> Example 
      </h2>

      <DiffView baseText={ baseText } newText={ newText } />
    </div>);
  }
}
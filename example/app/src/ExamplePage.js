import React from 'react';

import DiffView from 'react-diff-view';

export default class Examples extends React.PureComponent {

  state = {
    baseText: `const http = require('http');

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
    `,
    newText: `import http = from 'http';

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
    `,
  }

  handleBaseTextChange = e => {
    this.setState({ baseText: e.target.value })
  }

  handleNewTextChange = e => {
    this.setState({ newText: e.target.value })
  }

  render() {
    const { baseText, newText } = this.state;
    return (<div>
      <h2>
        <a href = "https://github.com/wmzy/react-diff-view/blob/master/example/app/src/ExamplePage.js" className = "right" >
          <code > &lt; Source &gt; </code>
        </a> Example 
      </h2>

      <div>
        <form>
          <label>
            baseText:
            <textarea rows={16} cols={87} value={baseText} onChange={this.handleBaseTextChange} />
          </label>
          <label>
            newText:
            <textarea rows={16} cols={87} value={newText} onChange={this.handleNewTextChange} />
          </label>
        </form>
      </div>
      <DiffView baseText={ baseText } newText={ newText } />
    </div>);
  }
}
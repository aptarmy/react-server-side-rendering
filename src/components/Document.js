import React, { Component, Fragment } from 'react';

export default class Document extends Component {
  render() {
    return(
      <Fragment>
        <h1>How Server Side Rendering works in React (with redux and router)</h1>
  			<p>The idea is to help client render on server. We will grab built index.html file from build folder and inject html code.</p>
  			<ul>
  			  <li>Make Node.js understand ES6 and React syntax using @babel/register (take a look at /server/bootstrap.js)</li>
  			  <li>Make Redux works on server : Import redux store on server, render on server, and also pass state to client via window.__PRELOADED_STATE__. Client with NODE_ENV = production will use __PRELOADED_STATE__ instead of importing store module.</li>
  			  <li>Make Router works on server : Replace &lt;BrowserRouter /&gt; with &lt;StaticRouter /&gt; on server</li>
  			  <li>Add support for SEO : by using Helmet to manage &lt;title&gt; and &lt;meta&gt; (take a look at /server/renderer.js)</li>
  			  <li>Render client code on server : Search and replace text in index.html build from React using Using ReactDOM.server.renderToString()</li>
  			  <li>Tell React Client that index.html was rendered by server using ReactDOM.hydrate() method, instead of ReactDOM.render()</li>
  			  <li>Recommended : Client app should be able to handle client-side-rendering and server-side-rendering by checking process.env.NODE_ENV (take a look at /src/index.js)</li>
  			</ul>
  		</Fragment>
    );
  }
}
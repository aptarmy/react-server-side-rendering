import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import { store } from '../../src/store';
import pageDetailActions from '../../src/actions/pageDetail';
import App from '../../src/App';

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {

  // point to the html file created by create-react-app's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  	fs.readFile(filePath, 'utf8', (err, htmlData) => {
  	if (err) {
    	console.error('err', err);
    	return res.status(404).end();
  	}

 		// ======================================
    // ==       Deal with SEO Step 1       ==
    // ======================================
    // update state in order for Helmet to know what Title and Description to use
    // req.url : can only be with or without trailing slash, no multiple trailing slash, can contain query string, but cannnot contain hash sign
    // remove query string from url
    const pathname = req.url.split("?")[0];
    // dispatch current pathname
    store.dispatch(pageDetailActions.update(pathname));
    console.log(store.getState().pageDetail.title);

    // =====================================
    // ==   Deal with Router and Redux    ==
    // =====================================
    
  	// used to check <Redirect /> component in client
  	const context = {};

		// render the app as a string
  	const app = ReactDOMServer.renderToString(
  	 <Provider store={store}>
  	   {/*on server, we will use StaticRouter instead of BrowserRouter*/}
    	 <StaticRouter location={req.url} context={context}>
    	   <App />
    	 </StaticRouter>
      </Provider>
  	);
  	
  	// if our app has <Redirect /> component, mimic the behavior on the server
  	if(context.url) {
  	  return res.redirect(context.url)
  	}
  	
  	// preloaded redux state to populate in client
  	const preloadedState = store.getState();
  	
  	// populate preloaded redux state to client
  	htmlData = htmlData.replace(
  	  "</body>",
  	   `<script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>
      </body>`
    );

  	// inject the rendered app into our html and send it
		htmlData = htmlData.replace(
  		'<div id="root"></div>',
   		`<div id="root">${app}</div>`
 		);
 		
 		// ======================================
    // ==       Deal with SEO Step 2       ==
    // ======================================
    // inject Title and Description with the help from Helmet
    // prevent server memory leak cause by Helmet. Read documentation at https://github.com/nfl/react-helmet#server-usage
    const helmet = Helmet.renderStatic();
    // Helmet knows title and meta, because it gets data from <Helmet /> component in /src/components/Header.js
    const title = helmet.title.toString();
    const meta = helmet.meta.toString();
    // Replace <title> with helmat's <title>
    htmlData = htmlData.replace(/<title[^>]*>[^<]*<\/title>/ig, title);
    // add <meta> tag after <title>
    htmlData = htmlData.replace('</title>', `</title>${meta}`);

    // return rendered data to client 		
 		return res.send(htmlData);
 		
	});
};
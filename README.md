# Create React App server-side rendering example

This example supports Redux, React Router v.4, and also supports SEO using Helmet.

## To run this example

- run `npm run start` to test client side rendering. React client will check `process.env.NODE_ENV`,
if it is in `development` mode, then render entirely in client using `ReactDOM.render()` method.
- run `npm run build` to prepare build files. Now process.env.NDOE_ENV will be `production` mode, which
React client will render using `ReactDOM.hydrate()` method.
- run `npm run start:server` to start server-side rendering. Express will grab the build file `index.html`
from build folder, which produced by React in `npm run build` step, inject HTML code to it,
and finally send HTML code to client.

## For morinformatnion

Run this example in your local machine to see how it works. Application code contains full documentation
and a lot of comments.
const pageDetails = [
  {
    url: '/',
    title: 'Welcome To Home Page | Server Side Rendering',
    description: 'This home page was rendered on the server'
  },
  {
    url: '/about-us',
    title: 'About Us | Server Side Rendering',
    description: 'This About Us page was rendered on the server'    
  }
];

const defaultState = {
  title: 'React App Serverside Rendering',
  description: 'This meta tag will be rendered with Helmet'
};

const notFoundState = {
  title: 'Page Not Found',
  description: 'Something went wrong. The page you are looking for has been moved or deleted.'
}

const pageDetailsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case "PAGE_DETAILS_UPDATE":
      // action.payload : can only be with or without trailing slash, no query string, and no hash sign
      // detail : can only be undefined (in case, it couldn't find detail) or object
      const detail = pageDetails.find(detail => {
        // RegExp to test url
        const regExpString = `^${detail.url}/*$`;
        return RegExp(regExpString).test(action.payload);
      });
      // if couldn't find pageDetail, fallback the notFoundState
      if(detail) {
        state.title = detail.title;
        state.description = detail.description;
      } else {
        state = notFoundState;
      }
      return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
};

export default pageDetailsReducer;
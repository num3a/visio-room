import ReactGA from 'react-ga';

const LogPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  console.log('log page view');
};

export default LogPageView;

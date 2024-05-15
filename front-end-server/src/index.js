import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { RecoilRoot } from "recoil";
// import recoilPersist from "recoil-persist";




// const { RecoilPersist, updateState } = recoilPersist([], {
//   key: "recoil-persist",
//   storage: sessionStorage,
// }); 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <RecoilRoot initializeState={updateState}>
    // <RecoilPersist />
    <App />
  // </RecoilRoot>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
  // "@testing-library/jest-dom": "^5.17.0",
  // "@testing-library/react": "^13.4.0",
  // "@testing-library/user-event": "^13.5.0",
  // "antd": "^4.4.0",
  // "react": "^18.1.0",
  // "react-dom": "^18.1.0",
  // "react-router": "^5.2.0",
  // "react-router-dom": "^5.2.0",
  // "react-scripts": "^5.0.1",
  // "react-scroll-to-bottom": "^4.2.0",
  // "react-stomp": "^5.0.0",
  // "recoil": "0.0.10",
  // "sockjs-client": "^1.4.0"
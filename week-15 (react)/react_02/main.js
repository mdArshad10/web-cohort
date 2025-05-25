
import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
const App = () => {
  return React.createElement(
    "h1",
    {},
    "This is the My first react component without installing react"
  );
};

const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));

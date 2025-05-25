console.log("this is react");

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

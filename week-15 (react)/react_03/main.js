import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

const Anime = (prop) => {
  return React.createElement("div", {}, [
    React.createElement("h3", {}, prop.name),
    React.createElement("p", {}, prop.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Your Favorite Anime"),
    React.createElement(Anime, {
      name:"your name",
      description:"My First Anime"
    }),
    React.createElement(Anime, {
      name:"Demon Slayer",
      description:"Most Actionable Anime"
    }),
  ]);
};

const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));

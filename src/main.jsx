import { createRoot } from "react-dom/client";
import { loadRouter, myRouter } from "./config/route";
import { RouterProvider } from 'react-router';


// const router = await loadRouter();

createRoot(document.getElementById("root")).render(
  <RouterProvider router={myRouter} />,
);

// index.js
import microApp from '@micro-zoe/micro-app'

microApp.start()

// index.js
window.unmount = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}
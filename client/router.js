import {createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const Comp = (await import("./views/home/index.js")).default;
      return {Component: Comp}
    },
    children: [
      {
        path: '/demo1',
        lazy: async () => {
          const Comp = (await import("./views/demo1/index.js")).default;
          return {Component: Comp}
        }
      },
      {
        path: '/demo2',
        lazy: async () => {
          const Comp = (await import("./views/demo2/index.js")).default;
          return {Component: Comp}
        }
      },
      {
        path: '/demo3',
        lazy: async () => {
          const Comp = (await import("./views/demo3/index.js")).default;
          return {Component: Comp}
        }
      },
    ]
  },
], {
  basename: '/sub-react-new'
});

export default router;

import { createBrowserRouter } from "react-router-dom";
import { ModelPage } from "./catalog/pages/model";
import { Layout } from "./components/layout";
import { Models } from "./catalog/pages/models";

export const router = createBrowserRouter([
  {
    path: '/models/:id',
    element: (
      <Layout configuratorMode>
        <ModelPage />
      </Layout>
    )
  },
  {
    path: '/',
    element: (
      <Layout>
        <Models />
      </Layout>
    )
  },
], {
  basename: import.meta.env.VITE_PREFIX,
});

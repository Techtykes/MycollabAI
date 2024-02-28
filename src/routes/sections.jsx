import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
// NEW PAGE
export const ChatPage = lazy(() => import('src/pages/chat'));
// NEW PAGE
export const ImageTextPage = lazy(() => import('src/pages/imageText'));
// NEW PAGE
export const AddBotPage = lazy(() => import('src/pages/addbot'));
export const SharePages = lazy(() => import('src/pages/SharePage'));


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'Bot', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        
        { path: 'chat/*', element: <ChatPage /> },
        { path: 'image_to_text', element: <ImageTextPage /> },// new page
        { path: 'add_bot', element: <AddBotPage /> },// new page
        // eslint-disable-next-line react/jsx-no-undef
                { path: "share/:botId" , element: <SharePages /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
       {
      path: 'add_bot',
      element: <AddBotPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

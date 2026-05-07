import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// HOC for Lazy Loading with Suspense
const Loadable = (Component: React.LazyExoticComponent<any>) => (props: any) => (
  <Suspense fallback={<div className="p-8 text-center text-neutral-500">Loading component...</div>}>
    <Component {...props} />
  </Suspense>
);

import NotFound from '../layouts/NotFound';

// Pages
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const AppButtonPage = Loadable(lazy(() => import('../pages/app-button')));
const InputTextFieldPage = Loadable(lazy(() => import('../pages/input-text-field')));
const DatePickerPage = Loadable(lazy(() => import('../pages/date-picker')));

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'components',
          children: [
            {
              path: 'buttons',
              element: <AppButtonPage />,
            },
            {
              path: 'inputs',
              element: <InputTextFieldPage />,
            },
            {
              path: 'date-picker',
              element: <DatePickerPage />,
            },
          ]
        }
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

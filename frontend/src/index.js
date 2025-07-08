import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import { action as rootAction } from './components/Header';
import Registration, { action as registrationAction } from './routes/Registration';
import Login, { action as loginAction, loader as loginLoader } from './routes/Login';
import ErrorPage from './routes/ErrorPage';
import Information from './routes/Information';
import UserInterface, { loader as userLoader } from './routes/UserInterface';
import PersonInfo, { loader as personLoader } from './routes/PersonInfo';
import AdminInterface, { loader as adminLoader } from './routes/AdminInterface';
import Download, { loader as downloadLoader } from './routes/Download';
import AccountCard, { loader as accountCardLoader } from './routes/AccountCard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Login />,
            action: loginAction,
            loader: loginLoader,
          },
          {
            path: 'registration',
            element: <Registration />,
            action: registrationAction,
          },
          {
            path: 'siteinfo',
            element: <Information />,
          },
          {
            path: 'user',
            element: <UserInterface />,
            loader: userLoader,
          },
          {
            path: 'person_info',
            element: <PersonInfo />,
            loader: personLoader,
          },
          {
            path: 'admin',
            element: <AdminInterface />,
            loader: adminLoader,
          },
          {
            path: 'download/:params',
            element: <Download />,
            loader: downloadLoader,
          },
          {
            path: 'user_card/:params',
            element: <AccountCard/>,
            loader: accountCardLoader,
          },
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
);

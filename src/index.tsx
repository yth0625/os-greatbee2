import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/style/reset.css';
import './assets/style/common.css';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from 'pages/Home/Home';
import SignUp from 'pages/Auth/SignUp';
import SignIn from 'pages/Auth/SignIn';
import App from 'App';
import Admin from 'pages/Admin/Admin';
import Account from 'pages/Admin/Account/Account';
import WorkFlow from 'pages/Workflow/Workflow';
import Notice from 'pages/Notice/Notice';
import Authority from 'pages/Admin/Authority/Authority';
import GeneralAffairs from 'pages/GeneralAffairs/GeneralAffairs';
import QuickService from 'pages/GeneralAffairs/quick/quickService';
import ParcelStatus from 'pages/GeneralAffairs/parcelStatus/parcelStatus';

import QuickServiceRequest from './pages/GeneralAffairs/quickServiceRequest/QuickServiceRequest';
import CourierReservation from './pages/GeneralAffairs/CourierReservation';

import { QueryClient, QueryClientProvider } from 'react-query';
import Assets from 'pages/Admin/Assets/Assets';
import PurchaseManagement from 'pages/Admin/PurchaseManagement/PurchaseManagement';
import VehicleUpdate from 'pages/Admin/VehicleUpdate/VehicleUpdate';
import Eprocurement from './pages/Eprocurement/Eprocurement';
import { RecoilRoot } from 'recoil';
import Contract from 'pages/Admin/Contract/Contract';
import Organization from 'pages/Admin/Organization/Organization';
import PriceInfo from 'pages/Auth/PriceInfo';
import FreeTrial from 'pages/Auth/FreeTrial';
import Cart from './pages/Eprocurement/Cart';
import PurchaseHistory from 'pages/Admin/PurchaseHistory/PurchaseHistory';
import Order from 'pages/Eprocurement/Order';
import ProductInfo from 'pages/Eprocurement/component/utility/popup/product/ProductInfo';
import FinePW from 'pages/Auth/FindPW';
import TryApp from 'pages/Auth/TryApp';
import VehicleReservation from 'pages/GeneralAffairs/VehicleReservation';
import MeetingRoomReservation from 'pages/GeneralAffairs/MeetingRoomReservation';
import SeatingChart from 'pages/GeneralAffairs/SeatingChart';

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: '/admin', element: <Admin /> },
      { path: '/admin/purchase', element: <PurchaseManagement /> },
      { path: '/admin/purchasehistory', element: <PurchaseHistory /> },
      { path: '/eprocurement', element: <Eprocurement /> },
      { path: '/eprocurement/cart', element: <Cart /> },
      { path: '/eprocurement/order', element: <Order /> },
      { path: '/eprocurement/product/:id', element: <ProductInfo /> },
      // { path: '/notice', element: <Notice /> },
      // { path: '/admin/contract', element: <Contract /> },
      // { path: '/admin/organization', element: <Organization /> },
      // { path: '/admin/account', element: <Account /> },
      // { path: '/admin/assets', element: <Assets /> },
      // { path: '/admin/authority', element: <Authority /> },
      // { path: '/workflow', element: <WorkFlow /> },
      { path: '/GeneralAffairs', element: <GeneralAffairs /> },
      { path: '/GeneralAffairs/parcel-status', element: <ParcelStatus /> },
      {
        path: '/GeneralAffairs/quick-service-status',
        element: <QuickService />,
      },
      {
        path: '/generalaffairs/courierReservation',
        element: <CourierReservation />,
      },
      {
        path: 'generalaffairs/vehicleReservation',
        element: <VehicleReservation/>
      },
      {
        path: 'generalaffairs/meetingRoomReservation',
        element: <MeetingRoomReservation/>
      },
      {
        path: 'generalaffairs/seatingChart',
        element: <SeatingChart/>
      },
      { path: '/generalaffairs/vehicleUpdate', element: <VehicleUpdate /> },
    ],
  },
  {
    path: 'signIn',
    element: <SignIn />,
  },
  {
    path: 'signUp',
    element: <SignUp />,
  },
  { path: 'findPW', element: <FinePW /> },
  { path: 'tryApp', element: <TryApp /> },
  // { path: 'priceInfo', element: <PriceInfo /> },
  // { path: 'freetrial', element: <FreeTrial /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

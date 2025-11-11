import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import ReceiptPage from '../pages/ReceiptPage'
import ReviewPage from '../pages/ReviewPage'
import SettingPage from '../pages/SettingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/detail',
    element: <DetailPage />,
  },
  {
    path: '/receipt',
    element: <ReceiptPage />,
  },
  {
    path: '/review',
    element: <ReviewPage />,
  },
  {
    path: '/setting',
    element: <SettingPage />,
  },
])

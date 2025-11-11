import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import ReceiptPage from '../pages/ReceiptPage'
import ReviewPage from '../pages/ReviewPage'
import SettingPage from '../pages/SettingPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path='/detail'
        element={<DetailPage />}
      />
      <Route
        path='/receipt'
        element={<ReceiptPage />}
      />
      <Route
        path='/review'
        element={<ReviewPage />}
      />
      <Route
        path='/setting'
        element={<SettingPage />}
      />
    </Routes>
  )
}

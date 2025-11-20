import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import FirstPage from '../pages/FirstPage'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import ReceiptPage from '../pages/ReceiptPage'
import ReviewPage from '../pages/ReviewPage'
import SettingPage from '../pages/SettingPage'
import Review_result from '../pages/Review_result'
import SearchPage from '../pages/SearchPage'

export default function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait' >
      <Routes
        location={location}
        key={location.pathname}>
        <Route
          path='/'
          element={<FirstPage />}
        />
        <Route
          path='/home'
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
          path='/review_result'
          element={<Review_result />}
        />
        <Route
          path='/review'
          element={<ReviewPage />}
        />
        <Route
          path='/setting'
          element={<SettingPage />}
        />
        <Route
          path='/search'
          element={<SearchPage />}
        />
      </Routes>
    </AnimatePresence>
  )
}

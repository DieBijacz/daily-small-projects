import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomeScreen from '../Screens/HomeScreen'
import AboutScreen from '../Screens/AboutScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
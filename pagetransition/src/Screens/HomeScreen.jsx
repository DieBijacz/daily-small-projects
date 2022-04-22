import React from 'react'
import { motion } from 'framer-motion'

const HomeScreen = () => {
  return (
    <motion.div className="content" initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '100%' }} transition={{ duration: .2 }}>
      <h3>Home 💨</h3>
      Official Masta Development Wabsite
    </motion.div>
  )
}

export default HomeScreen
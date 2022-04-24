import React from 'react'
import { motion } from 'framer-motion'

const HomeScreen = () => {
  return (
    <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .1 }}>
      <h3>Home 💨</h3>
      Official Masta Development Wabsite
    </motion.div>
  )
}

export default HomeScreen
import React from 'react'
import { motion } from 'framer-motion'

const AboutScreen = () => {
  return (
    <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .1 }}>
      <h3>About Section</h3>
    </motion.div>
  )
}

export default AboutScreen
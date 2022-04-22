import React from 'react'
import { motion } from 'framer-motion'

const ProfileScreen = () => {
  return (
    <motion.div className="content" initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '100%' }} transition={{ duration: .2 }}>
      <h3>Profile</h3>
    </motion.div>
  )
}

export default ProfileScreen
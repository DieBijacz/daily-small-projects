import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from '../Components/Modal'

const ProfileScreen = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)

  return (
    <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .1 }}>
      <h3>Profile</h3>
      <motion.button className='save-button' onClick={() => (modalOpen ? close() : open())} whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}>LUNCHER</motion.button>
      <AnimatePresence exitBeforeEnter initial={false} onExitComplete={() => null}>
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} variant={1} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProfileScreen
import { Message } from 'ai';
import React from 'react'
import MessageBox from './messagebox';
import { motion } from 'framer-motion';

type Props = {
  messages: Message[];
  isLoading: boolean;
}

const Messages = ({ messages, isLoading }: Props) => {
  return (
    <motion.div 
      className='flex flex-col space-y-4'
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {messages.map((m, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <MessageBox role={m.role} content={m.content} />
        </motion.div>
      ))}
      {isLoading && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <MessageBox role="assistant" content="Thinking..." />
        </motion.div>
      )}
    </motion.div>
  )
}

export default Messages


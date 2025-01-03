'use client'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const features = [
  "Automates Repetitive Tasks",
  "Sentiment-Based Task Prioritization",
  "AI-Powered Knowledge Base",
  "Multilingual and Real-Time Transcription",
  "Role-Specific Dashboards",
  "Enhanced Workflow Transparency",
]

export default function Feature() {
  return (
    <motion.section 
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Key Features of SentriAI
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              </motion.div>
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}


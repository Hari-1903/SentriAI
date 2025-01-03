'use client'
import { motion } from 'framer-motion'

const footerColumns = ['Products', 'Solutions', 'Resources']
const footerLinks = ['Link 1']

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">SentriAI</h3>
            <p className="text-sm text-gray-400">
              Transforming BPO workflows with AI-powered solutions.
            </p>
          </motion.div>
          {footerColumns.map((column, index) => (
            <motion.div
              key={column}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{column}</h4>
              <ul className="space-y-2">
                {footerLinks.map((link, linkIndex) => (
                  <motion.li 
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (linkIndex * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href="#" 
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} SentriAI. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  )
}


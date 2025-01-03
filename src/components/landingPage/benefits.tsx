'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BarChart, Globe, Users, Zap, Layers } from 'lucide-react'

const products = [
  {
    title: "AI-Powered Knowledge Base",
    description: "Provides instant access to accurate information through a centralized knowledge repository.",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Sentiment-Based Prioritization",
    description: "Analyzes client sentiment to identify urgency and prioritize tasks dynamically.",
    icon: BarChart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Multilingual Support",
    description: "Converts speech to text in real time across multiple languages, ensuring accessibility for diverse users.",
    icon: Globe,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Role-Specific Dashboards",
    description: "Tailored dashboards for clients, operators, and administrators provide role-specific tools, metrics, and insights.",
    icon: Users,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Automated Workflows",
    description: "Streamlines routine tasks like callbacks, ticket updates, and follow-ups, freeing employees to focus on high-priority responsibilities.",
    icon: Zap,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Enhanced Transparency",
    description: "Tracks task progress, logs, and performance metrics in real time, offering a clear view of operations.",
    icon: Layers,
    color: "bg-indigo-100 text-indigo-600",
  },
]

export default function Benefits() {
  return (
    <motion.section 
      className="py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How SentriAI Makes Work Easier
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full overflow-hidden">
                <CardHeader>
                  <motion.div 
                    className={`w-12 h-12 rounded-full ${product.color} flex items-center justify-center mb-4`}
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <product.icon className="w-6 h-6" />
                  </motion.div>
                  <CardTitle className='text-lg'>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-base'>
                  <p>{product.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}


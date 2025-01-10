"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { AnimatePresence } from 'framer-motion'

const faqs = [
    {
        question: "How can I track the progress of my complaint?",
        answer: "You can track the progress of your complaint by logging into your dashboard and viewing the 'My Complaints' section, which displays the current status and updates."
      },
      {
        question: "What are the operating hours for customer support?",
        answer: "Our customer support team is available 24/7 to assist you with any queries or concerns."
      },
      {
        question: "Can I raise multiple complaints at once?",
        answer: "Yes, you can raise multiple complaints simultaneously. Each complaint will be assigned a unique ID for easy tracking and resolution."
      },
      {
        question: "How do I update a complaint after submission?",
        answer: "You can update your complaint by navigating to the 'My Complaints' section, selecting the complaint, and clicking on 'Edit Details.'"
      },
      {
        question: "What types of issues can I report through the dashboard?",
        answer: "You can report technical issues, service disruptions, feature requests, and any other concerns related to our platform or services."
      },
      {
        question: "How is complaint priority determined?",
        answer: "Complaint priority is determined based on the nature of the issue, its impact, and sentiment analysis conducted by our AI system."
      },
      {
        question: "How long does it take to resolve a complaint?",
        answer: "Resolution times vary depending on the complexity of the issue, but our team strives to address all complaints within 24-48 hours."
      },
      {
        question: "Can I provide feedback on resolved complaints?",
        answer: "Yes, you can provide feedback on resolved complaints by rating the resolution and leaving comments in the 'Feedback' section of your dashboard."
      },
      {
        question: "What should I do if I encounter an urgent issue?",
        answer: "For urgent issues, raise a 'High Priority' complaint in the dashboard, and our system will prioritize it for immediate action."
      },
      {
        question: "How do I contact customer support directly?",
        answer: "You can contact customer support directly through the 'Contact Us' section in your dashboard or via our toll-free helpline."
      }      
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#3267FF] transition-transform duration-200 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

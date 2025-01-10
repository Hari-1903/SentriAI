'use client'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'


export default function Hero() {
  return (
    <section className="bg-gray-900 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-sm uppercase tracking-wider mb-2 text-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              BUILD SOMETHING BIGGER
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Intelligence Redefined for BPO&apos;s workflow
              <br />
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Innovative, AI-powered solution tailored to address critical challenges in workflow management and enhance Customer satisfaction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg">
                Sign Up
              </Button>
            </Link>
            </motion.div>
          </motion.div>
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            <Image src={'/team.svg'} layout="fill" objectFit="contain" alt='j' />
          </div>
        </div>
      </div>
    </section>
  )
}


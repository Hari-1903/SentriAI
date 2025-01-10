'use client'
import { useState } from 'react'
import { motion} from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="container mx-auto px-8 py-5 flex justify-between items-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Image src="/logo.png" alt="search" width={115} height={115} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
        <Link href="/login">
          <Button className='text-md bg-white text-gray-900 font-bold hover:bg-slate-200 hover:scale-105 hover:transition-transform'> 
            Login
          </Button>
        </Link>
        </motion.div>
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>
  )
}


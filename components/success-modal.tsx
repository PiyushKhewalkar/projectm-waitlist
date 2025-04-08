"use client"

import { useState, useEffect } from "react"
import { X, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  onClose: () => void
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Small delay to allow for animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Allow time for exit animation
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div
        className={`bg-[#0D0D14] border border-gray-800 rounded-xl max-w-md w-full p-6 shadow-xl transition-all duration-300 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-white">Thank You!</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-4">
          <p className="text-gray-300 mb-6">
            You've successfully joined our waitlist! We'll notify you when we launch.
          </p>

          <div className="bg-[#1A1A2E] p-4 rounded-lg mb-6">
            <p className="text-gray-300 mb-3">Follow my journey building MarketingAI and get exclusive updates:</p>

            <Button
              onClick={() => window.open("https://x.com/piyushkkr", "_blank")}
              className="w-full bg-[#1DA1F2] hover:bg-[#1a94e0] text-white flex items-center justify-center gap-2"
            >
              <Twitter className="h-5 w-5" />
              Follow @piyushkkr on X
            </Button>
          </div>

          <div className="text-center">
            <button onClick={handleClose} className="text-[#9D6EFF] hover:text-[#8A5DF2] text-sm font-medium">
              Close this message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X, AlertCircle } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for exit animation
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center p-4 mb-4 max-w-xs text-sm rounded-lg shadow transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        type === "success"
          ? "bg-[#1A2E1A] text-green-200 border border-green-800/30"
          : "bg-[#2E1A1A] text-red-200 border border-red-800/30"
      }`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3">
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400" />
        )}
      </div>
      <div className="text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-gray-800/50"
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

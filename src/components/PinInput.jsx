import React, { useState, useRef, useEffect } from 'react'

// Input component with proper forwardRef
const Input = React.forwardRef(({ className = "", type = "text", maxLength, value, onChange, onKeyDown, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

function PinInput({ onComplete }) {
  const [pins, setPins] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])

  const handleChange = (index, value) => {
    if (value.length > 1) return

    const newPins = [...pins]
    newPins[index] = value
    setPins(newPins)

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if all pins are filled
    if (newPins.every((pin) => pin !== "")) {
      onComplete(newPins.join(""))
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="flex gap-2 justify-center">
      {pins.map((pin, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="password"
          maxLength={1}
          value={pin}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-bold border-emerald-300 focus:border-emerald-500"
        />
      ))}
    </div>
  )
}

export default PinInput
import { useState } from 'react'
import PinInput from './PinInput'

// UI Components adapted for the project
function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function Button({ children, onClick, variant = "default", className = "", disabled = false, type = "button", ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-gray-300 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  }
  
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} h-10 py-2 px-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Input({ className = "", type = "text", placeholder, value, onChange, onBlur, min, step, rows, ...props }) {
  const baseClasses = "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  
  if (type === 'textarea') {
    return (
      <textarea
        rows={rows || 3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${baseClasses} resize-none ${className}`}
        {...props}
      />
    )
  }
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      min={min}
      step={step}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  )
}

function Label({ children, htmlFor, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}

function Alert({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-blue-50 border-blue-200 text-blue-800",
    destructive: "bg-red-50 border-red-200 text-red-800"
  }
  
  return (
    <div className={`p-3 rounded-md border ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

// Icons
const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const DollarSign = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
)

const MessageSquare = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

function TransferModal({ open, onOpenChange, onTransfer, currentBalance }) {
  const [step, setStep] = useState("form")
  const [payTag, setPayTag] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [recipient, setRecipient] = useState("")
  const [error, setError] = useState("")
  const [pinAttempts, setPinAttempts] = useState(0)

  // Mock recipient lookup
  const mockRecipients = {
    "@sarah_j": "Sarah Johnson",
    "@mike_c": "Mike Chen",
    "@lisa_w": "Lisa Wong",
    "@john_d": "John Doe",
    "@emma_s": "Emma Smith",
  }

  const handlePayTagLookup = () => {
    if (!payTag.startsWith("@")) {
      setError("PayTag must start with @")
      return
    }

    const foundRecipient = mockRecipients[payTag.toLowerCase()]
    if (foundRecipient) {
      setRecipient(foundRecipient)
      setError("")
    } else {
      setError("User not found")
      setRecipient("")
    }
  }

  const handleNext = () => {
    const transferAmount = Number.parseFloat(amount)

    if (!recipient) {
      setError("Please find a valid recipient")
      return
    }

    if (!amount || transferAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (transferAmount > currentBalance) {
      setError("Insufficient balance")
      return
    }

    setError("")
    setStep("confirm")
  }

  const handleConfirm = () => {
    setStep("pin")
  }

  const handlePinSubmit = (pin) => {
    // Mock PIN validation (correct PIN is "123456")
    if (pin === "123456") {
      setStep("success")
      setTimeout(() => {
        onTransfer({
          type: "sent",
          amount: Number.parseFloat(amount),
          recipient,
          payTag,
          memo: memo || undefined,
        })
        handleClose()
      }, 2000)
    } else {
      const newAttempts = pinAttempts + 1
      setPinAttempts(newAttempts)

      if (newAttempts >= 3) {
        setError("Too many incorrect attempts. Transaction capability temporarily locked.")
        setTimeout(() => {
          handleClose()
        }, 3000)
      } else {
        setError(`Incorrect PIN. ${3 - newAttempts} attempts remaining.`)
      }
    }
  }

  const handleClose = () => {
    setStep("form")
    setPayTag("")
    setAmount("")
    setMemo("")
    setRecipient("")
    setError("")
    setPinAttempts(0)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-emerald-700">
            {step === "form" && "Send Money"}
            {step === "confirm" && "Confirm Transfer"}
            {step === "pin" && "Enter PIN"}
            {step === "success" && "Transfer Successful"}
          </h2>
        </div>

        {step === "form" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payTag" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Recipient PayTag
              </Label>
              <div className="flex gap-2">
                <Input
                  id="payTag"
                  placeholder="@username"
                  value={payTag}
                  onChange={(e) => setPayTag(e.target.value)}
                  onBlur={handlePayTagLookup}
                />
                <Button variant="outline" onClick={handlePayTagLookup} className="border-emerald-600 text-emerald-600">
                  Find
                </Button>
              </div>
              {recipient && <div className="text-sm text-emerald-600 font-medium">✓ {recipient}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Amount (฿)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
              <div className="text-xs text-gray-500">
                Available balance: ฿{currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Memo (Optional)
              </Label>
              <Input
                id="memo"
                type="textarea"
                placeholder="What's this for?"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={2}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                {error}
              </Alert>
            )}

            <Button
              onClick={handleNext}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={!recipient || !amount}
            >
              Continue
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <Card className="border-emerald-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <div className="text-right">
                    <div className="font-medium">{recipient}</div>
                    <div className="text-sm text-gray-500">{payTag}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-emerald-700">
                    ฿{Number.parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {memo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memo:</span>
                    <span className="text-right max-w-[200px]">{memo}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("form")} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConfirm} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Confirm
              </Button>
            </div>
          </div>
        )}

        {step === "pin" && (
          <div className="space-y-4">
            <div className="text-center">
              <Lock className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600">Enter your 6-digit PIN to authorize this transfer</p>
            </div>

            <PinInput onComplete={handlePinSubmit} />

            {error && (
              <Alert variant="destructive">
                {error}
              </Alert>
            )}

            <div className="text-xs text-gray-500 text-center">For demo purposes, use PIN: 123456</div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-emerald-700">Transfer Successful!</h3>
              <p className="text-gray-600">
                ฿{Number.parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} sent to {recipient}
              </p>
            </div>
          </div>
        )}

        {/* Close button for all steps except success */}
        {step !== "success" && (
          <div className="mt-4 pt-4 border-t">
            <Button 
              onClick={handleClose}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransferModal
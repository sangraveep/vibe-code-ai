import { useState } from 'react'
import ESlip from './ESlip'

// UI Components (adapted for React)
function Dialog({ children, open, onOpenChange }) {
  if (!open) return null
  
  // Handle clicking outside the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  )
}

function DialogContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function DialogHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-gray-200 text-gray-700"
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

function Button({ children, onClick, variant = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2"
  
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-gray-300 hover:bg-gray-50"
  }
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Icons (simple SVG replacements)
const ArrowUpRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
)

const ArrowDownLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M7 17H17M7 17V7" />
  </svg>
)

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const Share = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

export default function TransactionDetails({ transaction, open, onOpenChange }) {
  const [showESlip, setShowESlip] = useState(false)

  // Add null check at the top
  if (!transaction || !transaction.status) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-700 flex items-center gap-2">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "sent" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {transaction.type === "sent" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4" />
                )}
              </div>
              Transaction Details
            </DialogTitle>
          </DialogHeader>

          <Card className="border-emerald-200">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${transaction.type === "sent" ? "text-red-600" : "text-emerald-600"}`}
                >
                  {transaction.type === "sent" ? "-" : "+"}฿
                  {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <Badge
                  variant={transaction.status === "completed" ? "default" : "secondary"}
                  className={transaction.status === "completed" ? "bg-emerald-100 text-emerald-700 mt-2" : "mt-2"}
                >
                  {transaction.status}
                </Badge>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">{transaction.type === "sent" ? "To:" : "From:"}</span>
                  <div className="text-right">
                    <div className="font-medium">{transaction.recipient}</div>
                    <div className="text-sm text-gray-500">{transaction.payTag}</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <div className="text-right">
                    <div>{transaction.date}</div>
                    <div className="text-sm text-gray-500">{transaction.time}</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm">{transaction.id}</span>
                </div>

                {transaction.memo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memo:</span>
                    <span className="text-right max-w-[200px]">{transaction.memo}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowESlip(true)}
              className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              <Download className="h-4 w-4 mr-2" />
              E-Slip
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              onClick={() => {
                // Handle share functionality
                if (navigator.share) {
                  navigator.share({
                    title: 'Transaction Details',
                    text: `Transaction ${transaction.id} - ${transaction.type === 'sent' ? 'Sent' : 'Received'} ฿${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                  })
                } else {
                  // Fallback for browsers that don't support Web Share API
                  navigator.clipboard.writeText(`Transaction ${transaction.id} - ${transaction.type === 'sent' ? 'Sent' : 'Received'} ฿${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`)
                }
              }}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ESlip 
        transaction={transaction} 
        open={showESlip} 
        onOpenChange={setShowESlip} 
      />
    </>
  )
}
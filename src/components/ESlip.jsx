import { useRef } from 'react'

// UI Components
function Dialog({ open, onOpenChange, children }) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

function DialogContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}

function Card({ children, className = "", ...props }) {
  return <div className={`bg-white rounded-lg shadow-sm border ${className}`} {...props}>{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Icons
const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

function ESlip({ transaction, open, onOpenChange }) {
  const slipRef = useRef(null)

  // Add null check
  if (!transaction || !transaction.status) {
    return null
  }

  const handleDownload = async () => {
    if (!slipRef.current) return

    try {
      // In a real app, you'd use html2canvas or similar library
      // For demo purposes, we'll just show an alert
      alert("E-Slip would be downloaded as an image in a real implementation")
    } catch (error) {
      console.error("Failed to generate E-Slip:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-emerald-700">Digital Receipt (E-Slip)</DialogTitle>
        </DialogHeader>

        <Card ref={slipRef} className="bg-white border-2 border-emerald-200">
          <CardContent className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-emerald-600 mb-2">PayWise</div>
              <div className="text-sm text-gray-600">Digital Receipt</div>
            </div>

            {/* Status */}
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-emerald-700">
                Transfer {transaction.status === "completed" ? "Completed" : "Pending"}
              </div>
            </div>

            {/* Amount */}
            <div className="text-center mb-6 p-4 bg-emerald-50 rounded-lg">
              <div className="text-3xl font-bold text-emerald-700">
                ฿{transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono">{transaction.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">{transaction.type === "sent" ? "To:" : "From:"}</span>
                <div className="text-right">
                  <div>{transaction.recipient}</div>
                  <div className="text-gray-500">{transaction.payTag}</div>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{transaction.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span>{transaction.time}</span>
              </div>

              {transaction.memo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Memo:</span>
                  <span className="text-right">{transaction.memo}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t text-center text-xs text-gray-500">
              <div>Thank you for using PayWise</div>
              <div>Generated on {new Date().toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700">
          <Download className="h-4 w-4 mr-2" />
          Download E-Slip
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ESlip
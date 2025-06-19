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
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
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

export default function TransactionHistory({ open, onOpenChange, transactions, onSelectTransaction }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-700">Transaction History</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border border-emerald-100 hover:bg-emerald-50 cursor-pointer transition-colors"
              onClick={() => {
                onSelectTransaction(transaction)
                onOpenChange(false)
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    transaction.type === "sent" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {transaction.type === "sent" ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="font-semibold">{transaction.recipient}</div>
                  <div className="text-sm text-gray-500">{transaction.payTag}</div>
                  {transaction.memo && <div className="text-sm text-gray-400 mt-1">{transaction.memo}</div>}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {transaction.date} at {transaction.time}
                    </span>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                      className={transaction.status === "completed" ? "bg-emerald-100 text-emerald-700" : ""}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-lg font-bold ${transaction.type === "sent" ? "text-red-600" : "text-emerald-600"}`}
                >
                  {transaction.type === "sent" ? "-" : "+"}฿
                  {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-500">ID: {transaction.id.slice(-8)}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
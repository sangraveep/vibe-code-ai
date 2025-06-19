import { Routes, Route, Link } from 'react-router'
import { useState } from 'react'
import './App.css'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Profile from './components/Profile'
import ESlip from './components/ESlip'
import PinInput from './components/PinInput'
import TransactionDetails from './components/TransactionDetails'
import TransactionHistory from './components/TransactionHistory'
import TransferModal from './components/TransferModal'
import ReceiveModal from './components/ReceiveModal'

// UI Components (adapted for React)
function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>
}

function CardHeader({ children, className = "" }) {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>
}

function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

function Button({ children, onClick, variant = "default", size = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md"
  }
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Icons (simple SVG replacements for lucide-react)
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

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const History = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

function IndexPage() {
  const [showTransfer, setShowTransfer] = useState(false)
  const [showReceive, setShowReceive] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showESlip, setShowESlip] = useState(false)
  const [eSlipTransaction, setESlipTransaction] = useState(null)

  // User data for receive modal
  const userData = {
    name: "John Doe",
    payTag: "@john_doe"
  }

  // Convert transactions to state
  const [transactions, setTransactions] = useState([
    {
      id: "TXN001234567890",
      type: "sent",
      amount: 1250.0,
      recipient: "Sarah Johnson",
      payTag: "@sarah_j",
      memo: "Lunch split",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
    },
    {
      id: "TXN001234567891",
      type: "received",
      amount: 500.0,
      recipient: "Mike Chen",
      payTag: "@mike_c",
      memo: "Movie tickets",
      date: "2024-01-14",
      time: "19:45",
      status: "completed",
    },
    {
      id: "TXN001234567892",
      type: "sent",
      amount: 2000.0,
      recipient: "Lisa Wong",
      payTag: "@lisa_w",
      memo: "Rent payment",
      date: "2024-01-13",
      time: "09:15",
      status: "completed",
    },
  ])

  const balance = 15750.5

  const handleNewTransfer = (transfer) => {
    const newTransaction = {
      ...transfer,
      id: `TXN${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      status: "completed",
    }
    setTransactions((prev) => [newTransaction, ...prev])
    setShowTransfer(false)
  }

  const recentTransactions = transactions.slice(0, 3)

  const handleTransactionClick = (transaction) => {
    // Add null check
    if (transaction && transaction.status) {
      setSelectedTransaction(transaction)
    }
  }

  const handleViewESlip = (transaction) => {
    // Add null check
    if (transaction && transaction.status) {
      setESlipTransaction(transaction)
      setShowESlip(true)
      setSelectedTransaction(null) // Close transaction details modal
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      {/* Header */}
      <div className="text-white px-6 py-8" style={{ backgroundColor: 'var(--color-web-green-600)' }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">PayWise</h1>
              <p className="text-sm" style={{ color: 'var(--color-web-green-100)' }}>Fast, Simple & Secure P2P Transfers</p>
            </div>
            <Link 
              to="/profile"
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors duration-200"
            >
              <User className="h-5 w-5 text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-white rounded-xl card-shadow overflow-hidden">
          <div className="text-white px-6 py-4" style={{ backgroundColor: 'var(--color-web-green-500)' }}>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Account Balance</span>
            </div>
          </div>
          <div className="px-6 py-6">
            <div className="text-3xl font-bold mb-6" style={{ color: 'var(--color-neutral-900)' }}>
              ฿{balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowTransfer(true)} 
                className="btn-primary flex-1 h-12"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Send Money
              </Button>
              <Button
                onClick={() => setShowReceive(true)}
                className="btn-secondary flex-1 h-12"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Receive Money
              </Button>
            </div>
            <div className="flex gap-3 mt-3">
              <Button
                onClick={() => setShowHistory(true)}
                className="btn-secondary w-full h-12"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <History className="h-4 w-4 mr-2" />
                View History
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl card-shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-neutral-900)' }}>Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              className="flex flex-col items-center gap-3 p-6 rounded-lg transition-colors duration-200"
              style={{ 
                border: '2px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-lg)'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = 'var(--color-web-green-300)'
                e.target.style.backgroundColor = 'var(--color-web-green-50)'
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = 'var(--color-neutral-200)'
                e.target.style.backgroundColor = 'transparent'
              }}
              onClick={() => setShowTransfer(true)}
            >
              <ArrowUpRight className="h-8 w-8" style={{ color: 'var(--color-web-green-600)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-neutral-700)' }}>Send Money</span>
            </button>
            <button
              className="flex flex-col items-center gap-3 p-6 rounded-lg transition-colors duration-200"
              style={{ 
                border: '2px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-lg)'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = 'var(--color-web-green-300)'
                e.target.style.backgroundColor = 'var(--color-web-green-50)'
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = 'var(--color-neutral-200)'
                e.target.style.backgroundColor = 'transparent'
              }}
              onClick={() => setShowReceive(true)}
            >
              <ArrowDownLeft className="h-8 w-8" style={{ color: 'var(--color-web-green-600)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-neutral-700)' }}>Receive Money</span>
            </button>
            <button
              className="flex flex-col items-center gap-3 p-6 rounded-lg transition-colors duration-200"
              style={{ 
                border: '2px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-lg)'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = 'var(--color-web-green-300)'
                e.target.style.backgroundColor = 'var(--color-web-green-50)'
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = 'var(--color-neutral-200)'
                e.target.style.backgroundColor = 'transparent'
              }}
              onClick={() => setShowHistory(true)}
            >
              <Eye className="h-8 w-8" style={{ color: 'var(--color-web-green-600)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-neutral-700)' }}>Transaction History</span>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl card-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-neutral-900)' }}>Recent Transactions</h3>
            <button
              onClick={() => setShowHistory(true)}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--color-web-green-600)' }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-web-green-700)'}
              onMouseOut={(e) => e.target.style.color = 'var(--color-web-green-600)'}
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-200"
                style={{ 
                  border: '1px solid var(--color-neutral-200)',
                  borderRadius: 'var(--radius-lg)'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-neutral-100)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => handleTransactionClick(transaction)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-full"
                    style={{ 
                      backgroundColor: transaction.type === "sent" 
                        ? 'var(--color-error)' + '20' 
                        : 'var(--color-success)' + '20'
                    }}
                  >
                    {transaction.type === "sent" ? (
                      <ArrowUpRight className="h-4 w-4" style={{ color: 'var(--color-error)' }} />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" style={{ color: 'var(--color-success)' }} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--color-neutral-900)' }}>{transaction.recipient}</div>
                    <div className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>{transaction.payTag}</div>
                    {transaction.memo && <div className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>{transaction.memo}</div>}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="font-semibold"
                    style={{
                      color: transaction.type === "sent" ? 'var(--color-error)' : 'var(--color-success)'
                    }}
                  >
                    {transaction.type === "sent" ? "-" : "+"}฿
                    {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>{transaction.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal placeholders - These would need full modal components */}
      <TransferModal
        open={showTransfer}
        onOpenChange={setShowTransfer}
        onTransfer={handleNewTransfer}
        currentBalance={balance}
      />

      {/* Receive Money Modal */}
      <ReceiveModal
        open={showReceive}
        onOpenChange={setShowReceive}
        userPayTag={userData.payTag}
        userName={userData.name}
      />

      {/* Use TransactionHistory component instead of basic modal */}
      <TransactionHistory 
        open={showHistory}
        onOpenChange={setShowHistory}
        transactions={transactions}
        onSelectTransaction={(transaction) => {
          setSelectedTransaction(transaction)
          setShowHistory(false)
        }}
      />

      {/* Use TransactionDetails component instead of basic modal */}
      <TransactionDetails 
        transaction={selectedTransaction}
        open={!!selectedTransaction}
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
      />

      {/* ESlip Modal */}
      <ESlip
        transaction={eSlipTransaction}
        open={showESlip}
        onOpenChange={setShowESlip}
      />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App

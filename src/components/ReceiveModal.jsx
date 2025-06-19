import { useState } from 'react'

// UI Components
function Dialog({ open, onOpenChange, children }) {
  if (!open) return null
  
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
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto relative my-4">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

function DialogContent({ children, className = "" }) {
  return <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
}

function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function Button({ children, onClick, variant = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4"
  
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

// Icons
const QrCode = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6 4 4 0 015.356-.55M21 10.5V18a3 3 0 01-3 3h-7.5M21 10.5L11.5 21M12 9H3V3h6l3 3z" />
  </svg>
)

const Copy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const Share = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

// Mock QR Code component with actual QR code image
function QRCodeDisplay({ value, size = 160 }) {
  // Create a mock QR code using a data URL (this creates a simple pattern that looks like a QR code)
  const createMockQRCode = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const qrSize = 200;
    canvas.width = qrSize;
    canvas.height = qrSize;
    
    // Fill background white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, qrSize, qrSize);
    
    // Create QR code pattern
    ctx.fillStyle = '#000000';
    const moduleSize = qrSize / 25; // 25x25 grid
    
    // Generate a mock QR code pattern based on the value
    const pattern = value.split('').map(char => char.charCodeAt(0)).join('');
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const shouldFill = (parseInt(pattern.charAt((i * j + i + j) % pattern.length)) % 2) === 0;
        if (shouldFill) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    
    // Add corner squares (finder patterns)
    const drawFinderPattern = (x, y) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x * moduleSize, y * moduleSize, 7 * moduleSize, 7 * moduleSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect((x + 1) * moduleSize, (y + 1) * moduleSize, 5 * moduleSize, 5 * moduleSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect((x + 2) * moduleSize, (y + 2) * moduleSize, 3 * moduleSize, 3 * moduleSize);
    };
    
    drawFinderPattern(0, 0);      // Top-left
    drawFinderPattern(18, 0);     // Top-right
    drawFinderPattern(0, 18);     // Bottom-left
    
    return canvas.toDataURL();
  };

  return (
    <div 
      className="bg-white p-3 border border-gray-200 rounded-lg mx-auto shadow-sm"
      style={{ width: size, height: size }}
    >
      <img 
        src={createMockQRCode()} 
        alt={`QR Code for ${value}`}
        className="w-full h-full object-contain rounded"
      />
    </div>
  )
}

function ReceiveModal({ open, onOpenChange, userPayTag = "@john_doe", userName = "John Doe" }) {
  const [copied, setCopied] = useState(false)
  
  const paymentUrl = `paywisepay://send?to=${userPayTag}`
  
  const handleCopyPayTag = async () => {
    try {
      await navigator.clipboard.writeText(userPayTag)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
  
  const handleShare = async () => {
    const shareData = {
      title: 'Send me money via PayWise',
      text: `Send money to ${userName} (${userPayTag}) using PayWise`,
      url: paymentUrl
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback - copy to clipboard
      await navigator.clipboard.writeText(`Send money to ${userName} (${userPayTag}) using PayWise`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <div className="mb-4 pr-8">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-700 text-center">Receive Money</h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* User Info */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{userName}</h3>
            <p className="text-sm sm:text-base text-emerald-600 font-medium">{userPayTag}</p>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <QRCodeDisplay value={userPayTag} size={160} />
            <p className="text-xs sm:text-sm text-gray-600 mt-2 px-2">
              Scan this QR code to send money to {userName}
            </p>
          </div>

          {/* PayTag Section */}
          <Card className="border-emerald-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">My PayTag</p>
                  <p className="font-mono text-sm sm:text-base text-emerald-700 font-medium truncate">{userPayTag}</p>
                </div>
                <Button
                  onClick={handleCopyPayTag}
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2 text-sm sm:text-base">How to receive money:</h4>
            <ul className="text-xs sm:text-sm text-emerald-700 space-y-1">
              <li>• Share your PayTag or QR code with the sender</li>
              <li>• They can scan the QR code or enter your PayTag</li>
              <li>• Money will be received instantly to your account</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={handleShare}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm py-2 sm:py-3"
            >
              <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Share
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-xs sm:text-sm py-2 sm:py-3"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiveModal
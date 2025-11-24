import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins' 
})

export const metadata = {
  metadataBase: new URL('https://paperbukit.netlify.app'),
  title: 'Dhanush HS - AI/ML Developer & Student',
  description: 'Portfolio of Dhanush HS, Computer Science (AIML) student and Python intern passionate about AI/ML and full-stack development.',
  keywords: 'Dhanush HS, AI/ML, Machine Learning, Python, React, Portfolio, Computer Science, AIML',
  authors: [{ name: 'Dhanush HS' }],
  openGraph: {
    title: 'Dhanush HS - AI/ML Developer & Student',
    description: 'Portfolio of Dhanush HS, Computer Science (AIML) student and Python intern passionate about AI/ML and full-stack development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen cursor-none transition-colors duration-300">
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Disable right-click context menu */}
        <Script id="disable-right-click" strategy="afterInteractive">
          {`
            document.addEventListener('contextmenu', function(e) {
              e.preventDefault();
              return false;
            });
            
            // Also disable F12, Ctrl+Shift+I, Ctrl+U, and other dev shortcuts
            document.addEventListener('keydown', function(e) {
              // F12
              if (e.keyCode === 123) {
                e.preventDefault();
                return false;
              }
              
              // Ctrl+Shift+I (Dev Tools)
              if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                return false;
              }
              
              // Ctrl+U (View Source)
              if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
              }
              
              // Ctrl+Shift+C (Inspect Element)
              if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
                e.preventDefault();
                return false;
              }
              
              // Ctrl+Shift+J (Console)
              if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                return false;
              }
            });
            
            // Disable text selection on drag
            document.addEventListener('selectstart', function(e) {
              e.preventDefault();
              return false;
            });
            
            // Disable image dragging
            document.addEventListener('dragstart', function(e) {
              if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
              }
            });
          `}
        </Script>
      </body>
    </html>
  )
}

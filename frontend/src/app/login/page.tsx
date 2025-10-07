'use client'
import { getSession } from "next-auth/react"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const brandAccent = '#219653'
const brandAccentDark = '#1a7e43'

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.push('/inbox') // Redirect to inbox if already logged in
      }
    })
  }, [router])

  const handleDirectLogin = async () => {
    setIsLoading(true)
    try {
      // Directly redirect to inbox without authentication
      router.push('/inbox')
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Panel - Login Form */}
        <div className="login-form-panel">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill={brandAccent}/>
                  <path d="M12 12L8 10V14L12 16L16 14V10L12 12Z" fill="white"/>
                </svg>
              </div>
              <span className="logo-text">Apers</span>
            </div>
            <h1 className="welcome-title">Welcome back</h1>
            <p className="welcome-subtitle">
              Simplify your workflow and boost productivity with <strong>Apers</strong>.
            </p>
          </div>

          <div className="social-login-section">
            <button
              className={`social-button direct-login-button ${isLoading ? 'loading' : ''}`}
              onClick={handleDirectLogin}
              disabled={isLoading}
            >
              <div className="button-content">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="button-text">
                  {isLoading ? 'Signing in...' : 'Continue with Google'}
                </span>
              </div>
            </button>
          </div>

          <div className="signup-prompt">
            <p>Not a member yet?</p>
            <a href="/register" className="signup-link">
              Create an account
            </a>
          </div>
        </div>

        {/* Right Panel - Hero Section */}
        <div className="hero-panel">
          <div className="hero-content">
            <div className="illustration-container">
              <div className="floating-card card-1">
                <div className="card-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="card-text">
                  <span>Analytics</span>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="card-text">
                  <span>Tasks</span>
                </div>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="card-text">
                  <span>Team</span>
                </div>
              </div>
              <div className="center-graphic">
                <div className="graphic-circle">
                  <i className="fas fa-rocket"></i>
                </div>
              </div>
            </div>
            <div className="hero-text">
              <h2>Streamline Your Workflow</h2>
              <p>Join thousands of teams using Apers to organize projects, track progress, and achieve more together.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f6f7f6 0%, #f0f2f5 100%);
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-card {
          display: flex;
          width: 100%;
          max-width: 1000px;
          min-height: 600px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .login-form-panel {
          flex: 1;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 440px;
        }

        .logo-section {
          margin-bottom: 40px;
        }

        .logo {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          margin-right: 12px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: ${brandAccent};
        }

        .welcome-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .welcome-subtitle {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.5;
        }

        .social-login-section {
          margin-bottom: 32px;
        }

        .social-button {
          width: 100%;
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .direct-login-button {
          background: ${brandAccent};
          color: #ffffff;
          border: 1.5px solid ${brandAccent};
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .direct-login-button:hover:not(:disabled) {
          background: ${brandAccentDark};
          box-shadow: 0 4px 12px rgba(33, 150, 83, 0.3);
          transform: translateY(-1px);
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-icon {
          width: 20px;
          height: 20px;
        }

        .button-text {
          font-weight: 600;
        }

        .signup-prompt {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }

        .signup-link {
          color: ${brandAccent};
          text-decoration: none;
          font-weight: 600;
          margin-left: 8px;
          transition: color 0.2s ease;
        }

        .signup-link:hover {
          color: ${brandAccentDark};
        }

        .hero-panel {
          flex: 1;
          background: linear-gradient(135deg, ${brandAccent} 0%, ${brandAccentDark} 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 1;
          position: relative;
        }

        .illustration-container {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0 auto 40px;
        }

        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: float 6s ease-in-out infinite;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-1 {
          top: 0;
          left: 0;
          animation-delay: 0s;
        }

        .card-2 {
          top: 0;
          right: 0;
          animation-delay: 2s;
        }

        .card-3 {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 4s;
        }

        .card-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-text {
          font-size: 14px;
          font-weight: 500;
        }

        .center-graphic {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .graphic-circle {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-text h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .hero-text p {
          font-size: 16px;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }

        @media (max-width: 768px) {
          .login-card {
            flex-direction: column;
            min-height: auto;
          }
          
          .login-form-panel {
            max-width: none;
            padding: 40px 24px;
          }
          
          .hero-panel {
            padding: 40px 24px;
          }
          
          .illustration-container {
            width: 200px;
            height: 200px;
          }
          
          .graphic-circle {
            width: 80px;
            height: 80px;
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  )
}

export default LoginPage
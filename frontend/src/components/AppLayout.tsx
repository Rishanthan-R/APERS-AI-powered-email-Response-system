'use client'
import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  label: string
  path: string
  icon: string
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Inbox', path: '/inbox', icon: '📥', badge: 12 },
  { label: 'AI Drafts', path: '/drafts', icon: '🤖', badge: 3 },
  { label: 'Needs Review', path: '/needs-review', icon: '👀', badge: 7 },
  { label: 'AI Replied', path: '/ai-replied', icon: '⚡', badge: 24 },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
]

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="menu-icon">☰</span>
        </button>
        <div className="mobile-logo">
          <div className="logo-icon">A</div>
          <span className="logo-text">Apers</span>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Desktop Collapse Toggle */}
        <button className="collapse-toggle" onClick={toggleSidebar}>
          <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>
            ‹
          </span>
        </button>

        {/* Logo Section */}
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">A</div>
            {!isCollapsed && (
              <div className="logo-text">
                <span className="logo-primary">Apers</span>
                <span className="logo-subtitle">AI Assistant</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <button
                key={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="nav-item-content">
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                  {item.badge && !isCollapsed && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                  {item.badge && isCollapsed && (
                    <span className="nav-badge-collapsed">{item.badge}</span>
                  )}
                </div>
                {isActive && <div className="active-indicator" />}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <img src="/avatar.png" alt="User avatar" />
            </div>
            {!isCollapsed && (
              <div className="user-info">
                <span className="user-name">Alex Johnson</span>
                <span className="user-role">Admin</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Desktop Header */}
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">
              {navItems.find(item => item.path === pathname)?.label || 'Dashboard'}
            </h1>
            <span className="page-subtitle">
              Manage your AI-powered email workflow
            </span>
          </div>
          <div className="header-actions">
            <button className="action-button search-button">
              <span className="action-icon">🔍</span>
            </button>
            <button className="action-button notification-button">
              <span className="action-icon">🔔</span>
              <span className="notification-dot"></span>
            </button>
            <div className="user-menu">
              <div className="user-avatar-small">
                <img src="/avatar.png" alt="User avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="content-area">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <style jsx>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          position: relative;
        }

        /* Mobile Header */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 20px;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .menu-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          margin-right: 12px;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 100;
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .collapse-toggle {
          position: absolute;
          top: 20px;
          right: -12px;
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .collapse-toggle:hover {
          background: #f1f5f9;
          transform: scale(1.1);
        }

        .toggle-icon {
          font-size: 16px;
          color: #64748b;
          transition: transform 0.3s ease;
        }

        .toggle-icon.collapsed {
          transform: rotate(180deg);
        }

        .sidebar-header {
          padding: 32px 24px 24px;
          border-bottom: 1px solid #f1f5f9;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #219653 0%, #1a7e43 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-primary {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        /* Navigation */
        .sidebar-nav {
          flex: 1;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          position: relative;
          background: none;
          border: none;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .nav-item:hover {
          background: #f1f5f9;
        }

        .nav-item.active {
          background: #e8f5e8;
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .nav-icon {
          font-size: 20px;
          width: 24px;
          text-align: center;
          flex-shrink: 0;
        }

        .nav-label {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          flex: 1;
        }

        .nav-item.active .nav-label {
          color: #219653;
          font-weight: 600;
        }

        .nav-badge {
          background: #ef4444;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          min-width: 20px;
          text-align: center;
        }

        .nav-badge-collapsed {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 8px;
          min-width: 16px;
          text-align: center;
        }

        .active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 24px;
          background: #219653;
          border-radius: 0 2px 2px 0;
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 20px 16px;
          border-top: 1px solid #f1f5f9;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }

        .user-profile:hover {
          background: #f1f5f9;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .user-role {
          font-size: 12px;
          color: #64748b;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 0px;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .main-content.sidebar-collapsed {
          margin-left: 0px;
        }

        .content-header {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: between;
        }

        .header-left {
          flex: 1;
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .page-subtitle {
          font-size: 14px;
          color: #64748b;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .action-button {
          width: 40px;
          height: 40px;
          border: none;
          background: #f8fafc;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-button:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .action-icon {
          font-size: 18px;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #ffffff;
        }

        .user-menu {
          margin-left: 8px;
        }

        .user-avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
        }

        .user-avatar-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-area {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 90;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: -280px;
            height: 100vh;
            z-index: 100;
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
          }

          .sidebar.mobile-open {
            left: 0;
          }

          .main-content {
            margin-left: 0;
            padding-top: 64px;
          }

          .content-header {
            padding: 20px;
          }

          .content-area {
            padding: 20px;
          }

          .mobile-overlay {
            display: block;
          }

          .collapse-toggle {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .header-actions {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}

export default AppLayout
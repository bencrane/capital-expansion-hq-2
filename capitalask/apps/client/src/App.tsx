import React from 'react'
import { useStore } from './store/useStore'
import BorrowerView from './components/BorrowerView'
import LenderView from './components/LenderView'
import LenderOnboarding from './components/LenderOnboarding'
import { ArrowLeftRight, Bell, Search, LayoutDashboard, FileText, Lock, Settings } from 'lucide-react'

export default function App() {
  const { viewMode, setViewMode, hasCompletedLenderOnboarding, activeLenderTab, setActiveLenderTab } = useStore()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--graphite)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--graphite-2)', borderRight: '1px solid var(--line-d)', display: 'flex', flexDirection: 'column', zIndex: 60 }}>
        <div style={{ height: '72px', padding: '0 24px', borderBottom: '1px solid var(--line-d)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="brand" style={{ fontSize: '20px', marginBottom: '4px' }}>
            <span className="glyph" />CapitalAsk
          </div>
          <div style={{ fontSize: '12px', color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: viewMode === 'borrower' ? 'var(--lime)' : '#3b82f6' }} />
            {viewMode === 'borrower' ? 'Borrower Portal' : 'Capital Partner'}
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {viewMode === 'lender' && hasCompletedLenderOnboarding ? (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveLenderTab('active_deals'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', textDecoration: 'none', borderRadius: '8px', fontWeight: 500, fontSize: '14px', background: activeLenderTab === 'active_deals' ? 'var(--line-d)' : 'transparent', color: activeLenderTab === 'active_deals' ? 'var(--paper)' : 'var(--mute)' }}>
                <LayoutDashboard size={18} color={activeLenderTab === 'active_deals' ? 'var(--lime)' : 'currentColor'} /> Active Deals
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveLenderTab('term_sheets'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', textDecoration: 'none', borderRadius: '8px', fontWeight: 500, fontSize: '14px', background: activeLenderTab === 'term_sheets' ? 'var(--line-d)' : 'transparent', color: activeLenderTab === 'term_sheets' ? 'var(--paper)' : 'var(--mute)' }}>
                <FileText size={18} color={activeLenderTab === 'term_sheets' ? 'var(--lime)' : 'currentColor'} /> Term Sheets
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveLenderTab('document_vault'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', textDecoration: 'none', borderRadius: '8px', fontWeight: 500, fontSize: '14px', background: activeLenderTab === 'document_vault' ? 'var(--line-d)' : 'transparent', color: activeLenderTab === 'document_vault' ? 'var(--paper)' : 'var(--mute)' }}>
                <Lock size={18} color={activeLenderTab === 'document_vault' ? 'var(--lime)' : 'currentColor'} /> Document Vault
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveLenderTab('settings'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', textDecoration: 'none', borderRadius: '8px', fontWeight: 500, fontSize: '14px', background: activeLenderTab === 'settings' ? 'var(--line-d)' : 'transparent', color: activeLenderTab === 'settings' ? 'var(--paper)' : 'var(--mute)' }}>
                <Settings size={18} color={activeLenderTab === 'settings' ? 'var(--lime)' : 'currentColor'} /> Settings
              </a>
            </>
          ) : (
            <>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', color: 'var(--paper)', textDecoration: 'none', background: 'var(--line-d)', borderRadius: '8px', fontWeight: 500, fontSize: '14px' }}>
                <LayoutDashboard size={18} color="var(--lime)" /> Active Deals
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', color: 'var(--mute)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>
                <FileText size={18} /> Term Sheets
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', color: 'var(--mute)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>
                <Lock size={18} /> Document Vault
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', color: 'var(--mute)', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>
                <Settings size={18} /> Settings
              </a>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ height: '72px', borderBottom: '1px solid var(--line-d)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', background: 'var(--graphite)', zIndex: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--mute)', background: 'var(--graphite-2)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--line-d)', width: '300px' }}>
            <Search size={16} />
            <span style={{ fontSize: '14px' }}>Search deals...</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button 
              className="b-line"
              style={{ padding: '8px 16px', fontSize: '13px' }}
              onClick={() => setViewMode(viewMode === 'borrower' ? 'lender' : 'borrower')}
            >
              <ArrowLeftRight size={14} /> Switch to {viewMode === 'borrower' ? 'Lender' : 'Borrower'} View
            </button>
            <Bell size={20} color="var(--mute)" style={{ cursor: 'pointer' }} />
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--line-d)', display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: 'bold' }}>
              {viewMode === 'borrower' ? 'BR' : 'CP'}
            </div>
          </div>
        </header>

        {/* Dynamic View Panel */}
        <main style={{ flex: 1, padding: '40px', background: 'var(--panel)', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {viewMode === 'borrower' ? (
              <BorrowerView />
            ) : !hasCompletedLenderOnboarding ? (
              <LenderOnboarding />
            ) : (
              <LenderView />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

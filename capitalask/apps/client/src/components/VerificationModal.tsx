import React from 'react'
import { useStore } from '../store/useStore'
import { ShieldAlert, X } from 'lucide-react'

interface Props {
  onClose: () => void
}

export default function VerificationModal({ onClose }: Props) {
  const { viewMode, setIsEntityVerified } = useStore()
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEntityVerified(true)
    onClose()
  }

  const title = viewMode === 'borrower' ? 'Connect Operating Accounts' : 'Entity Verification Required'
  const desc = viewMode === 'borrower' 
    ? 'To view and execute term sheets, we need to verify your business identity and link a primary operating account.'
    : 'To execute wire transfers and secure UCC-1 liens, your institution must pass a KYB (Know Your Business) screening.'

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(11,13,12,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px', background: 'var(--panel)', border: '1px solid var(--line-d)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: '1px solid var(--line-d)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ShieldAlert size={24} color="var(--lime)" />
            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--mute)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleVerify} style={{ padding: '24px' }}>
          <p style={{ fontSize: '14px', color: 'var(--mute)', lineHeight: 1.5, marginBottom: '24px' }}>
            {desc}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Legal Business Name</label>
              <input type="text" required style={{ width: '100%', padding: '16px', background: 'var(--graphite)', border: '1px solid var(--line-d)', borderRadius: '8px', color: 'var(--paper)', fontSize: '16px' }} placeholder="e.g., Apex Heavy Industries LLC" />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Employer Identification Number (EIN)</label>
              <input type="text" required pattern="\\d{2}-\\d{7}" style={{ width: '100%', padding: '16px', background: 'var(--graphite)', border: '1px solid var(--line-d)', borderRadius: '8px', color: 'var(--paper)', fontSize: '16px' }} placeholder="00-0000000" />
            </div>
          </div>
          
          <button type="submit" className="b-fill" style={{ width: '100%' }}>
            {viewMode === 'borrower' ? 'Simulate Plaid Link' : 'Simulate Middesk Verification'}
          </button>
        </form>
      </div>
    </div>
  )
}

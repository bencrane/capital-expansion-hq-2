import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import VerificationModal from './VerificationModal'
import LenderTermSheets from './LenderTermSheets'
import LenderVault from './LenderVault'
import LenderOnboarding from './LenderOnboarding'

export default function LenderView() {
  const { activeLenderTab } = useStore()

  if (activeLenderTab === 'term_sheets') return <LenderTermSheets />
  if (activeLenderTab === 'document_vault') return <LenderVault />
  if (activeLenderTab === 'settings') return <LenderOnboarding isSettingsMode={true} />

  return <ActiveDeals />
}

function ActiveDeals() {
  const { txState, setTxState, equipmentData, wireReceipt, setWireReceipt, isEntityVerified } = useStore()
  const [showModal, setShowModal] = useState(false)

  const handleFund = async () => {
    if (!isEntityVerified) {
      setShowModal(true)
      return
    }

    setTxState('funding')
    try {
      const res = await fetch('/api/execute-wire', { method: 'POST' })
      const json = await res.json()
      setWireReceipt(json.data)
      setTxState('funded')
    } catch (e) {
      console.error(e)
      setTxState('matched')
    }
  }

  const handleMockFund = () => {
    if (!isEntityVerified) {
      setShowModal(true)
      return
    }
    alert('Mock Funding Executed.')
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 className="headline" style={{ fontSize: '32px', marginBottom: '32px' }}>
        Live <span className="lit">Order Book</span>
      </h1>

      {/* Permanent Mock Deal Card */}
      <div className="panel" style={{ padding: '32px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', background: 'var(--graphite)', padding: '4px 8px', borderRadius: '4px', color: 'var(--lime)' }}>CA-8892</div>
              <div style={{ color: 'var(--mute)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
                Expires in 04:12:00
              </div>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Caterpillar D6 Dozer</h3>
            <div style={{ display: 'flex', gap: '24px', color: 'var(--mute)', fontSize: '14px' }}>
               <div>Amount: <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)' }}>$150,000</span></div>
               <div>Est. Spread: <span style={{ fontFamily: 'var(--mono)', color: 'var(--lime)' }}>2.4%</span></div>
            </div>
         </div>
         <button className="b-line" onClick={handleMockFund}>
           Fund & Execute
         </button>
      </div>

      {txState === 'idle' || txState === 'extracting' || txState === 'extracted' || txState === 'matching' ? (
        <div className="panel" style={{ padding: '64px', textAlign: 'center', color: 'var(--mute)' }}>
          No additional matching requests waiting for funding.
        </div>
      ) : txState === 'matched' && equipmentData ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="dot" /> Deal Request
            </h3>
            <div className="req-rows">
              <div className="req-row">
                <span className="k">Asset Type</span>
                <span className="v">{equipmentData.equipmentType}</span>
              </div>
              <div className="req-row">
                <span className="k">Amount Needed</span>
                <span className="v lime">${equipmentData.amount.toLocaleString()}</span>
              </div>
              <div className="req-row">
                <span className="k">Vendor</span>
                <span className="v">{equipmentData.dealer}</span>
              </div>
              <div className="req-row">
                <span className="k">Asset FLV</span>
                <span className="v">${Math.floor(equipmentData.amount * 0.8).toLocaleString()}</span>
              </div>
              <div className="req-row">
                <span className="k">Yield Spread Premium</span>
                <span className="v" style={{ color: 'var(--lime)' }}>2.4%</span>
              </div>
            </div>
          </div>
          
          <div className="panel" style={{ padding: '32px', background: 'var(--graphite)' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '24px', color: 'var(--lime)' }}>
              Execution
            </h3>
            <p style={{ color: 'var(--mute)', fontSize: '14px', marginBottom: '32px', lineHeight: '1.5' }}>
              Fund this facility directly to the vendor via Fedwire. An irrevocable UCC-1 lien will be automatically filed upon settlement.
            </p>
            
            <div style={{ background: 'var(--panel)', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' }}>
              <div style={{ color: 'var(--mute)', marginBottom: '8px' }}>Vendor Wiring Instructions</div>
              <div style={{ fontFamily: 'var(--mono)' }}>{equipmentData.wireInstructions.bankName}</div>
              <div style={{ fontFamily: 'var(--mono)' }}>Acct ending in {equipmentData.wireInstructions.accountEnd}</div>
              <div style={{ fontFamily: 'var(--mono)' }}>Routing ending in {equipmentData.wireInstructions.routingEnd}</div>
            </div>

            <button className="b-fill" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }} onClick={handleFund}>
              Fund & Execute Lien <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : txState === 'funding' ? (
        <div style={{ textAlign: 'center', padding: '96px 0' }}>
          <Loader2 size={48} style={{ color: 'var(--lime)', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '20px' }}>Executing Fedwire Settlement...</h2>
        </div>
      ) : txState === 'funded' && wireReceipt ? (
        <div className="panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <CheckCircle2 color="var(--lime)" size={32} />
            <div>
              <h2 style={{ fontSize: '24px' }}>Wire Sent & Lien Executed</h2>
              <div style={{ color: 'var(--mute)', fontSize: '14px', marginTop: '8px' }}>Transaction {wireReceipt.transactionId}</div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', padding: '24px', background: 'var(--graphite)', borderRadius: '16px' }}>
            <div>
              <div style={{ color: 'var(--mute)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Status</div>
              <div style={{ color: 'var(--lime)', fontWeight: 'bold' }}>SETTLED</div>
            </div>
            <div>
              <div style={{ color: 'var(--mute)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Network</div>
              <div style={{ fontWeight: 'bold' }}>{wireReceipt.network}</div>
            </div>
            <div>
              <div style={{ color: 'var(--mute)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Amount</div>
              <div style={{ fontWeight: 'bold' }}>${wireReceipt.amount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      ) : null}
      
      {showModal && <VerificationModal onClose={() => setShowModal(false)} />}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

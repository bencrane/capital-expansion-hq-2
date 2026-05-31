import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import VerificationModal from './VerificationModal'

export default function BorrowerView() {
  const { txState, setTxState, equipmentData, setEquipmentData, lenders, setLenders, isEntityVerified } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handlePreApprove = (assetName: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setToastMessage(`Upload a dealer quote for ${assetName} to lock in algorithmic routing.`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleUpload = async () => {
    setTxState('extracting')
    try {
      const res = await fetch('/api/extract-invoice', { method: 'POST' })
      const json = await res.json()
      setEquipmentData(json.data)
      setTxState('extracted')
    } catch (e) {
      console.error(e)
      setTxState('idle')
    }
  }

  const handleSubmitToOrderBook = async () => {
    setTxState('matching')
    try {
      const res = await fetch('/api/match-lenders', { method: 'POST' })
      const json = await res.json()
      setLenders(json.data)
      setTxState('matched')
    } catch (e) {
      console.error(e)
      setTxState('extracted')
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="headline" style={{ fontSize: '42px', marginBottom: '24px' }}>
        Finance your <span className="lit">equipment</span> acquisition.
      </h1>
      
      {txState === 'idle' && (
        <>
          <div 
            onClick={handleUpload}
            style={{ 
              border: '2px dashed var(--line-d)', 
              borderRadius: '16px', 
              padding: '40px', 
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--graphite-2)',
              marginBottom: '48px',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--lime)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--line-d)'}
          >
            <Upload size={32} style={{ color: 'var(--lime)', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Upload Equipment Quote</h2>
            <p style={{ color: 'var(--mute)' }}>Drop your PDF or image here to automatically extract equipment details.</p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 8px var(--lime)' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Live Market Opportunities</h2>
            </div>
            <p style={{ color: 'var(--mute)', fontSize: '14px', marginBottom: '32px' }}>
              Pre-cleared algorithmic financing for high-demand asset classes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {/* Synthetic Deal Card 1 */}
              <div style={{ background: 'var(--graphite-2)', borderRadius: '16px', padding: '24px', border: '1px solid var(--line-d)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'var(--lime)', color: 'var(--graphite)', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FAST FUNDING AVAILABLE</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', marginTop: '8px' }}>2024 Caterpillar 320 Excavator</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Est. Equipment Value</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>$145,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Available Lenders</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>4 Lenders</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Target Starting Rate</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--lime)', whiteSpace: 'nowrap', flexShrink: 0 }}>Starting at 7.2% APR</span>
                  </div>
                </div>
                <button 
                  className="b-line" 
                  style={{ width: '100%', fontSize: '13px' }}
                  onClick={() => handlePreApprove('2024 Caterpillar 320 Excavator')}
                >
                  Get Pre-Approved for this Asset
                </button>
              </div>

              {/* Synthetic Deal Card 2 */}
              <div style={{ background: 'var(--graphite-2)', borderRadius: '16px', padding: '24px', border: '1px solid var(--line-d)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'var(--lime)', color: 'var(--graphite)', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MULTIPLE LENDERS COMPETING</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', marginTop: '8px' }}>2025 Freightliner Cascadia</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Est. Equipment Value</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>$162,500</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Available Lenders</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>7 Lenders</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Target Starting Rate</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--lime)', whiteSpace: 'nowrap', flexShrink: 0 }}>Starting at 6.8% APR</span>
                  </div>
                </div>
                <button 
                  className="b-line" 
                  style={{ width: '100%', fontSize: '13px' }}
                  onClick={() => handlePreApprove('2025 Freightliner Cascadia')}
                >
                  Get Pre-Approved for this Asset
                </button>
              </div>

              {/* Synthetic Deal Card 3 */}
              <div style={{ background: 'var(--graphite-2)', borderRadius: '16px', padding: '24px', border: '1px solid var(--line-d)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'var(--lime)', color: 'var(--graphite)', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>HIGHLY COMPETITIVE RATES</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', marginTop: '8px' }}>Siemens Magnetom MRI</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Est. Equipment Value</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>$850,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Available Lenders</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>2 Lenders</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Target Starting Rate</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--lime)', whiteSpace: 'nowrap', flexShrink: 0 }}>Starting at 7.8% APR</span>
                  </div>
                </div>
                <button 
                  className="b-line" 
                  style={{ width: '100%', fontSize: '13px' }}
                  onClick={() => handlePreApprove('Siemens Magnetom MRI')}
                >
                  Get Pre-Approved for this Asset
                </button>
              </div>
              
              {/* Synthetic Deal Card 4 */}
              <div style={{ background: 'var(--graphite-2)', borderRadius: '16px', padding: '24px', border: '1px solid var(--line-d)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'var(--lime)', color: 'var(--graphite)', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FAST FUNDING AVAILABLE</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', marginTop: '8px' }}>Haas VF-4 CNC Machine</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Est. Equipment Value</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>$95,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Available Lenders</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--paper)', whiteSpace: 'nowrap', flexShrink: 0 }}>12 Lenders</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--mute)' }}>Target Starting Rate</span>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--lime)', whiteSpace: 'nowrap', flexShrink: 0 }}>Starting at 6.2% APR</span>
                  </div>
                </div>
                <button 
                  className="b-line" 
                  style={{ width: '100%', fontSize: '13px' }}
                  onClick={() => handlePreApprove('Haas VF-4 CNC Machine')}
                >
                  Get Pre-Approved for this Asset
                </button>
              </div>

            </div>
          </div>
        </>
      )}

      {txState === 'extracting' && (
        <div style={{ textAlign: 'center', padding: '96px 0' }}>
          <Loader2 size={48} style={{ color: 'var(--lime)', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '20px' }}>Extracting Invoice Data via OCR...</h2>
        </div>
      )}

      {txState === 'extracted' && equipmentData && (
        <div className="panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <CheckCircle2 color="var(--lime)" size={24} />
            <h2 style={{ fontSize: '24px' }}>Extraction Successful</h2>
          </div>
          
          <div className="req-rows" style={{ marginBottom: '32px' }}>
            <div className="req-row">
              <span className="k">Equipment</span>
              <span className="v">{equipmentData.equipmentType}</span>
            </div>
            <div className="req-row">
              <span className="k">Purchase Price</span>
              <span className="v lime">${equipmentData.amount.toLocaleString()}</span>
            </div>
            <div className="req-row">
              <span className="k">Dealer</span>
              <span className="v">{equipmentData.dealer}</span>
            </div>
          </div>

          <button className="b-fill" style={{ width: '100%' }} onClick={handleSubmitToOrderBook}>
            Request Term Sheets
          </button>
        </div>
      )}

      {txState === 'matching' && (
        <div style={{ textAlign: 'center', padding: '96px 0' }}>
          <Loader2 size={48} style={{ color: 'var(--lime)', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '20px' }}>Scoring mandate fit against 300+ lenders...</h2>
        </div>
      )}

      {txState === 'matched' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px' }}>Term Sheets Received</h2>
            <span className="mono" style={{ color: 'var(--lime)' }}>{lenders.length} Fits Found</span>
          </div>

          {!isEntityVerified && (
            <div 
              onClick={() => setShowModal(true)}
              style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-danger, #ef4444)', borderRadius: '16px', marginBottom: '24px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '16px' }}
            >
              <AlertCircle size={24} color="#ef4444" style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>Action Required</h3>
                <p style={{ color: 'var(--mute)', fontSize: '14px', lineHeight: 1.5 }}>Verify your business entity and connect operating accounts to view term sheets.</p>
              </div>
            </div>
          )}

          <div className="panel" style={{ padding: '0 24px' }}>
            {lenders.map(l => (
              <div key={l.id} className="m-card" style={{ filter: isEntityVerified ? 'none' : 'blur(5px)', pointerEvents: isEntityVerified ? 'auto' : 'none', opacity: isEntityVerified ? 1 : 0.6 }}>
                <div className="m-logo">{l.name.substring(0,2)}</div>
                <div className="m-info">
                  <div className="nm">{l.name}</div>
                  <div className="ty">{l.type}</div>
                </div>
                <div style={{ textAlign: 'right', paddingRight: '24px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--mute)', marginBottom: '8px' }}>Estimated Rate</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '16px' }}>{l.yieldSpread}</div>
                </div>
                <div className="m-fit">
                  <div className="pct">{l.fit}%</div>
                  <div className="lab">fit</div>
                  <div className="m-bar"><i style={{ width: `${l.fit}%` }} /></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', color: 'var(--mute)', fontSize: '14px', textAlign: 'center' }}>
            Waiting for a lender to fund the request...
          </div>
        </div>
      )}

      {(txState === 'funding' || txState === 'funded') && (
        <div className="panel" style={{ padding: '48px', textAlign: 'center' }}>
          <CheckCircle2 color="var(--lime)" size={64} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Facility Funded</h2>
          <p style={{ color: 'var(--mute)' }}>A lender has executed the wire and secured the lien.</p>
        </div>
      )}

      {showModal && <VerificationModal onClose={() => setShowModal(false)} />}

      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: 'var(--graphite-2)', border: '1px solid var(--lime)', color: 'var(--paper)', padding: '16px 24px', borderRadius: '8px', zIndex: 100, boxShadow: '0 8px 30px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 8px var(--lime)' }} />
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

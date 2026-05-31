import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { ArrowRight, Check } from 'lucide-react'

interface Props {
  isSettingsMode?: boolean
}

export default function LenderOnboarding({ isSettingsMode }: Props) {
  const { setHasCompletedLenderOnboarding } = useStore()
  
  const [minSize, setMinSize] = useState('5,000,000')
  const [maxSize, setMaxSize] = useState('25,000,000')
  const [yieldVal, setYieldVal] = useState(12.5)

  const structures = ['Term / Unitranche', 'Asset-Based', 'Factoring', 'Mezzanine']
  const [activeStructs, setActiveStructs] = useState<string[]>(['Term / Unitranche', 'Asset-Based'])

  const assets = ['Heavy Machinery', 'Rolling Stock', 'Medical Equipment', 'SaaS MRR', 'Commercial Real Estate']
  const [activeAssets, setActiveAssets] = useState<string[]>(['Heavy Machinery', 'Rolling Stock'])

  const toggleStruct = (s: string) => {
    setActiveStructs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const toggleAsset = (a: string) => {
    setActiveAssets(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  const handleConfirm = () => {
    if (isSettingsMode) {
      // Simulation of saving settings
      alert("Order Book Criteria Updated")
    } else {
      setHasCompletedLenderOnboarding(true)
    }
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', paddingBottom: '120px' }}>
      <h1 className="headline" style={{ fontSize: '32px', marginBottom: '16px' }}>
        {isSettingsMode ? (
          <>Algorithmic Underwriting <span className="lit">Mandate</span></>
        ) : (
          <>We've analyzed your public mandate. Verify your <span className="lit">underwriting parameters</span>.</>
        )}
      </h1>
      <p style={{ color: 'var(--mute)', fontSize: '16px', lineHeight: 1.5, marginBottom: '48px' }}>
        {isSettingsMode ? (
          'Adjust your automated matching parameters to filter incoming deal flow.'
        ) : (
          'Our enrichment pipeline (Exa.ai) has pre-populated your Capital Partner profile based on your public filings and recent originations. Please verify before entering the active deal room.'
        )}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Facility Size */}
        <div className="panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Target Facility Size</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }}>$</span>
              <input 
                value={minSize}
                onChange={e => setMinSize(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 32px', background: 'var(--graphite)', border: '1px solid var(--line-d)', borderRadius: '8px', color: 'var(--paper)', fontSize: '16px', fontFamily: 'var(--mono)' }} 
              />
            </div>
            <div style={{ color: 'var(--mute)' }}>to</div>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }}>$</span>
              <input 
                value={maxSize}
                onChange={e => setMaxSize(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 32px', background: 'var(--graphite)', border: '1px solid var(--line-d)', borderRadius: '8px', color: 'var(--paper)', fontSize: '16px', fontFamily: 'var(--mono)' }} 
              />
            </div>
          </div>
        </div>

        {/* Target Yield */}
        <div className="panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Target Yield Premium</h3>
            <div style={{ fontSize: '24px', fontFamily: 'var(--mono)', color: 'var(--lime)' }}>{yieldVal.toFixed(1)}%</div>
          </div>
          <input 
            type="range" 
            min="5" 
            max="25" 
            step="0.1"
            value={yieldVal}
            onChange={e => setYieldVal(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--lime)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--mute)', fontSize: '12px' }}>
            <span>Conservative (5.0%)</span>
            <span>Aggressive (25.0%)</span>
          </div>
        </div>

        {/* Financing Structures */}
        <div className="panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Preferred Financing Structures</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {structures.map(s => {
              const active = activeStructs.includes(s)
              return (
                <button
                  key={s}
                  onClick={() => toggleStruct(s)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 500,
                    background: active ? 'rgba(196, 240, 66, 0.1)' : 'var(--graphite)',
                    border: `1px solid ${active ? 'var(--lime)' : 'var(--line-d)'}`,
                    color: active ? 'var(--lime)' : 'var(--mute)'
                  }}
                >
                  {active && <Check size={16} />}
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {/* Asset Classes */}
        <div className="panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Supported Asset Classes</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {assets.map(a => {
              const active = activeAssets.includes(a)
              return (
                <button
                  key={a}
                  onClick={() => toggleAsset(a)}
                  style={{
                    padding: '8px 16px', borderRadius: '16px', cursor: 'pointer',
                    fontSize: '13px', fontFamily: 'var(--mono)',
                    background: active ? 'var(--paper)' : 'var(--graphite)',
                    border: `1px solid ${active ? 'var(--paper)' : 'var(--line-d)'}`,
                    color: active ? 'var(--graphite)' : 'var(--mute)'
                  }}
                >
                  {a}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* Sticky Footer */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '260px',
        right: 0,
        padding: '24px 40px',
        background: 'var(--graphite-2)',
        borderTop: '1px solid var(--line-d)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 50
      }}>
        <button 
          className="b-fill" 
          onClick={handleConfirm}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', padding: '16px 32px' }}
        >
          {isSettingsMode ? 'Update Order Book Criteria' : 'Confirm & Enter Order Book'} <ArrowRight size={20} />
        </button>
      </div>

    </div>
  )
}

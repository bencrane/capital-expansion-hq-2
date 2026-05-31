import React from 'react'
import { FileText, Download } from 'lucide-react'

export default function LenderVault() {
  const files = [
    { name: 'Foley-Inc-ProForma-8892.pdf', ref: 'CA-8892', type: 'Extracted Dealer Invoice', timestamp: '12:45 PM Today' },
    { name: 'UCC-1-Filing-Receipt-NY.pdf', ref: 'CA-8750', type: 'State Lien Perfection', timestamp: 'May 28, 2026' },
    { name: 'Moov-Settlement-Hash-FW993.json', ref: 'CA-8799', type: 'Irrevocable Wire Receipt', timestamp: 'May 25, 2026' },
    { name: 'ELT-Confirmation-TX-DMV.pdf', ref: 'CA-8810', type: 'Title Registry Lock', timestamp: 'May 10, 2026' },
  ]

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="headline" style={{ fontSize: '32px', marginBottom: '32px' }}>
        Document <span className="lit">Vault</span>
      </h1>

      <div className="panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line-d)', background: 'var(--graphite-2)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>File Name</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Deal Ref</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Document Type</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Timestamp</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, width: '80px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, i) => (
              <tr key={i} style={{ borderBottom: i === files.length - 1 ? 'none' : '1px solid var(--line-d)' }}>
                <td style={{ padding: '24px', fontSize: '14px', color: 'var(--paper)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={16} color="var(--lime)" />
                  <span style={{ fontFamily: 'var(--mono)' }}>{f.name}</span>
                </td>
                <td style={{ padding: '24px', fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--mute)' }}>{f.ref}</td>
                <td style={{ padding: '24px', fontSize: '14px', color: 'var(--paper)' }}>{f.type}</td>
                <td style={{ padding: '24px', fontSize: '13px', color: 'var(--mute)' }}>{f.timestamp}</td>
                <td style={{ padding: '24px' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--mute)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

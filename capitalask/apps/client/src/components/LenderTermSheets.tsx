import React from 'react'

export default function LenderTermSheets() {
  const data = [
    { ref: 'CA-8810', asset: 'Rolling Stock (3x Freightliner)', amount: 420000, status: 'Pending Borrower Signature', statusColor: '#eab308', lastUpdated: '10 min ago' },
    { ref: 'CA-8799', asset: 'Heavy Machinery (Deere 310L)', amount: 95000, status: 'Executing Fedwire', statusColor: '#3b82f6', lastUpdated: '42 min ago', pulsing: true },
    { ref: 'CA-8750', asset: 'Medical (MRI Scanner)', amount: 850000, status: 'Settled & Perfected', statusColor: '#22c55e', lastUpdated: '2 days ago' }
  ]

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="headline" style={{ fontSize: '32px', marginBottom: '32px' }}>
        Clearing <span className="lit">Ledger</span>
      </h1>

      <div className="panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line-d)', background: 'var(--graphite-2)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Deal Ref</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Asset Class</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Capital Committed</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Clearing Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid var(--line-d)' }}>
                <td style={{ padding: '24px', fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--paper)' }}>{row.ref}</td>
                <td style={{ padding: '24px', fontSize: '14px', color: 'var(--paper)' }}>{row.asset}</td>
                <td style={{ padding: '24px', fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--lime)' }}>${row.amount.toLocaleString()}</td>
                <td style={{ padding: '24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '16px', background: 'var(--graphite)', border: `1px solid ${row.statusColor}40`, fontSize: '12px', color: row.statusColor }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: row.statusColor, boxShadow: row.pulsing ? `0 0 8px ${row.statusColor}` : 'none' }} />
                    {row.status}
                  </div>
                </td>
                <td style={{ padding: '24px', fontSize: '13px', color: 'var(--mute)' }}>{row.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

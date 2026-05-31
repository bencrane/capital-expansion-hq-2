import React, { useState } from 'react';

type AssetClass = {
  id: string;
  name: string;
  downPaymentRate: number; // as percentage (e.g. 5 for 5%)
  baseApr: number; // e.g. 7.5 for 7.5%
};

const ASSET_CLASSES: AssetClass[] = [
  { id: 'industrial', name: 'Industrial Machinery', downPaymentRate: 5, baseApr: 7.25 },
  { id: 'rolling_stock', name: 'Rolling Stock & Fleets', downPaymentRate: 10, baseApr: 7.95 },
  { id: 'construction', name: 'Construction Equipment', downPaymentRate: 8, baseApr: 8.50 },
  { id: 'agricultural', name: 'Agricultural Equipment', downPaymentRate: 0, baseApr: 6.95 },
];

export default function CostSimulator() {
  const [purchasePrice, setPurchasePrice] = useState<number>(250000);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('industrial');

  const selectedAsset = ASSET_CLASSES.find(a => a.id === selectedAssetId) || ASSET_CLASSES[0];

  // Financial Calculations
  const downPaymentPercent = selectedAsset.downPaymentRate;
  const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
  const financedAmount = purchasePrice - downPaymentAmount;
  
  const annualInterestRate = selectedAsset.baseApr / 100;
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Standard Amortization Formula: P = L * [r(1+r)^n] / [(1+r)^n - 1]
  const calculateMonthlyPayment = () => {
    if (monthlyInterestRate === 0) return financedAmount / termMonths;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, termMonths) - 1;
    return financedAmount * (numerator / denominator);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayments = monthlyPayment * termMonths;
  const totalInterest = totalPayments - financedAmount;

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="ysp-calculator cost-simulator">
      {/* Inputs Section */}
      <div className="ysp-inputs-panel">
        <h3 className="ysp-panel-title">Underwriting Parameters</h3>
        
        {/* Asset Class Selector */}
        <div className="ysp-input-group">
          <label className="ysp-selector-label" style={{ display: 'block', fontSize: '14px', marginBottom: '12px', fontWeight: 500 }}>Asset Class Category</label>
          <div className="ysp-asset-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {ASSET_CLASSES.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectedAssetId(asset.id)}
                className={`ysp-asset-btn ${selectedAssetId === asset.id ? 'active' : ''}`}
                style={{
                  backgroundColor: selectedAssetId === asset.id ? 'var(--accent-forest)' : 'var(--bg-tertiary)',
                  border: `1px solid ${selectedAssetId === asset.id ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                  color: selectedAssetId === asset.id ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div>{asset.name}</div>
                <div style={{ fontSize: '10px', color: selectedAssetId === asset.id ? 'var(--text-primary)' : 'var(--text-tertiary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  {asset.downPaymentRate}% down • {asset.baseApr.toFixed(2)}% APR
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Slider 1: Purchase Price */}
        <div className="ysp-input-group" style={{ marginTop: '24px' }}>
          <div className="ysp-input-header">
            <label htmlFor="purchasePriceRange">Equipment Purchase Price</label>
            <div className="ysp-input-numeric-wrapper">
              <span className="ysp-currency-symbol">$</span>
              <input
                type="number"
                id="purchasePriceInput"
                value={purchasePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPurchasePrice(Math.max(50000, Math.min(1000000, val)));
                }}
                min={50000}
                max={1000000}
                step={5000}
                className="ysp-numeric-input"
              />
            </div>
          </div>
          <input
            type="range"
            id="purchasePriceRange"
            min={50000}
            max={1000000}
            step={5000}
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="ysp-slider"
            style={{
              background: `linear-gradient(to right, var(--accent-emerald) ${((purchasePrice - 50000) / 950000) * 100}%, var(--bg-tertiary) ${((purchasePrice - 50000) / 950000) * 100}%)`
            }}
          />
          <div className="ysp-slider-labels">
            <span>$50K</span>
            <span>$500K</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Slider 2: Term Length */}
        <div className="ysp-input-group">
          <div className="ysp-input-header">
            <label htmlFor="termRange">Financing Term</label>
            <span className="ysp-input-badge highlight">{termMonths} Months</span>
          </div>
          <input
            type="range"
            id="termRange"
            min={12}
            max={72}
            step={12}
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="ysp-slider"
            style={{
              background: `linear-gradient(to right, var(--accent-emerald) ${((termMonths - 12) / 60) * 100}%, var(--bg-tertiary) ${((termMonths - 12) / 60) * 100}%)`
            }}
          />
          <div className="ysp-slider-labels">
            <span>12 Mo</span>
            <span>36 Mo</span>
            <span>72 Mo</span>
          </div>
        </div>
      </div>

      {/* Outputs Section */}
      <div className="ysp-outputs-panel">
        <h3 className="ysp-panel-title">Financing Summary</h3>

        <div className="ysp-metrics-stack">
          {/* Main Monthly Payment Metric */}
          <div className="ysp-main-metric">
            <span className="ysp-metric-label">Estimated Monthly Payment</span>
            <div className="ysp-metric-value-large animate-glow">
              {formatCurrency(monthlyPayment)}
              <span className="ysp-metric-unit">/ mo</span>
            </div>
            <div className="ysp-metric-annual-sub">
              Total Contract Funding: <strong className="highlight">{formatCurrency(totalPayments)}</strong>
            </div>
          </div>

          <div className="ysp-metrics-grid">
            {/* Metric: Required Down Payment */}
            <div className="ysp-grid-metric">
              <span className="ysp-grid-label">Required Down Payment</span>
              <span className="ysp-grid-value" style={{ color: downPaymentPercent === 0 ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
                {downPaymentPercent === 0 ? '0% Down ($0)' : formatCurrency(downPaymentAmount)}
              </span>
              <span className="ysp-grid-sub">{downPaymentPercent}% down payment rate</span>
            </div>

            {/* Metric: Total Interest Cost */}
            <div className="ysp-grid-metric">
              <span className="ysp-grid-label">Cost of Borrowing (Interest)</span>
              <span className="ysp-grid-value">{formatCurrency(totalInterest)}</span>
              <span className="ysp-grid-sub">Estimated {selectedAsset.baseApr}% fixed APR</span>
            </div>
          </div>
        </div>

        {/* Footnote / Trust text */}
        <div className="ysp-footer-disclaimer">
          Cost estimates assume top-tier institutional clearing rates and are matching against active credit pools. Fully perfected at funding.
        </div>
      </div>
    </div>
  );
}

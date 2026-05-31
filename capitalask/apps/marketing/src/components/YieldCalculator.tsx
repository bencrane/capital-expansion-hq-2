import React, { useState, useEffect } from 'react';

export default function YieldCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [wholesaleRate, setWholesaleRate] = useState<number>(2.0);
  const [retailRate, setRetailRate] = useState<number>(3.2);

  // Sync rates to ensure Retail is always >= Wholesale
  useEffect(() => {
    if (retailRate < wholesaleRate) {
      setRetailRate(wholesaleRate);
    }
  }, [wholesaleRate]);

  useEffect(() => {
    if (wholesaleRate > retailRate) {
      setWholesaleRate(retailRate);
    }
  }, [retailRate]);

  // Calculations
  const monthlyBorrowerCost = loanAmount * (retailRate / 100);
  const monthlyProviderReturn = loanAmount * (wholesaleRate / 100);
  const monthlyRetainedYsp = monthlyBorrowerCost - monthlyProviderReturn;

  const annualBorrowerCost = monthlyBorrowerCost * 12;
  const annualProviderReturn = monthlyProviderReturn * 12;
  const annualRetainedYsp = monthlyRetainedYsp * 12;

  // Percentage breakdown
  const providerPercent = (wholesaleRate / retailRate) * 100;
  const platformPercent = ((retailRate - wholesaleRate) / retailRate) * 100;

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleLoanAmountChange = (val: number) => {
    const clamped = Math.max(50000, Math.min(1000000, val));
    setLoanAmount(clamped);
  };

  return (
    <div className="ysp-calculator">
      {/* Inputs Section */}
      <div className="ysp-inputs-panel">
        <h3 className="ysp-panel-title">Underwriting Parameters</h3>
        
        {/* Slider 1: Loan Amount */}
        <div className="ysp-input-group">
          <div className="ysp-input-header">
            <label htmlFor="loanAmountRange">Asset Loan Amount</label>
            <div className="ysp-input-numeric-wrapper">
              <span className="ysp-currency-symbol">$</span>
              <input
                type="number"
                id="loanAmountInput"
                value={loanAmount}
                onChange={(e) => handleLoanAmountChange(Number(e.target.value))}
                min={50000}
                max={1000000}
                step={5000}
                className="ysp-numeric-input"
              />
            </div>
          </div>
          <input
            type="range"
            id="loanAmountRange"
            min={50000}
            max={1000000}
            step={5000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="ysp-slider"
            style={{
              background: `linear-gradient(to right, var(--accent-emerald) ${((loanAmount - 50000) / 950000) * 100}%, var(--bg-tertiary) ${((loanAmount - 50000) / 950000) * 100}%)`
            }}
          />
          <div className="ysp-slider-labels">
            <span>$50K</span>
            <span>$500K</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Slider 2: Wholesale Capital Buy Rate */}
        <div className="ysp-input-group">
          <div className="ysp-input-header">
            <label htmlFor="wholesaleRateRange">Wholesale Capital Buy Rate</label>
            <span className="ysp-input-badge">{wholesaleRate.toFixed(1)}% / mo</span>
          </div>
          <input
            type="range"
            id="wholesaleRateRange"
            min={1.5}
            max={3.0}
            step={0.1}
            value={wholesaleRate}
            onChange={(e) => setWholesaleRate(Number(e.target.value))}
            className="ysp-slider"
            style={{
              background: `linear-gradient(to right, var(--accent-emerald) ${((wholesaleRate - 1.5) / 1.5) * 100}%, var(--bg-tertiary) ${((wholesaleRate - 1.5) / 1.5) * 100}%)`
            }}
          />
          <div className="ysp-slider-labels">
            <span>1.5%</span>
            <span>2.2%</span>
            <span>3.0%</span>
          </div>
        </div>

        {/* Slider 3: Retail Quoted Rate */}
        <div className="ysp-input-group">
          <div className="ysp-input-header">
            <label htmlFor="retailRateRange">Retail Quoted Rate</label>
            <span className="ysp-input-badge highlight">{retailRate.toFixed(1)}% / mo</span>
          </div>
          <input
            type="range"
            id="retailRateRange"
            min={2.0}
            max={4.5}
            step={0.1}
            value={retailRate}
            onChange={(e) => setRetailRate(Number(e.target.value))}
            className="ysp-slider"
            style={{
              background: `linear-gradient(to right, var(--accent-emerald) ${((retailRate - 2.0) / 2.5) * 100}%, var(--bg-tertiary) ${((retailRate - 2.0) / 2.5) * 100}%)`
            }}
          />
          <div className="ysp-slider-labels">
            <span>2.0%</span>
            <span>3.2%</span>
            <span>4.5%</span>
          </div>
        </div>

        {/* Rate Delta / Spread indicator */}
        <div className="ysp-rate-delta-box">
          <div className="ysp-delta-bar-container">
            <div className="ysp-delta-bar-fill provider" style={{ width: `${providerPercent}%` }}></div>
            <div className="ysp-delta-bar-fill platform" style={{ width: `${platformPercent}%` }}></div>
          </div>
          <div className="ysp-delta-labels">
            <span className="ysp-delta-label-item provider">
              <span className="bullet"></span> Capital Provider ({wholesaleRate.toFixed(1)}%)
            </span>
            <span className="ysp-delta-label-item platform">
              <span className="bullet"></span> Retained YSP Spread ({(retailRate - wholesaleRate).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Outputs Section */}
      <div className="ysp-outputs-panel">
        <h3 className="ysp-panel-title">Yield Allocation</h3>

        <div className="ysp-metrics-stack">
          {/* Main Retained YSP Metric */}
          <div className="ysp-main-metric">
            <span className="ysp-metric-label">Retained Yield Spread Premium (YSP)</span>
            <div className="ysp-metric-value-large animate-glow">
              {formatCurrency(monthlyRetainedYsp)}
              <span className="ysp-metric-unit">/ mo</span>
            </div>
            <div className="ysp-metric-annual-sub">
              Annualized Yield: <strong className="highlight">{formatCurrency(annualRetainedYsp)} / yr</strong>
            </div>
          </div>

          <div className="ysp-metrics-grid">
            {/* Metric: Capital Provider Return */}
            <div className="ysp-grid-metric">
              <span className="ysp-grid-label">Provider Yield Return</span>
              <span className="ysp-grid-value">{formatCurrency(monthlyProviderReturn)} <span className="unit">/ mo</span></span>
              <span className="ysp-grid-sub">{formatCurrency(annualProviderReturn)} / yr</span>
            </div>

            {/* Metric: Total Borrower Cost */}
            <div className="ysp-grid-metric">
              <span className="ysp-grid-label">Total Borrower Cost</span>
              <span className="ysp-grid-value">{formatCurrency(monthlyBorrowerCost)} <span className="unit">/ mo</span></span>
              <span className="ysp-grid-sub">{formatCurrency(annualBorrowerCost)} / yr</span>
            </div>
          </div>
        </div>

        {/* Footnote / Trust text */}
        <div className="ysp-footer-disclaimer">
          Calculated using standard 30-day interest clearing models. Perfected via CapitalAsk's programmatic matching engine.
        </div>
      </div>
    </div>
  );
}

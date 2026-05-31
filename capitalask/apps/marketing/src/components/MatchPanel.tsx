import React, { useState, useEffect } from 'react';

type Scenario = {
  label: string;
  reqTitle: string;
  ref: string;
  rows: [string, string, boolean][];
  matches: [string, string, string, number][];
};

const SCENARIOS: Record<string, Scenario> = {
  cashflow: {
    label: "Term / Unitranche",
    reqTitle: "Mid-market manufacturer",
    ref: "CA-4471",
    rows: [
      ["Amount", "$28M", false],
      ["Use", "Acquisition + refi", false],
      ["Underwrite on", "Cash flow / EBITDA", true],
      ["EBITDA", "$9.4M", false],
      ["Structure", "Unitranche", false],
    ],
    matches: [
      ["MM", "Meridian Credit Partners", "Direct lender · Unitranche", 96],
      ["BH", "Blackford Harbor BDC", "Senior secured · Cash-flow", 91],
      ["NB", "Northbank Capital", "Bank · Sponsor-backed", 84],
      ["AX", "Axiom Mezzanine", "Junior / mezz · Growth", 79],
    ],
  },
  abl: {
    label: "Asset-Based",
    reqTitle: "Fast-growing distributor",
    ref: "CA-4488",
    rows: [
      ["Amount", "$18M line", false],
      ["Use", "Working capital", false],
      ["Underwrite on", "Borrowing base", true],
      ["Receivables", "$11M AR", false],
      ["Collateral", "AR + inventory", false],
    ],
    matches: [
      ["RV", "Rivelin Asset-Based", "ABL · Inventory + AR", 95],
      ["KS", "Keystone Working Capital", "ABL · Revolving line", 90],
      ["NB", "Northbank Capital", "Bank · ABL group", 82],
      ["MM", "Meridian Credit Partners", "Direct lender · ABL sleeve", 74],
    ],
  },
  factoring: {
    label: "Factoring",
    reqTitle: "Staffing & logistics firm",
    ref: "CA-4502",
    rows: [
      ["Volume", "$3M / mo", false],
      ["Use", "Bridge payroll vs. net-60 invoices", false],
      ["Underwrite on", "Invoice + debtor credit", true],
      ["Avg. invoice", "~$140K", false],
      ["Recourse", "Non-recourse pref.", false],
    ],
    matches: [
      ["FC", "Fundcrest Factoring", "Factor · Non-recourse", 94],
      ["LR", "Ledger Row Capital", "Factor · Spot + whole-ledger", 89],
      ["KS", "Keystone Working Capital", "AR finance · Recourse", 83],
      ["RV", "Rivelin Asset-Based", "ABL · AR-heavy", 71],
    ],
  },
};

const TYPE_TABS: [string, string][] = [
  ["cashflow", "Term / Unitranche"],
  ["abl", "Asset-Based"],
  ["factoring", "Factoring"],
];

export default function MatchPanel() {
  const [bars, setBars] = useState(false);
  const [type, setType] = useState("cashflow");

  useEffect(() => {
    const t = setTimeout(() => setBars(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setBars(false);
    const t = setTimeout(() => setBars(true), 80);
    return () => clearTimeout(t);
  }, [type]);

  const sc = SCENARIOS[type];

  return (
    <div className="panel-wrap">
      <div className="type-tabs">
        <span className="mono tt-lab">Financing type</span>
        {TYPE_TABS.map(([key, lbl]) => (
          <button
            key={key}
            type="button"
            className={`tt ${type === key ? "on" : ""}`}
            onClick={() => setType(key)}
          >
            {lbl}
          </button>
        ))}
      </div>
      
      <div className="panel">
        <div className="panel-top">
          <span className="dot" />
          <span className="mono">Live request · {sc.ref}</span>
          <span className="mono right">Matching complete</span>
        </div>
        
        <div className="panel-grid">
          <div className="req">
            <h4>{sc.reqTitle}</h4>
            <div className="who">Anonymized to lenders until you approve</div>
            <div className="req-rows">
              {sc.rows.map(([k, v, hl]) => (
                <div className="req-row" key={k}>
                  <span className="k">{k}</span>
                  <span className={`v ${hl ? "lime" : ""}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="matches">
            <div className="mh mono">
              <span>Ranked by mandate fit</span>
              <b>{sc.matches.length} matched</b>
            </div>
            
            {sc.matches.map(([lg, nm, ty, pct]) => (
              <div className="m-card" key={nm}>
                <div className="m-logo">{lg}</div>
                <div className="m-info">
                  <div className="nm">{nm}</div>
                  <div className="ty">{ty}</div>
                </div>
                <div className="m-fit">
                  <div className="pct">{pct}%</div>
                  <div className="lab">fit</div>
                  <div className="m-bar">
                    <i style={{ width: bars ? `${pct}%` : 0 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

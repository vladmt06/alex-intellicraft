import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, SlidersHorizontal, Download, ChevronDown, X, Check, ArrowUpDown, ExternalLink, FileText } from "lucide-react";

const regulatoryData = [
  ["Breakthrough Designation", "Yes (NSCLC)", "Yes (Solid tumors)", "No (Fast Track only)", "Yes (NSCLC)", "No", "No"],
  ["Fast Track", "Yes", "No", "Yes (PDAC)", "No", "No", "No"],
  ["Orphan Drug (PDAC)", "Yes", "No", "No", "No", "No", "No"],
  ["Priority Review likely", "Yes", "Yes", "Possible", "Unlikely", "No", "No"],
  ["Phase III in PDAC", "Yes (CodeBreaK 201)", "Yes (with cetuximab)", "Planned", "No", "No", "No"],
  ["Randomized data", "Yes (vs FOLFIRI)", "Yes (vs docetaxel)", "No", "No", "No", "No"],
  ["OS as primary endpoint", "Yes", "TBD", "TBD", "No (ORR)", "No", "No"],
  ["Earliest PDAC approval", "Q1 2029", "Q2 2029", "2030", "Unlikely", "2031+", "2031+"],
  ["Approval probability", "~44%", "~38%", "~25%", "~12%", "~15%", "~10%"],
  ["Key regulatory risk", "OS magnitude unclear", "Small cohort (n=80)", "No randomized data", "BMS deprioritizing", "Early stage", "Limited data"],
];

const activeFilters = [
  { label: "Region", value: "United States" },
  { label: "Target", value: "KRAS G12C" },
  { label: "Indication", value: "Pancreatic Cancer (PDAC)" },
  { label: "Phase", value: "Phase II+" },
];

const tableData = [
  {
    compound: "Sotorasib",
    sponsor: "Amgen",
    phase: "Phase III",
    indication: "PDAC (2L)",
    designation: "Breakthrough",
    orr: "21.1%",
    nPatients: 428,
    status: "Active",
    approvalProb: "44%",
    estApproval: "Q1 2029",
    trial: "CodeBreaK 201",
  },
  {
    compound: "Divarasib",
    sponsor: "Roche / Genentech",
    phase: "Phase III",
    indication: "PDAC (2L)",
    designation: "Breakthrough",
    orr: "44.4%",
    nPatients: 80,
    status: "Enrolling",
    approvalProb: "38%",
    estApproval: "Q2 2029",
    trial: "GDC-6036-001",
  },
  {
    compound: "RMC-6236",
    sponsor: "Revolution Medicines",
    phase: "Phase II",
    indication: "PDAC (all KRAS)",
    designation: "Fast Track",
    orr: "42.0%",
    nPatients: 210,
    status: "Enrolling",
    approvalProb: "25%",
    estApproval: "2030",
    trial: "RMC-6236-001",
  },
  {
    compound: "Adagrasib",
    sponsor: "BMS / Mirati",
    phase: "Phase II",
    indication: "PDAC (1L)",
    designation: "Breakthrough",
    orr: "33.3%",
    nPatients: 120,
    status: "At Risk",
    approvalProb: "12%",
    estApproval: "Unlikely",
    trial: "KRYSTAL-10",
  },
  {
    compound: "JDQ443",
    sponsor: "Novartis",
    phase: "Phase II",
    indication: "PDAC (2L)",
    designation: "—",
    orr: "18.2%",
    nPatients: 55,
    status: "Active",
    approvalProb: "15%",
    estApproval: "2031+",
    trial: "KontRASt-02",
  },
  {
    compound: "D-1553",
    sponsor: "InventisBio",
    phase: "Phase II",
    indication: "Solid Tumors",
    designation: "—",
    orr: "25.7%",
    nPatients: 70,
    status: "Active",
    approvalProb: "10%",
    estApproval: "2031+",
    trial: "D-1553-002",
  },
];

const columns = [
  { key: "compound", label: "Compound", width: "140px" },
  { key: "sponsor", label: "Sponsor", width: "150px" },
  { key: "phase", label: "Phase", width: "90px" },
  { key: "trial", label: "Trial ID", width: "130px" },
  { key: "designation", label: "FDA Designation", width: "120px" },
  { key: "orr", label: "ORR", width: "70px" },
  { key: "nPatients", label: "N", width: "60px" },
  { key: "status", label: "Status", width: "90px" },
  { key: "approvalProb", label: "P(Approval)", width: "95px" },
  { key: "estApproval", label: "Est. Approval", width: "110px" },
];

const statusStyles: Record<string, { bg: string; text: string }> = {
  Active: { bg: "hsl(0 0% 100% / 0.08)", text: "hsl(0 0% 75%)" },
  Enrolling: { bg: "hsl(0 0% 100% / 0.08)", text: "hsl(0 0% 85%)" },
  "At Risk": { bg: "hsl(0 50% 50% / 0.12)", text: "hsl(0 60% 65%)" },
};

const designationStyles: Record<string, { bg: string; text: string }> = {
  Breakthrough: { bg: "hsl(0 0% 100% / 0.1)", text: "hsl(0 0% 90%)" },
  "Fast Track": { bg: "hsl(0 0% 100% / 0.06)", text: "hsl(0 0% 65%)" },
  "—": { bg: "transparent", text: "hsl(0 0% 30%)" },
};

const DemoOutput = ({ darkMode }: { darkMode?: boolean }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([0, 1]);
  const [showRegulatory, setShowRegulatory] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const toggleRow = (i: number) => {
    setSelectedRows((prev) =>
      prev.includes(i) ? prev.filter((r) => r !== i) : [...prev, i]
    );
  };

  return (
    <div ref={containerRef} className="rounded-lg" style={{ background: darkMode ? "hsl(0 0% 5%)" : undefined }}>
      {/* Top bar — mimics an app toolbar */}
      <motion.div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid hsl(0 0% 12%)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 60% 50%)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(40 60% 50%)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(120 40% 45%)" }} />
          </div>
          <span className="text-[11px] font-mono" style={{ color: "hsl(0 0% 35%)" }}>
            alexandria / workspace / kras-pdac-us
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "hsl(120 30% 20% / 0.3)", color: "hsl(120 30% 60%)" }}>
            LIVE
          </span>
          <span className="text-[10px] font-mono" style={{ color: "hsl(0 0% 35%)" }}>
            Updated 2h ago
          </span>
        </div>
      </motion.div>

      {/* Query bar */}
      <motion.div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid hsl(0 0% 10%)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
          style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 14%)" }}
        >
          <Search size={14} style={{ color: "hsl(0 0% 35%)" }} />
          <span className="text-sm flex-1" style={{ color: "hsl(0 0% 65%)" }}>
            KRAS G12C inhibitors in pancreatic cancer — US regulatory pathway + competitive landscape
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "hsl(0 0% 12%)", color: "hsl(0 0% 40%)" }}>
            ⏎
          </span>
        </div>

        {/* Active filters */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <SlidersHorizontal size={12} style={{ color: "hsl(0 0% 35%)" }} />
          {activeFilters.map((f, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px]"
              style={{ background: "hsl(0 0% 100% / 0.06)", border: "1px solid hsl(0 0% 16%)", color: "hsl(0 0% 70%)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
            >
              <span style={{ color: "hsl(0 0% 40%)" }}>{f.label}:</span>
              <span style={{ color: "hsl(0 0% 85%)" }}>{f.value}</span>
              <X size={10} style={{ color: "hsl(0 0% 30%)" }} className="cursor-pointer ml-0.5" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Results header */}
      {/* View tabs */}
      <motion.div
        className="px-5 py-3"
        style={{ borderBottom: "1px solid hsl(0 0% 10%)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "hsl(0 0% 5%)", border: "1px solid hsl(0 0% 12%)" }}>
            {([
              { key: false, label: "Competitive Landscape", icon: <ArrowUpDown size={12} /> },
              { key: true, label: "Regulatory Pathway", icon: <FileText size={12} /> },
            ] as const).map((tab) => (
              <button
                key={String(tab.key)}
                onClick={() => setShowRegulatory(tab.key)}
                className="flex items-center gap-1.5 text-[12px] py-2 px-4 rounded-md transition-all duration-300"
                style={{
                  background: showRegulatory === tab.key ? "hsl(0 0% 14%)" : "transparent",
                  color: showRegulatory === tab.key ? "hsl(0 0% 93%)" : "hsl(0 0% 42%)",
                  fontWeight: showRegulatory === tab.key ? 500 : 400,
                  boxShadow: showRegulatory === tab.key ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 60%)" }}>
              6 compounds
            </span>
            <span className="text-[10px]" style={{ color: "hsl(0 0% 30%)" }}>·</span>
            <span className="text-[11px]" style={{ color: "hsl(0 0% 35%)" }}>
              28 trials · 8 FDA designations
            </span>
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors ml-2"
              style={{ background: "hsl(0 0% 10%)", color: "hsl(0 0% 55%)", border: "1px solid hsl(0 0% 14%)" }}
            >
              <Download size={11} /> Export
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showRegulatory ? (
          <motion.div
            key="landscape"
            className="overflow-auto"
            style={{ maxHeight: "320px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <table className="w-full text-[12px]" style={{ minWidth: "900px" }}>
              <thead>
                <tr style={{ background: "hsl(0 0% 7%)", borderBottom: "1px solid hsl(0 0% 12%)" }}>
                  <th className="px-4 py-3 text-left w-10">
                    <div
                      className="w-3.5 h-3.5 rounded border flex items-center justify-center cursor-pointer"
                      style={{ borderColor: "hsl(0 0% 25%)" }}
                    />
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-3 text-left font-medium whitespace-nowrap"
                      style={{ color: "hsl(0 0% 50%)", width: col.width }}
                    >
                      <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                        {col.label}
                        <ChevronDown size={10} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => {
                  const isSelected = selectedRows.includes(i);
                  const sStyle = statusStyles[row.status] || statusStyles.Active;
                  const dStyle = designationStyles[row.designation] || designationStyles["—"];

                  return (
                    <tr
                      key={i}
                      className="cursor-pointer transition-colors duration-150"
                      style={{
                        borderBottom: "1px solid hsl(0 0% 10%)",
                        background: isSelected ? "hsl(0 0% 100% / 0.03)" : "transparent",
                      }}
                      onClick={() => toggleRow(i)}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(0 0% 100% / 0.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = isSelected ? "hsl(0 0% 100% / 0.03)" : "transparent")}
                    >
                      <td className="px-4 py-3">
                        <div
                          className="w-3.5 h-3.5 rounded border flex items-center justify-center transition-all"
                          style={{
                            borderColor: isSelected ? "hsl(0 0% 60%)" : "hsl(0 0% 20%)",
                            background: isSelected ? "hsl(0 0% 100% / 0.15)" : "transparent",
                          }}
                        >
                          {isSelected && <Check size={9} style={{ color: "hsl(0 0% 90%)" }} />}
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="font-semibold flex items-center gap-1.5" style={{ color: "hsl(0 0% 93%)" }}>
                          {row.compound}
                          <ExternalLink size={10} style={{ color: "hsl(0 0% 30%)" }} />
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap" style={{ color: "hsl(0 0% 55%)" }}>{row.sponsor}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap" style={{ background: "hsl(0 0% 100% / 0.06)", color: "hsl(0 0% 75%)" }}>
                          {row.phase}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono whitespace-nowrap" style={{ color: "hsl(0 0% 45%)" }}>{row.trial}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: dStyle.bg, color: dStyle.text }}>
                          {row.designation}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "hsl(0 0% 90%)" }}>{row.orr}</td>
                      <td className="px-3 py-3 font-mono whitespace-nowrap" style={{ color: "hsl(0 0% 50%)" }}>{row.nPatients}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: sStyle.bg, color: sStyle.text }}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono font-bold whitespace-nowrap" style={{ color: Number(row.approvalProb.replace('%','')) > 30 ? "hsl(0 0% 100%)" : "hsl(0 0% 50%)" }}>
                        {row.approvalProb}
                      </td>
                      <td className="px-3 py-3 font-mono whitespace-nowrap" style={{ color: "hsl(0 0% 55%)" }}>{row.estApproval}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            key="regulatory"
            className="overflow-x-auto px-5 py-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid hsl(0 0% 12%)" }}>
              <table className="w-full text-[11px]" style={{ minWidth: "800px" }}>
                <thead>
                  <tr style={{ background: "hsl(0 0% 7%)", borderBottom: "1px solid hsl(0 0% 12%)" }}>
                    <th className="px-3 py-2.5 text-left font-medium" style={{ color: "hsl(0 0% 50%)", width: "180px" }}>Dimension</th>
                    {tableData.map((r) => (
                      <th key={r.compound} className="px-3 py-2.5 text-left font-medium" style={{ color: "hsl(0 0% 70%)" }}>{r.compound}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regulatoryData.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid hsl(0 0% 10%)" }}>
                      <td className="px-3 py-2.5 font-medium whitespace-nowrap" style={{ color: "hsl(0 0% 75%)" }}>{row[0]}</td>
                      {row.slice(1).map((cell, j) => (
                        <td
                          key={j}
                          className="px-3 py-2.5 whitespace-nowrap"
                          style={{
                            color: cell.startsWith("Yes") || cell.startsWith("~4") ? "hsl(0 0% 90%)" :
                                   cell.startsWith("No") || cell === "Unlikely" ? "hsl(0 0% 35%)" :
                                   "hsl(0 0% 55%)",
                            fontWeight: row[0] === "Approval probability" ? 600 : 400,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — sources & pagination */}
      <motion.div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid hsl(0 0% 10%)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {["AACT", "FDA Drugs@FDA", "SEC EDGAR", "ClinicalTrials.gov"].map((src, i) => (
            <span
              key={src}
              className="text-[10px] font-mono px-2 py-1 rounded"
              style={{ background: "hsl(0 0% 8%)", color: "hsl(0 0% 35%)", border: "1px solid hsl(0 0% 12%)" }}
            >
              {src}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px]" style={{ color: "hsl(0 0% 35%)" }}>
          <span>1–6 of 6</span>
          <div className="flex gap-1">
            <button className="px-2 py-0.5 rounded" style={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 14%)" }}>‹</button>
            <button className="px-2 py-0.5 rounded" style={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 14%)" }}>›</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoOutput;

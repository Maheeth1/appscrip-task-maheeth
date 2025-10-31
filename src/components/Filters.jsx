"use client";
import { useState } from "react";
import styles from "./Filters.module.css";

/**
 * Filters component — modern UI matching Figma:
 * - sections: occasion, work, fabric, segment, suitableFor, rawMaterial, pattern
 * - storing filter state in localStorage and dispatching event "plpFiltersChanged"
 */
export default function Filters() {
  const [expanded, setExpanded] = useState(true);
  const [filters, setFilters] = useState({
    occasion: "all",
    work: "all",
    fabric: "all",
    segment: "all",
    suitableFor: "all",
    rawMaterial: "all",
    pattern: "all",
    maxPrice: 1000,
  });

  function update(key, value) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    // persist & notify
    try {
      localStorage.setItem("plp_filters", JSON.stringify(next));
      window.dispatchEvent(new Event("plpFiltersChanged"));
    } catch (e) { /* ignore */ }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header} onClick={() => setExpanded(s => !s)}>
        <strong>Filters</strong>
        <button aria-expanded={expanded} className={styles.collapseBtn}>{expanded ? "−" : "+"}</button>
      </div>

      {expanded && (
        <div className={styles.body}>
          <div className={styles.section}>
            <label className={styles.label}>Occasion</label>
            <select value={filters.occasion} onChange={(e) => update("occasion", e.target.value)} className={styles.select}>
              <option value="all">All</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="party">Party</option>
            </select>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.section}>
              <label className={styles.label}>Work</label>
              <select value={filters.work} onChange={(e) => update("work", e.target.value)} className={styles.select}>
                <option value="all">All</option>
                <option value="office">Office</option>
                <option value="field">Field</option>
              </select>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>Fabric</label>
              <select value={filters.fabric} onChange={(e) => update("fabric", e.target.value)} className={styles.select}>
                <option value="all">All</option>
                <option value="cotton">Cotton</option>
                <option value="polyester">Polyester</option>
                <option value="silk">Silk</option>
              </select>
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Segment</label>
            <select value={filters.segment} onChange={(e) => update("segment", e.target.value)} className={styles.select}>
              <option value="all">All</option>
              <option value="mens">Men</option>
              <option value="womens">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.section}>
              <label className={styles.label}>Suitable For</label>
              <select value={filters.suitableFor} onChange={(e) => update("suitableFor", e.target.value)} className={styles.select}>
                <option value="all">All</option>
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor</option>
              </select>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>Pattern</label>
              <select value={filters.pattern} onChange={(e) => update("pattern", e.target.value)} className={styles.select}>
                <option value="all">All</option>
                <option value="plain">Plain</option>
                <option value="printed">Printed</option>
              </select>
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Max price: ${filters.maxPrice}</label>
            <input className={styles.range} type="range" min="10" max="2000" value={filters.maxPrice} onChange={(e)=>update("maxPrice", e.target.value)} />
          </div>

          <div className={styles.actions}>
            <button className={styles.clearBtn} onClick={() => { 
              const reset = { occasion:"all", work:"all", fabric:"all", segment:"all", suitableFor:"all", rawMaterial:"all", pattern:"all", maxPrice:1000 };
              setFilters(reset);
              localStorage.setItem("plp_filters", JSON.stringify(reset));
              window.dispatchEvent(new Event("plpFiltersChanged"));
            }}>Clear</button>
            <button className={styles.applyBtn} onClick={() => window.dispatchEvent(new Event("plpFiltersChanged"))}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

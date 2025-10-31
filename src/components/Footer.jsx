"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ display:"flex", justifyContent:"space-between", gap:20, alignItems:"flex-start", flexWrap:"wrap" }}>
        <div style={{ minWidth:220 }}>
          <strong>Appscrip</strong>
          <p style={{ marginTop:8, color:"var(--muted)" }}>Quality products curated for you.</p>
        </div>

        <div style={{ minWidth:160 }}>
          <strong>Contact</strong>
          <p style={{ marginTop:8, color:"var(--muted)" }}>support@domain.example</p>
        </div>

        <div style={{ minWidth:160 }}>
          <strong>Follow</strong>
          <div style={{ marginTop:8, display:"flex", gap:8 }}>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
          </div>
        </div>
      </div>

      <div style={{ textAlign:"center", color:"var(--muted)", padding:"20px 0", borderTop:"1px solid #eef2f6", marginTop:24 }}>
        © {new Date().getFullYear()} Appscrip — All rights reserved
      </div>
    </footer>
  );
}

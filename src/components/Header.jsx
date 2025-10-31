"use client";
import Link from "next/link";
import styles from "../styles/Header.module.css";

/* simple svgs inline for icons — replace with exported SVGs if you have them */
const Icon = ({ name }) => {
  if (name === "search") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6"/></svg>;
  if (name === "heart") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.8 8.6c0 6.2-8.8 11-8.8 11s-8.8-4.8-8.8-11a5 5 0 0 1 8.8-3.6A5 5 0 0 1 20.8 8.6z" stroke="currentColor" strokeWidth="1" fill="none"/></svg>;
  if (name === "bag") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 7h12l-1 13H7L6 7z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>;
  if (name === "profile") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M4 20c.5-4 7-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>;
  if (name === "lang") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" /></svg>;
  return null;
};

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand}>Appscrip</Link>

          <nav className={styles.nav}>
            <Link href="/">Shop</Link>
            <Link href="/">Skills</Link>
            <Link href="/">Stories</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact Us</Link>
          </nav>
        </div>

        <div className={styles.right}>
          <button className={styles.iconBtn} aria-label="Search"><Icon name="search"/></button>
          <button className={styles.iconBtn} aria-label="Wishlist"><Icon name="heart"/></button>
          <button className={styles.iconBtn} aria-label="Bag"><Icon name="bag"/></button>
          <button className={styles.iconBtn} aria-label="Profile"><Icon name="profile"/></button>
          <button className={styles.iconBtn} aria-label="Language"><Icon name="lang"/></button>
        </div>
      </div>
    </header>
  );
}

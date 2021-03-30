import React from "react";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      {/* <header>Header</header> */}
      <article>{children}</article>
      {/* <footer>footer</footer> */}
    </div>
  );
}

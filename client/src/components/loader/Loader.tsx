import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.skCubeGrid}>
      <div className={styles.skCube1} />
      <div className={styles.skCube2} />
      <div className={styles.skCube3} />
      <div className={styles.skCube4} />
      <div className={styles.skCube5} />
      <div className={styles.skCube6} />
      <div className={styles.skCube7} />
      <div className={styles.skCube8} />
      <div className={styles.skCube9} />
    </div>
  </div>
);

export default Loader;

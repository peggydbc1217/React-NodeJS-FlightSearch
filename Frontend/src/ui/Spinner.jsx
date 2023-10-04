import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={`${styles.spinnerContainer} mt-2`}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;

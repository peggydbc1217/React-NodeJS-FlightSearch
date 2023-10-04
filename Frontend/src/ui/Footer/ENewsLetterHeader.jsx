import styles from "./ENewsLetter.module.scss"; // Import your SCSS module
function ENewsLetterHeader() {
  return (
    <>
      <h4 className={`text-white mb-3 text-left`}>Join Our Newsletter</h4>
      <div className={`d-flex gap-2 ${styles["mb-32"]} text-center`}>
        <p className={`h1 m-0 text-white fw-bold fs-6`}>Get Instant Discount</p>
        <div
          className={`bg-light d-flex align-items-end rounded ${styles.eNewsLetterAmount}`}
        >
          <h5 className={`text-secondary fw-bold m-0 me-2`}>USD</h5>
          <h2 className={`text-secondary fw-bold m-0`}>$ 100</h2>
        </div>
      </div>
    </>
  );
}

export default ENewsLetterHeader;

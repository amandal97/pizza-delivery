import styles from "../styles/Add.module.css";

function AddButton({ setModal }) {
  return (
    <div onClick={() => setModal(true)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
}

export default AddButton;

import React from "react";
import styles from "../styles/OrderDetails.module.css";

function OrderDetails({ total, createOrder }) {
  const [customer, setCustomer] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleOrder = () => {
    createOrder({
      customer,
      address,
      total,
      method: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ₹{total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            placeholder="18/1, Jadavpur Central Road, Kolkata-32"
            type="text"
            className={styles.textArea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleOrder}>
          Order
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;

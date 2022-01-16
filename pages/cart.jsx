import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "../components/OrderDetails";
import { reset } from "../redux/cartSlice";
import styles from "../styles/Cart.module.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);
  const [cash, setCash] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const createOrder = async (data) => {
    console.log("order", data);
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product, index) => (
              <tr className={styles.tr} key={`${product._id}${index}`}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src="/img/pizza.png"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text},&nbsp;</span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.totalPrice}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.totalPrice * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}>
                CASH ON DELIVERY
              </button>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
  );
}

export default Cart;

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <a
        target="_blank"
        rel="noreferrer"
        href={"https://github.com/amandal97/pizza-delivery"}>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image src="/img/github.png" alt="" width="39" height="39" />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>CHECK NOW!</div>
            <div className={styles.text}>7001133216</div>
          </div>
        </div>
      </a>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo1.png" alt="" width="80px" height="69px" />
          <Link href="/admin" passHref>
            <li className={styles.listItem}>Admin</li>
          </Link>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{cartQuantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;

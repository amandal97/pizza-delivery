import axios from "axios";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";

function Product({ pizza }) {
  const dispatch = useDispatch();
  const [price, setPrice] = React.useState(pizza.prices[0]);
  const [ingredientPrice, setIngredientPrice] = React.useState(0);
  const [extras, setExtras] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);

  const handlePrice = (size) => {
    setPrice(pizza.prices[size]);
  };

  const handleIngredientChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      setIngredientPrice((prevState) => prevState + option.price);
      setExtras((prevState) => [...prevState, option]);
    } else {
      setIngredientPrice((prevState) => prevState - option.price);
      setExtras((prevState) =>
        prevState.filter((extra) => extra._id !== option._id)
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...pizza, extras, totalPrice, quantity }));
  };

  const totalPrice = price + ingredientPrice;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" alt="" objectFit="contain" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${totalPrice}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handlePrice(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handlePrice(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handlePrice(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleIngredientChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            type="number"
            value={quantity}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;

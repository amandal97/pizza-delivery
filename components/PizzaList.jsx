import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

function PizzaList({ pizzaList }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        That dreamy slice may be your top pick because of the specialty crust,
        but it isn’t only great because of the crust. If the sauce, cheese, or
        toppings don’t work, a savoury crust goes to waste. It’s the glorious
        harmony of these key ingredients that makes the perfect pie.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;

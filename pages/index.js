import axios from "axios";
import Head from "next/head";
import React from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [modal, setModal] = React.useState(false);
  return (
    <div>
      <Head>
        <title>Pizza Delivery</title>
        <meta name="description" content="Best Pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setModal={setModal} />}
      <PizzaList pizzaList={pizzaList} />
      {modal && <Add setModal={setModal} />}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(`${process.env.BASE_URL}/api/products`);
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

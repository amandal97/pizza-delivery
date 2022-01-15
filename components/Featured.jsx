import React from "react";
import Image from "next/image";
import styles from "../styles/Featured.module.css";

const images = [
  "/img/featured.jpg",
  "/img/featured2.jpg",
  "/img/featured3.jpg",
];

function Featured() {
  const [index, setIndex] = React.useState(0);

  const handleArrow = (direction) => {
    if (direction === "l")
      setIndex(index === 0 ? images.length - 1 : index - 1);
    else setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  console.log("arrow", index);

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}>
        <Image
          src="/img/arrowl.png"
          alt=""
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}>
        {images.map((image, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image
              src={image}
              alt=""
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}>
        <Image
          src="/img/arrowr.png"
          alt=""
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
}

export default Featured;

import React from "react";
import styles from "./OutOfStockCard.module.css";   

const OutOfStockCard = ({ product }) => {
	const symbols = {
		USD: "$", // USD Currency
		EUR: "€", // EUR Currency
		JPY: "¥", // JPY Currency
	};

	return (
		<div className={styles.outOfStockCard}>
			<div className={styles.productCard_img_container}>
				<img
					src={product.imgMain}
					alt={product.name}
					className={styles.productCard_img}
				/>
				<div className={styles.outOfStockOverlay}>
					<span className={styles.outOfStockText}>OUT OF STOCK</span>
				</div>
			</div>
			<div className={styles.productCard_info}>
				<p>{product.name + " " + product.type}</p>
				<p className={styles.productCard_price}>
					{symbols[product.currency] + product.price.toString() + ".00"}
				</p>
			</div>
		</div>
	);
};

export default OutOfStockCard;
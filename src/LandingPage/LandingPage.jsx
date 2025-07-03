import React, { useContext } from "react";
import styles from "./LandingPage.module.css";
import Context from "../UseContext/Context.js";
import ProductCard from "./ProductCards/ProductCard.jsx";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import OutOfStockCard from "./ProductCards/OutofStockCard/OutOfStockCard.jsx";

const LandingPage = ({ sort }) => {
	const data = useContext(Context).data || [];
	const filteredData = Array.isArray(data)
		? data.filter((product) => product?.gender === sort)
		: [];
	return (
		<div className={styles.landingPage}>
			<div className={styles.landingPage_header}>
				<p>Category Name</p>
			</div>
			<div className={styles.productCard_container}>
				{filteredData.map((product) => (
					product.inStock === true ?
					<Link
						to={`/${product.gender.toLowerCase()}/${product.id}`}
						key={product.id}
						className={styles.productCard}
					>
						<ProductCard product={product} />
					</Link>
					:
					<div
						key={product.id}
						className={styles.productCard}
					>
						<OutOfStockCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
};

export default LandingPage;

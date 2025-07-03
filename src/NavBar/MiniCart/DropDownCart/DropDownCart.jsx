import React from "react";
import styles from "./DropDownCart.module.css";
import { useNavigate } from "react-router-dom";

const DropDownCart = ({ cartItems, setCartItems }) => {
	const navigate = useNavigate();

	const handleSizeSelect = (index, newSize) => {
		setCartItems((prev) => {
			const currentItem = prev[index];
			const product = currentItem;
			const selectedSize = currentItem.selectedSize.size;

			const existingItemWithNewSize = prev.find(
				(item, i) =>
					i !== index &&
					item.id === product.id &&
					item.selectedSize.size === newSize
			);

			const newSizeStock =
				product.sizes.find((s) => s.size === newSize)?.stock || 0;

			const updatedCart = prev.reduce((acc, item, i) => {
				if (i === index) return acc;

				if (item.id === product.id && item.selectedSize.size === newSize) {
					const mergedQuantity = Math.min(
						item.selectedSize.quantity + product.selectedSize.quantity,
						newSizeStock
					);

					acc.push({
						...item,
						selectedSize: {
							...item.selectedSize,
							quantity: mergedQuantity,
						},
					});
					return acc;
				}

				acc.push(item);
				return acc;
			}, []);

			if (!existingItemWithNewSize) {
				updatedCart.push({
					...product,
					selectedSize: {
						...product.selectedSize,
						size: newSize,
						quantity: Math.min(product.selectedSize.quantity, newSizeStock),
					},
				});
			}

			return updatedCart;
		});
	};

	const increaseQuantity = (index) => {
		setCartItems((prev) =>
			prev.map((item, i) =>
				i === index
					? {
							...item,
							selectedSize: {
								...item.selectedSize,
								quantity: item.selectedSize.quantity + 1,
							},
					  }
					: item
			)
		);
	};

	const decreaseQuantity = (index) => {
		setCartItems((prev) =>
			prev.map((item, i) =>
				i === index
					? {
							...item,
							selectedSize: {
								...item.selectedSize,
								quantity: Math.max(1, item.selectedSize.quantity - 1),
							},
					  }
					: item
			)
		);
	};

	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.selectedSize.quantity,
		0
	);

	const getCurrencySymbol = (currency) => {
		return currency === "USD" ? "$" : currency === "EUR" ? "€" : "¥";
	};

	return (
		<div className={styles.cartContainer}>
			<div className={styles.cartHeader}>
				<h2>My Bag</h2>
				<span className={styles.itemCount}>
					{cartItems.reduce(
						(count, item) => count + item.selectedSize.quantity,
						0
					)}{" "}
					Items
				</span>
			</div>

			<div className={styles.cartItems}>
				{cartItems.map((item, index) => (
					<div key={index} className={styles.cartItem}>
						<div className={styles.itemInfo}>
							<h3 className={styles.itemName}>{item.name}</h3>
							<p className={styles.itemPrice}>
								{getCurrencySymbol(item.currency)}
								{item.price.toFixed(2)}
							</p>

							<div className={styles.sizeSelector}>
								<p className={styles.sizeLabel}>Size:</p>
								<div className={styles.sizeOptions}>
									{item.sizes.map(({ size }) => (
										<button
											key={size}
											className={`${styles.sizeOption} ${
												item.selectedSize.size === size ? styles.selected : ""
											}`}
											onClick={() => handleSizeSelect(index, size)}
										>
											{size}
										</button>
									))}
								</div>
							</div>
						</div>

						<div className={styles.quantityControls}>
							<button
								className={styles.quantityBtn}
								onClick={() => increaseQuantity(index)}
							>
								+
							</button>
							<span className={styles.quantity}>
								{item.selectedSize.quantity}
							</span>
							<button
								className={styles.quantityBtn}
								onClick={() => decreaseQuantity(index)}
							>
								-
							</button>
						</div>

						<div className={styles.itemImage}>
							<img
								src={item.imgMain}
								alt={item.name}
								className={styles.productCard_img}
							/>
						</div>
					</div>
				))}
			</div>

			<div className={styles.cartTotal}>
				<p>Total</p>
				<p className={styles.totalAmount}>
					{getCurrencySymbol(cartItems[0]?.currency)}
					{total.toFixed(2)}
				</p>
			</div>

			<div className={styles.cartActions}>
				<button className={styles.viewBagBtn} onClick={() => navigate("/Cart")}>
					VIEW BAG
				</button>
				<button className={styles.checkoutBtn} onClick={() => navigate("/details")}>
					CHECK OUT
				</button>
			</div>
		</div>
	);
};

export default DropDownCart;
import React, { useState } from "react";
import styles from "./CurrencyDropdown.module.css";

const CurrencyDropdown = ({ setData, setCartItems }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState({ symbol: "$", code: "USD" });
	const currencies = [
		{ symbol: "$", code: "USD" },
		{ symbol: "€", code: "EUR" },
		{ symbol: "¥", code: "JPY" },
	];
	const handleSelect = (currency) => {
		setSelected(currency);
		setIsOpen(false);
		const rates = {
			USD: 1, // Base currency
			EUR: 1.2, // 1 USD = 0.85 EUR
			JPY: 145, // 1 USD = 110 JPY
		};

		setData((prevProducts) => 
			prevProducts.map((product) => ({
				...product,
				price: product.originalPrice * rates[currency.code],
				currency: currency.code
			}))
		);

		setCartItems(prevCartItems =>
			prevCartItems.map(item => ({
				...item,
				price: item.originalPrice * rates[currency.code],
				currency: currency.code
			}))
		);
	};

	return (
		<div className={styles.dropdown}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={styles.dropdownButton}
			>
				<span className={styles.symbol}>{selected.symbol}</span>
				<span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}>
					▼
				</span>
			</button>

			{isOpen && (
				<>
					<div
						className={styles.backdrop}
						onClick={() => setIsOpen(false)}
					></div>

					<div className={styles.menu}>
						{currencies.map((currency) => (
							<button
								key={currency.code}
								onClick={() => handleSelect(currency)}
								className={`${styles.option} ${
									selected.code === currency.code ? styles.selected : ""
								}`}
							>
								<span className={styles.symbol}>{currency.symbol}</span>
								<span className={styles.code}>{currency.code}</span>
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CurrencyDropdown;

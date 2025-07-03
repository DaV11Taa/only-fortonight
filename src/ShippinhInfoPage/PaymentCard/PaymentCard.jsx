import React, { useState } from "react";
import styles from "./PaymentCard.module.css";
import { useNavigate } from "react-router-dom";
import ShippingFooter from "../Footer/ShippingFooter";

const PaymentCard = () => {
	const [errors, setErrors] = useState({});
    const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		let newErrors = {};

		// Card Number
		if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber)) {
			newErrors.cardNumber = "Enter a valid card number";
		}

		// Holder Name
		if (!data.holderName || !/^[A-Za-z\s]{2,}$/.test(data.holderName)) {
			newErrors.holderName = "Enter the cardholder's full name";
		}

		// Expiration
		if (!data.expiration || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiration)) {
			newErrors.expiration = "Expiration must be in MM/YY format";
		} else {
			const [month, year] = data.expiration.split("/").map(Number);
			const now = new Date();
			const expiry = new Date(2000 + year, month);
			if (expiry < now) {
				newErrors.expiration = "Card is expired";
			}
		}

		// CVV
		if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
			newErrors.cvv = "Invalid CVV";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
            // here we will call the navigation to the next page
            navigate("/confirmationPage");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.iconWrapper}>
				</span>
				<p className={styles.title}>Credit Card</p>
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputGroup}>
					<input
						type="text"
						name="cardNumber"
						placeholder="Card Number"
						className={styles.input}
					/>
					<span className={styles.iconRight}>
					</span>
					{errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
				</div>

				<div className={styles.inputGroup}>
					<input
						type="text"
						name="holderName"
						placeholder="Holder Name"
						className={styles.input}
					/>
					{errors.holderName && <span className={styles.error}>{errors.holderName}</span>}
				</div>

				<div className={styles.row}>
					<div className={styles.inputGroup}>
						<input
							type="text"
							name="expiration"
							placeholder="Expiration (MM/YY)"
							className={styles.input}
						/>
						{errors.expiration && <span className={styles.error}>{errors.expiration}</span>}
					</div>

					<div className={styles.inputGroupWithIcon}>
						<input type="text" name="cvv" placeholder="CVV" className={styles.input} />
						<span className={styles.iconRight}>
						</span>
						{errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
					</div>
				</div>
				<ShippingFooter step={4} goToText="Pay Now" back="shipping"/>
			</form>
		</div>
	);
};

export default PaymentCard;

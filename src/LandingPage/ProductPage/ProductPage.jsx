import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../../UseContext/Context";
import NavBar from "../../NavBar/NavBar";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
	const { id } = useParams();
	const { data } = useContext(Context);
	const { additionToCard } = useContext(Context);
	const product = data.find((product) => product.id == id);
	const symbols = {
		USD: "$", // USD Currency
		EUR: "€", // EUR Currency
		JPY: "¥", // JPY Currency
	};

	// functionality
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);

	const handleThumbnailClick = (index) => {
		if (index !== currentImageIndex) {
			setIsLoading(true);
			setCurrentImageIndex(index);
		}
	};

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleSizeSelect = (size) => {
		setSelectedSize(size);
	};

	const currentImage = product.ArraysOfImg[currentImageIndex];

	return (
		<>
			<NavBar />
			<div className={styles.container}>
				{/* Thumbnails Sidebar */}
				<div className={styles.thumbnailsSidebar}>
					{product.ArraysOfImg.map((image, index) => (
						<div className={styles.thumbnailContainer} key={index}>
							<img
								src={image}
								alt="opps"
								onClick={() => handleThumbnailClick(index)}
								tabIndex={0}
								className={styles.thumbnail}
							/>
						</div>
					))}
				</div>

				<div className={styles.mainImageHolder}>
					<div>
						<img
							src={currentImage}
							alt="bottle"
							className={styles.mainImage}
							onLoad={handleImageLoad}
						/>
					</div>
				</div>
				<div className={styles.infobox}>
					<div className={styles.info}>
						<div className={styles.upperInfo}>
							<div>
								<p className={styles.productName}>{product.name}</p>
								<p className={styles.productType}>{product.type}</p>
							</div>

							<div className={styles.sizeContainer}>
								<div className="">
									{/* Size Label */}
									<div className="">
										<span className={styles.sizeLabel}>SIZE:</span>
									</div>

									{/* Size Options */}
									<div className={styles.sizeOptions}>
										{product.sizes.map((sizes, index) => (
											<button
												key={index}
												onClick={() => handleSizeSelect(sizes.size)}
												className={styles.sizeOption}
												data-selected={selectedSize === sizes.size}
											>
												{sizes.size}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className={styles.lowerInfo}>
							<div className={styles.priceContainer}>
								<span>PRICE:</span>
								<p className={styles.price}>
									{symbols[product.currency] + product.price + ".00"}
								</p>
							</div>
							<div className={styles.addToCartContainer}>
								<button
									className={styles.addToCartButton}
									onClick={() =>
										additionToCard(selectedSize, product, "increase")
									}
								>
									ADD TO CART
								</button>
							</div>
							<div className={styles.descriptionContainer}>
								<p className={styles.description}>{product.description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPage;

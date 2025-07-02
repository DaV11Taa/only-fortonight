export const products = [
	// WOMEN
	{
		id: 1,
		gender: "WOMEN",
		name: "Apollo",
		type: "Running Short",
		imgMain: "/images/WOMEN_running_shorts.jpg",
		ArraysOfImg: [
			"/images/WOMEN_running_shorts.jpg",
			"/images/WOMEN_Running_Short_2.jpg",
			"/images/WOMEN_Running_Short_3.jpg",
		],
		sizes: [
			{ size: "XS", stock: 10 },
			{ size: "S", stock: 10 },
			{ size: "M", stock: 5 },
			{ size: "L", stock: 0 },
		],
		price: 50.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 50.0,

		description:
			"Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.",
	},
	{
		id: 2,
		gender: "WOMEN",
		name: "Athena",
		type: "Yoga Pants",
		imgMain: "/images/WOMEN_Yoga_Pants.jpg",
		ArraysOfImg: [
			"/images/WOMEN_Yoga_Pants.jpg",
			"/images/WOMEN_Yoga_Pants_2.jpg",
			"/images/WOMEN_Yoga_Pants_3.jpg",
		],
		sizes: [
			{ size: "S", stock: 10 },
			{ size: "M", stock: 5 },
			{ size: "L", stock: 0 },
		],
		price: 65.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 65.0,
		description:
			"Flexible, high-rise yoga pants that support your every move. Made from breathable fabric ideal for workouts or lounging.",
	},
	{
		id: 3,
		gender: "WOMEN",
		name: "Iris",
		type: "Tank Top",
		imgMain: "/images/WOMEN_Tank_Top_.jpg",
		ArraysOfImg: [
			"/images/WOMEN_Tank_Top_.jpg",
			"/images/WOMEN_Tank_Top_2.jpg",
			"/images/WOMEN_Tank_Top_3.jpg",
		],
		sizes: [
			{ size: "XS", stock: 10 },
			{ size: "S", stock: 5 },
			{ size: "M", stock: 9 },
		],
		price: 35.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 35.0,
		description:
			"Lightweight tank top with moisture-wicking technology. Perfect for hot yoga or sunny day jogs.",
	},
	{
		id: 4,
		gender: "WOMEN",
		name: "Luna",
		type: "Windbreaker Jacket",
		imgMain: "/images/WOEMN_Windbreaker_Jacket.jpg",
		ArraysOfImg: [
			"/images/WOEMN_Windbreaker_Jacket.jpg",
			"/images/WOEMN_Windbreaker_Jacket_2.jpg",
			"/images/WOEMN_Windbreaker_Jacket_3.jpg",
		],
		sizes: [
			{ size: "M", stock: 5 },
			{ size: "L", stock: 10 },
		],
		price: 90.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 90.0,

		description:
			"Stay dry and stylish with this windbreaker featuring adjustable hoods and water-resistant finish.",
	},
	{
		id: 5,
		gender: "WOMEN",
		name: "Juno",
		type: "Sports Bra",
		imgMain: "/images/WOMEN_Sports_Bra.jpg",
		ArraysOfImg: [
			"/images/WOMEN_Sports_Bra.jpg",
			"/images/WOMEN_Sports_Bra_2.jpg",
			"/images/WOMEN_Sports_Bra_3.jpg",
		],
		sizes: [
			{ size: "XS", stock: 10 },
			{ size: "S", stock: 10 },
			{ size: "M", stock: 5 },
			{ size: "L", stock: 0 },
		],
		price: 40.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 40.0,
		description:
			"Supportive yet comfortable sports bra designed for medium to high impact workouts.",
	},
	{
		id: 6,
		gender: "WOMEN",
		name: "Nova",
		type: "Training Shoes",
		imgMain: "/images/WOMEN_Training_Shoes.jpg",
		ArraysOfImg: [
			"/images/WOMEN_Training_Shoes.jpg",
			"/images/WOMEN_Training_Shoes_2.jpg",
			"/images/WOMEN_Training_Shoes_3.jpg",
		],
		sizes: [
			{ size: "36", stock: 10 },
			{ size: "37", stock: 10 },
			{ size: "38", stock: 10 },
			{ size: "39", stock: 10 },
			{ size: "40", stock: 10 },
		],
		price: 120.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 120.0,
		description:
			"Lightweight training shoes engineered with responsive cushioning and grip for all terrains.",
	},

	// MEN
	{
		id: 7,
		gender: "MEN",
		name: "Zion",
		type: "Sport Tank",
		imgMain: "/images/MEN_Sport_Tank.jpg",
		ArraysOfImg: [
			"/images/MEN_Sport_Tank.jpg",
			"/images/MEN_Sport_Tank_2.jpg",
			"/images/MEN_Sport_Tank_3.jpg",
		],
		sizes: [
			{ size: "S", stock: 10 },
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
			{ size: "XL", stock: 10 },
		],
		price: 45.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 45.0,
		description:
			"Comfortable and durable sport tank made with breathable material. Perfect for workouts, yoga, or casual wear.",
	},
	{
		id: 8,
		gender: "MEN",
		name: "Thor",
		type: "Compression Shirt",
		imgMain: "/images/MEN_Compression_Shirt.jpg",
		ArraysOfImg: [
			"/images/MEN_Compression_Shirt.jpg",
			"/images/MEN_Compression_Shirt_2.jpg",
			"/images/MEN_Compression_Shirt_3.jpg",
		],
		sizes: [
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
			{ size: "XL", stock: 10 },
		],
		price: 60.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		description:
			"Muscle-enhancing compression shirt with sweat-wicking fabric for optimal performance.",
	},
	{
		id: 9,
		gender: "MEN",
		name: "Odin",
		type: "Track Pants",
		imgMain: "/images/MEN_Track_Pants.jpg",
		ArraysOfImg: [
			"/images/MEN_Track_Pants.jpg",
			"/images/MEN_Track_Pants_2.jpg",
			"/images/MEN_Track_Pants_3.jpg",
		],
		sizes: [
			{ size: "S", stock: 10 },
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
		],
		price: 70.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 70.0,
		description:
			"Track pants made with stretch material for ease of movement. Designed for training and casual use.",
	},
	{
		id: 10,
		gender: "MEN",
		name: "Ares",
		type: "Running Shoes",
		imgMain: "/images/MEN_Running_Shoes.jpg",
		ArraysOfImg: [
			"/images/MEN_Running_Shoes.jpg",
			"/images/MEN_Running_Shoes_2.jpg",
			"/images/MEN_Running_Shoes_3.jpg",
		],
		sizes: [
			{ size: "40", stock: 10 },
			{ size: "41", stock: 10 },
			{ size: "42", stock: 10 },
			{ size: "43", stock: 10 },
		],
		price: 130.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 130.0,
		description:
			"Engineered for long-distance runs. Shock-absorbing soles and breathable mesh upper.",
	},
	{
		id: 11,
		gender: "MEN",
		name: "Helios",
		type: "Hoodie",
		imgMain: "/images/MEN_Hoodie.jpg",
		ArraysOfImg: [
			"/images/MEN_Hoodie.jpg",
			"/images/MEN_Hoodie_2.jpg",
			"/images/MEN_Hoodie_3.jpg",
		],
		sizes: [
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
			{ size: "XL", stock: 10 },
		],
		price: 80.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 80.0,

		description:
			"Classic pullover hoodie with warm inner lining and adjustable drawstring.",
	},
	{
		id: 12,
		gender: "MEN",
		name: "Kairos",
		type: "Gym Shorts",
		imgMain: "/images/MEN_Gym_Shorts.jpg",
		ArraysOfImg: [
			"/images/MEN_Gym_Shorts.jpg",
			"/images/MEN_Gym_Shorts_2.jpg",
			"/images/MEN_Gym_Shorts_3.jpg",
		],
		sizes: [
			{ size: "S", stock: 10 },
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
		],
		price: 38.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 38.0,
		description:
			"Light and flexible gym shorts with quick-dry technology for intense workouts.",
	},

	// KIDS
	{
		id: 13,
		gender: "KIDS",
		name: "Pixel",
		type: "Graphic Tee",
		imgMain: "/images/KIDS_Graphic_Tee.jpg",
		ArraysOfImg: [
			"/images/KIDS_Graphic_Tee.jpg",
			"/images/KIDS_Graphic_Tee_2.jpg",
			"/images/KIDS_Graphic_Tee_3.jpg",
		],
		sizes: [
			{ size: "XS", stock: 10 },
			{ size: "S", stock: 10 },
			{ size: "M", stock: 10 },
		],
		price: 25.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 25.0,
		description:
			"Fun and colorful graphic tee made from 100% organic cotton. Great for everyday play.",
	},
	{
		id: 14,
		gender: "KIDS",
		name: "Bolt",
		type: "Joggers",
		imgMain: "/images/MEN_Joggers.jpg",
		ArraysOfImg: [
			"/images/MEN_Joggers.jpg",
			"/images/MEN_Joggers_2.jpg",
			"/images/MEN_Joggers_3.jpg",
		],
		sizes: [
			{ size: "S", stock: 10 },
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
		],
		price: 35.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 35.0,
		description:
			"Durable joggers with elastic waist and cuffs for maximum comfort during activity.",
	},
	{
		id: 15,
		gender: "KIDS",
		name: "Zippy",
		type: "Zip Hoodie",
		imgMain: "/images/KIDS_Zip_Hoodie.jpg",
		ArraysOfImg: [
			"/images/KIDS_Zip_Hoodie.jpg",
			"/images/KIDS_Zip_Hoodie_2.jpg",
			"/images/KIDS_Zip_Hoodie_3.jpg",
		],
		sizes: [
			{ size: "M", stock: 10 },
			{ size: "L", stock: 10 },
		],
		price: 45.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 45.0,
		description:
			"Bright and cozy zip hoodie with soft fleece lining to keep kids warm all day.",
	},
	{
		id: 16,
		gender: "KIDS",
		name: "Racer",
		type: "Sneakers",
		imgMain: "/images/KIDS_Sneakers.jpg",
		ArraysOfImg: [
			"/images/KIDS_Sneakers.jpg",
			"/images/KIDS_Sneakers_2.jpg",
			"/images/KIDS_Sneakers_3.jpg",
		],
		sizes: [
			{ size: "32", stock: 10 },
			{ size: "33", stock: 10 },
			{ size: "34", stock: 10 },
			{ size: "35", stock: 10 },
		],
		price: 55.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 55.0,
		description:
			"Sporty sneakers for kids with velcro straps and cushioned soles for active adventures.",
	},
	{
		id: 17,
		gender: "KIDS",
		name: "Tango",
		type: "Polo Shirt",
		imgMain: "/images/KIDS_Polo_Shirt.jpg",
		ArraysOfImg: [
			"/images/KIDS_Polo_Shirt.jpg",
			"/images/KIDS_Polo_Shirt_2.jpg",
			"/images/KIDS_Polo_Shirt_3.jpg",
		],
		sizes: [
			{ size: "XS", stock: 0 },
			{ size: "S", stock: 0 },
			{ size: "M", stock: 0 },
		],
		price: 30.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 30.0,
		description:
			"Stylish polo shirt that pairs well with jeans or shorts. Breathable fabric for comfort.",
	},
	{
		id: 18,
		gender: "KIDS",
		name: "Orbit",
		type: "Swim Shorts",
		imgMain: "/images/KIDS_Swim_Shorts.jpg",
		ArraysOfImg: [
			"/images/KIDS_Swim_Shorts.jpg",
			"/images/KIDS_Swim_Shorts_2.jpg",
			"/images/KIDS_Swim_Shorts_3.jpg",
		],
		sizes: [
			{ size: "S", stock: 4 },
			{ size: "M", stock: 5 },
			{ size: "L", stock: 7 },
		],
		price: 28.0,
		get inStock() {
			return this.sizes.some(size => size.stock > 0);
		},
		currency: "USD",
		originalPrice: 28.0,
		description:
			"Colorful swim shorts with quick-dry material and fun prints. Ideal for beach days.",
	},
];
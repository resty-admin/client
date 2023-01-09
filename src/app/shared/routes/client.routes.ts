import { CATEGORY_ID, DYNAMIC_ID, DYNAMIC_TOKEN, HALL_ID, PLACE_ID } from "../constants";

export const CLIENT_ROUTES = {
	AUTH: {
		path: "auth",
		absolutePath: "/auth"
	},
	SIGN_IN: {
		path: "sign-in",
		absolutePath: "/auth/sign-in"
	},
	SIGN_UP: {
		path: "sign-up",
		absolutePath: "/auth/sign-up"
	},
	FORGOT_PASSWORD: {
		path: "forgot-password",
		absolutePath: "/auth/forgot-password"
	},
	RESET_PASSWORD: {
		path: `reset-password/${DYNAMIC_TOKEN}`,
		absolutePath: `/auth/reset-password/${DYNAMIC_TOKEN}`
	},
	VERIFICATION_CODE: {
		path: `verification-code/${DYNAMIC_TOKEN}`,
		absolutePath: `/auth/verification-code/${DYNAMIC_TOKEN}`
	},
	TELEGRAM: {
		path: "telegram",
		absolutePath: "/auth/telegram"
	},
	GOOGLE: {
		path: "google",
		absolutePath: "/auth/google"
	},
	CLIENT: {
		path: "",
		absolutePath: "/"
	},
	PROFILE: {
		path: `profile`,
		absolutePath: `/profile`
	},
	WELCOME: {
		path: "welcome",
		absolutePath: "/welcome"
	},
	ALL_ORDERS: {
		path: `all-orders`,
		absolutePath: `/all-orders`
	},
	ACTIVE_ORDER: {
		path: `active-orders/${DYNAMIC_ID}`,
		absolutePath: `/active-orders/${DYNAMIC_ID}`
	},
	HISTORY_ORDER: {
		path: `history-orders/${DYNAMIC_ID}`,
		absolutePath: `/history-orders/${DYNAMIC_ID}`
	},
	REFERRAL_LINK: {
		path: `orders/${DYNAMIC_ID}/referral-link`,
		absolutePath: `/orders/${DYNAMIC_ID}/referral-link`
	},
	PRODUCTS_ERROR: {
		path: `orders/${DYNAMIC_ID}/products-error`,
		absolutePath: `/orders/${DYNAMIC_ID}/products-error`
	},
	PAYMENT_TYPE: {
		path: `orders/${DYNAMIC_ID}/payment-type`,
		absolutePath: `/orders/${DYNAMIC_ID}/payment-type`
	},
	PAYMENT_STATUS: {
		path: `orders/${DYNAMIC_ID}/payment-status`,
		absolutePath: `/orders/${DYNAMIC_ID}/payment-status`
	},
	PLACES: {
		path: "places",
		absolutePath: "/places"
	},
	PLACE: {
		path: `places/${PLACE_ID}`,
		absolutePath: `/places/${PLACE_ID}`
	},
	CONNECT_TO_TABLE: {
		path: `places/${PLACE_ID}/connect-to-table`,
		absolutePath: `/places/${PLACE_ID}/connect-to-table`
	},
	CONNECT_TO_ORDER: {
		path: `places/${PLACE_ID}/connect-to-order`,
		absolutePath: `/places/${PLACE_ID}/connect-to-order`
	},
	DASHBOARD: {
		path: `places/${PLACE_ID}/dashboard`,
		absolutePath: `/places/${PLACE_ID}/dashboard`
	},
	CATEGORIES: {
		path: `places/${PLACE_ID}/categories`,
		absolutePath: `/places/${PLACE_ID}/categories`
	},
	CATEGORY: {
		path: `places/${PLACE_ID}/categories/${CATEGORY_ID}`,
		absolutePath: `/places/${PLACE_ID}/categories/${CATEGORY_ID}`
	},
	PRODUCTS: {
		path: `places/${PLACE_ID}/categories/${CATEGORY_ID}/products`,
		absolutePath: `/places/${PLACE_ID}/categories/${CATEGORY_ID}/products`
	},
	PRODUCT: {
		path: `places/${PLACE_ID}/categories/${CATEGORY_ID}/products/${DYNAMIC_ID}`,
		absolutePath: `/places/${PLACE_ID}/categories/${CATEGORY_ID}/products/${DYNAMIC_ID}`
	},
	HALLS: {
		path: `places/${PLACE_ID}/halls`,
		absolutePath: `/places/${PLACE_ID}/halls`
	},
	HALL: {
		path: `places/${PLACE_ID}/halls/${HALL_ID}`,
		absolutePath: `/places/${PLACE_ID}/halls/${HALL_ID}`
	},
	TABLES: {
		path: `places/${PLACE_ID}/halls/${HALL_ID}/tables`,
		absolutePath: `/places/${PLACE_ID}/halls/${HALL_ID}/tables`
	},
	TABLE: {
		path: `places/${PLACE_ID}/halls/${HALL_ID}/tables/${DYNAMIC_ID}`,
		absolutePath: `/places/${PLACE_ID}/halls/${HALL_ID}/tables/${DYNAMIC_ID}`
	}
};

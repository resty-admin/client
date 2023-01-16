import { CATEGORY_ID, DYNAMIC_TOKEN, HALL_ID, ORDER_ID, PLACE_ID } from "./index";

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
		path: `active-orders/${ORDER_ID}`,
		absolutePath: `/active-orders/${ORDER_ID}`
	},
	CONFIRM_PRODUCTS: {
		path: `active-orders/${ORDER_ID}/confirm-products`,
		absolutePath: `/active-orders/${ORDER_ID}/confirm-products`
	},
	HISTORY_ORDER: {
		path: `history-orders/${ORDER_ID}`,
		absolutePath: `/history-orders/${ORDER_ID}`
	},
	REFERRAL_LINK: {
		path: `orders/${ORDER_ID}/referral-link`,
		absolutePath: `/orders/${ORDER_ID}/referral-link`
	},
	PRODUCTS_ERROR: {
		path: `orders/${ORDER_ID}/products-error`,
		absolutePath: `/orders/${ORDER_ID}/products-error`
	},
	PAYMENT_TYPE: {
		path: `orders/${ORDER_ID}/payment-type`,
		absolutePath: `/orders/${ORDER_ID}/payment-type`
	},
	PAYMENT_STATUS: {
		path: `orders/${ORDER_ID}/payment-status`,
		absolutePath: `/orders/${ORDER_ID}/payment-status`
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
	CREATE_ORDER: {
		path: `places/${PLACE_ID}/create-order`,
		absolutePath: `/places/${PLACE_ID}/create-order`
	},
	MENU: {
		path: `places/${PLACE_ID}/menu`,
		absolutePath: `/places/${PLACE_ID}/menu`
	},
	CATEGORIES: {
		path: `categories`,
		absolutePath: `/places/${PLACE_ID}/menu/categories`
	},
	CATEGORY: {
		path: `categories/${CATEGORY_ID}`,
		absolutePath: `/places/${PLACE_ID}/menu/categories/${CATEGORY_ID}`
	},
	PRODUCTS: {
		path: `categories/${CATEGORY_ID}/products`,
		absolutePath: `/places/${PLACE_ID}/menu/categories/${CATEGORY_ID}/products`
	},
	SCHEMA: {
		path: `places/${PLACE_ID}/schema`,
		absolutePath: `/places/${PLACE_ID}/schema`
	},
	HALLS: {
		path: `halls`,
		absolutePath: `/places/${PLACE_ID}/schema/halls`
	},
	HALL: {
		path: `halls/${HALL_ID}`,
		absolutePath: `/places/${PLACE_ID}/schema/halls/${HALL_ID}`
	},
	TABLES: {
		path: `halls/${HALL_ID}/tables`,
		absolutePath: `/places/${PLACE_ID}/schema/halls/${HALL_ID}/tables`
	}
};

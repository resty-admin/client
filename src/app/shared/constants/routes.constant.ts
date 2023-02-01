import { CATEGORY_ID, DYNAMIC_TOKEN, HALL_ID, ORDER_ID, PLACE_ID, PRODUCT_ID, TABLE_ID } from "./index";

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
	ACTIVE_ORDERS: {
		path: `active-orders`,
		absolutePath: `/active-orders`
	},
	ACTIVE_ORDER: {
		path: `active-orders/${ORDER_ID}`,
		absolutePath: `/active-orders/${ORDER_ID}`
	},
	HISTORY_ORDERS: {
		path: `history-orders`,
		absolutePath: `/history-orders`
	},
	HISTORY_ORDER: {
		path: `history-orders/${ORDER_ID}`,
		absolutePath: `/history-orders/${ORDER_ID}`
	},
	REFERRAL_LINK: {
		path: `active-orders/${ORDER_ID}/referral-link`,
		absolutePath: `/active-orders/${ORDER_ID}/referral-link`
	},
	PRODUCTS_ERROR: {
		path: `active-orders/${ORDER_ID}/products-error`,
		absolutePath: `/active-orders/${ORDER_ID}/products-error`
	},
	PAYMENT_TYPE: {
		path: `active-orders/${ORDER_ID}/payment-type`,
		absolutePath: `/active-orders/${ORDER_ID}/payment-type`
	},
	PAYMENT_STATUS: {
		path: `active-orders/${ORDER_ID}/payment-status`,
		absolutePath: `/active-orders/${ORDER_ID}/payment-status`
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
		path: `connect-to-order`,
		absolutePath: `/connect-to-order`
	},
	CREATE_ORDER: {
		path: `places/${PLACE_ID}/create-order`,
		absolutePath: `/places/${PLACE_ID}/create-order`
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
		path: `places/${PLACE_ID}/categories/${CATEGORY_ID}/products/${PRODUCT_ID}`,
		absolutePath: `/places/${PLACE_ID}/categories/${CATEGORY_ID}/products/${PRODUCT_ID}`
	},
	CONFIRM_PRODUCTS: {
		path: `places/${PLACE_ID}/confirm-products`,
		absolutePath: `/places/${PLACE_ID}/confirm-products`
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
		path: `places/${PLACE_ID}/halls/${HALL_ID}/tables/${TABLE_ID}`,
		absolutePath: `/places/${PLACE_ID}/halls/${HALL_ID}/tables/${TABLE_ID}`
	}
};

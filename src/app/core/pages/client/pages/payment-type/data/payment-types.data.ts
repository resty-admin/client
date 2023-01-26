import { PaymentType } from "@core/pages/client/pages/payment-type/enums";
import type { IRadioButtonOption } from "@shared/ui/radio-button";

export const PAYMENT_TYPES: IRadioButtonOption[] = [
	{ value: PaymentType.CASH, label: "Наличными" },
	{ value: PaymentType.TERMINAL, label: "Терминалом" },
	{ value: PaymentType.CARD, label: `Картой` }
];

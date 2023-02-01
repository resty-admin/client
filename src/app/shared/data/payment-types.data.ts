import { PaymentType } from "@shared/enums";
import type { IRadioButtonOption } from "@shared/ui/radio-button";

export const PAYMENT_TYPES: IRadioButtonOption[] = [
	{ value: PaymentType.CASH, label: "CASH" },
	{ value: PaymentType.TERMINAL, label: "TERMINAL" },
	{ value: PaymentType.CARD, label: `CARD` }
];

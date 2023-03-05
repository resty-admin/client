import { ManualPaymentEnum } from "@graphql";
import type { IRadioButtonOption } from "@shared/ui/radio-button";

export const PAYMENT_TYPES: IRadioButtonOption[] = [
	{ value: ManualPaymentEnum.Cash, label: "CASH" },
	{ value: ManualPaymentEnum.Terminal, label: "TERMINAL" }
];

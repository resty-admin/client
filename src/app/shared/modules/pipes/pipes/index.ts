import { AttributesPipe } from "./attributes.pipe";
import { InitialsPipe } from "./initials.pipe";
import { LeadingZeroPipe } from "./leading-zero.pipe";
import { PricePipe } from "./price.pipe";
import { SumPipe } from "./sum.pipe";

export const SHARED_PIPES = [InitialsPipe, LeadingZeroPipe, SumPipe, AttributesPipe, PricePipe];

export * from "./attributes.pipe";
export * from "./initials.pipe";
export * from "./leading-zero.pipe";
export * from "./price.pipe";
export * from "./sum.pipe";

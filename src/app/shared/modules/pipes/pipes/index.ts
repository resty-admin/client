import { AttributesPipe } from "./attributes.pipe";
import { InitialsPipe } from "./initials.pipe";
import { LeadingZeroPipe } from "./leading-zero.pipe";
import { SumPipe } from "./sum.pipe";

export const SHARED_PIPES = [InitialsPipe, LeadingZeroPipe, SumPipe, AttributesPipe];

export * from "./attributes.pipe";
export * from "./initials.pipe";
export * from "./leading-zero.pipe";
export * from "./sum.pipe";

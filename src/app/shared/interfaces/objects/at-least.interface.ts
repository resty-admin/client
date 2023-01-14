type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type DeepAtLeast<T, K extends keyof T> = DeepPartial<T> & Pick<T, K>;

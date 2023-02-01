export const returnTypes = ["string", "number", "float"] as const;
export type IInputReturnType = typeof returnTypes[number];

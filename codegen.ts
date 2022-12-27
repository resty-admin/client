import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://192.168.68.108:3000/graphql",
	documents: "./src/**/*.ts",
	generates: {
		"./graphql/generated.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-apollo-angular"]
		}
	}
};
export default config;

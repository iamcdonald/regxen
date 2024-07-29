import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	{
		test: {
			name: "integration",
			environment: "node",
			include: ["./test/**/*.test.ts"],
		},
	},
	{
		test: {
			name: "unit",
			environment: "node",
			include: ["./src/**/*.test.ts"],
		},
	},
	{
		test: {
			name: "all",
			environment: "node",
			include: ["./src/**/*.test.ts", "./test/**/*.test.ts"],
		},
	},
]);

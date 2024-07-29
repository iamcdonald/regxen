import RegXen from "../src/index";
let $RegXenB: Promise<typeof RegXen>;
if (process.env.BUILT) {
	$RegXenB = import("../dist").then((m) => m.default) as Promise<typeof RegXen>;
}

export default {
	get: async (): Promise<typeof RegXen> => {
		if (process.env.BUILT) {
			console.log("USING BUILT");
			return await $RegXenB;
		}
		return RegXen;
	},
};

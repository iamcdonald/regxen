import { ChildGenerator } from "./BaseGenerators";

class GroupReferenceGenerator extends ChildGenerator {
	private reference: number | string;
	constructor({ reference }: { reference: number | string }) {
		super();
		this.reference = reference;
	}

	toString() {
		return super.toString({ reference: this.reference });
	}

	generator() {
		return this.getConfig().groupValues[this.reference] || "";
	}
}

export default GroupReferenceGenerator;

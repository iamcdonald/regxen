import { ParentGenerator } from "../BaseGenerators";
import AlternativeOptionGenerator from "./AlternativeOptionGenerator";

class AlternativeGenerator extends ParentGenerator<AlternativeOptionGenerator> {
	protected validChildren = [AlternativeOptionGenerator];
	generator(): string {
		const choice = Math.floor(this.getConfig().rng.get() * this.entries.size);
		return [...this.entries][choice].generate();
	}
}

export default AlternativeGenerator;

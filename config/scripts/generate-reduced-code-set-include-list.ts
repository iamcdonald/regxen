import CodePointSet from "../../src/Unicode/CodePointSet";
import fs from "node:fs";

const cps = new CodePointSet();
const cp = cps
  .select(/[\p{Assigned}--\p{Co}]/v)
  .filter((x) => x <= 65536)
  .sort((a, b) => a - b);

const includeList = cp.slice(1).reduce(
  (inclusion, x) => {
    if (x - inclusion[inclusion.length - 1].end > 1) {
      inclusion.push({ start: x, end: x });
    } else {
      inclusion[inclusion.length - 1].end = x;
    }
    return inclusion;
  },
  [{ start: cp[0], end: cp[0] }] as { start: number; end: number }[],
);

fs.writeFileSync(
  "./src/Unicode/CodePointSet/reduced-code-point-set-include-list.json",
  JSON.stringify(includeList, null, 2),
);

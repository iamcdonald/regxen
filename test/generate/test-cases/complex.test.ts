import TestCaseRunner from "../TestCaseRunner";
import type { TestCase } from "../types";

const cases: TestCase[] = [
  {
    regex: {
      source:
        "(\\s*)((?:<|>)?=?)\\s*([v=\\s]*([0-9]+)\\.([0-9]+)\\.([0-9]+)(?:-?((?:[0-9]+|\\d*[a-zA-Z-][a-zA-Z0-9-]*)(?:\\.(?:[0-9]+|\\d*[a-zA-Z-][a-zA-Z0-9-]*))*))?(?:\\+([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?|[v=\\s]*(0|[1-9]\\d*|x|X|\\*)(?:\\.(0|[1-9]\\d*|x|X|\\*)(?:\\.(0|[1-9]\\d*|x|X|\\*)(?:((?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][a-zA-Z0-9-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][a-zA-Z0-9-]*))*))))?)?)?)",
    },
    description: "everything",
  },
];

new TestCaseRunner({ name: "complex", cases }).run();

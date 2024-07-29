export type Print = {
  headline: string;
  children?: Print[];
};

export interface IPrintable {
  toPrint(): Print;
}

type JSONValue = string | number | boolean | JSONObject | JSONArray | undefined;

interface JSONArray extends Array<JSONValue> {}

export interface JSONObject {
  [x: string]: JSONValue;
}

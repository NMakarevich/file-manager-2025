import { ERRORS } from "../constants.js";

export function invalidInput() {
  throw new Error(ERRORS.INVALID_INPUT_CODE);
}

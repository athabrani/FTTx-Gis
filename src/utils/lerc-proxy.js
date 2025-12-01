// Import directly from node_modules to avoid alias self-recursion
import * as Lerc from "../../node_modules/lerc/LercDecode.js";

const LercExport = Lerc && "default" in Lerc ? Lerc.default : Lerc;

export { LercExport as default, LercExport };

// Import directly from node_modules to avoid alias self-recursion
import * as NoSleep from "../../node_modules/nosleep.js/src/index.js";

const NoSleepExport = NoSleep && "default" in NoSleep ? NoSleep.default : NoSleep;

export { NoSleepExport as default, NoSleepExport };

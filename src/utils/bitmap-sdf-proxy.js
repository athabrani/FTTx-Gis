// Import directly from node_modules to avoid alias self-recursion
import * as BitmapSDF from "../../node_modules/bitmap-sdf/index.js";

const BitmapSDFExport = BitmapSDF && "default" in BitmapSDF ? BitmapSDF.default : BitmapSDF;

export { BitmapSDFExport as default, BitmapSDFExport };

// Import package entry (CJS) via node_modules so Vite handles dependencies like punycode
import URIImport from "../../node_modules/urijs";

const URIExport = URIImport && "default" in URIImport ? URIImport.default : URIImport;

export { URIExport as default, URIExport };

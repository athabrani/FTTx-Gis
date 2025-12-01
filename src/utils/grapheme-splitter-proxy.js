// Import directly from node_modules to avoid alias self-recursion
import * as GraphemeSplitter from "../../node_modules/grapheme-splitter/index.js";

const Grapheme = GraphemeSplitter && "default" in GraphemeSplitter ? GraphemeSplitter.default : GraphemeSplitter;

export { Grapheme as default, Grapheme };

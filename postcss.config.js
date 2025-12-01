// postcss.config.js (ESM, cocok dengan "type": "module")
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};

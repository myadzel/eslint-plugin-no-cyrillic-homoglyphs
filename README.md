# eslint-plugin-no-cyrillic-homoglyphs
ESLint plugin to replace cyrillic characters with their visual ASCII equivalents

## Motivation

Create a plugin that finds complete visual matches of characters that are impossible to identify by sight alone.

## Installation

```
npm install eslint-plugin-no-cyrillic-homoglyphs --save-dev
```

## Legacy config

```
// .eslintrc.js

module.exports = {
  plugins: ["no-cyrillic-homoglyphs"],
  rules: {
    "no-cyrillic-homoglyphs/no-cyrillic-homoglyphs": "error",
  },
};
```

## Flat config

```
// eslint.config.js

import { defineConfig } from "eslint/config";
import noCyrillicHomoglyphsPlugin from "eslint-plugin-no-cyrillic-homoglyphs";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      "no-cyrillic-homoglyphs": noCyrillicHomoglyphsPlugin,
    },
    rules: {
      "no-cyrillic-homoglyphs/no-cyrillic-homoglyphs": "error",
    },
  },
]);
```

## Replacement map

| Cyrillic   | ASCII      |
| ---------- | ---------- |
| А (U+0410) | A (U+0041) |
| В (U+0412) | B (U+0042) |
| С (U+0421) | C (U+0043) |
| Е (U+0415) | E (U+0045) |
| Н (U+041D) | H (U+0048) |
| К (U+041A) | K (U+004B) |
| М (U+041C) | M (U+004D) |
| О (U+041E) | O (U+004F) |
| Р (U+0420) | P (U+0050) |
| Т (U+0422) | T (U+0054) |
| У (U+0423) | Y (U+0059) |
| Х (U+0425) | X (U+0058) |
| а (U+0430) | a (U+0061) |
| с (U+0441) | c (U+0063) |
| е (U+0435) | e (U+0065) |
| о (U+043E) | o (U+006F) |
| р (U+0440) | p (U+0070) |
| х (U+0445) | x (U+0078) |
| у (U+0443) | y (U+0079) |

module.exports = {
  "env": {
    "mocha": true,
    "es6": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2018,
  },
  "plugins": [
    "mocha",
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "mocha/no-exclusive-tests": "error",
    "indent": ["error", 2],
    "comma-dangle": ["error", "always-multiline"],
    "max-len": [
      "error",
      {"code": 80, "ignoreStrings": true, "ignoreTemplateLiterals": true},
    ],
    "no-multiple-empty-lines": [
      "error", {"max": 1, "maxBOF": 0, "maxEOF": 1},
    ],
    "object-curly-spacing": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
  },
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "detect",
      "flowVersion": "0.53",
    },
    "propWrapperFunctions": [
      "forbidExtraProps",
      {"property": "freeze", "object": "Object"},
      {"property": "myFavoriteWrapper"},
    ],
    "linkComponents": [
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"},
    ],
  },
};

import geb from "@geb/eslint-config";

export default [
  ...geb,
  { name: "@geb/hub-peru/ignores", ignores: ["dist/**"] }
];

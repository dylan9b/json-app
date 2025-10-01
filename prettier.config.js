/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  overrides: [
    { files: "*.html", options: { parser: "angular" } },
    { files: "*.scss", options: { parser: "scss" } },
    { files: "*.ts", options: { parser: "typescript" } },
  ],
};

module.exports = pkg => {
  if (pkg.eslintConfig) return false;

  pkg.eslintConfig = { extends: "react-app" };
  return true;
};

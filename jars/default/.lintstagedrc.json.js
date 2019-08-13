module.exports = pkg => {
  if (pkg["lint-staged"]) return false;

  pkg["lint-staged"] = {
    "*.{js,jsx,ts,tsx,css,json,md,mdx,html}": ["prettier --write", "git add"],
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
  };

  return true;
};

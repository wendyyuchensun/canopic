module.exports = pkg => {
  if (pkg.husky) return false;

  pkg.husky = {
    hooks: {
      "pre-commit": "lint-staged"
    }
  };

  return true;
};

export default {
  '**/*.{ts,tsx,js,cjs}': [
    // prettier
    (filenames) => `prettier --write --ignore-path .gitignore ${filenames.join(' ')}`,
    // eslint
    `eslint --fix --cache`,
    // typecheck
    (filenames) => `npm run check-type`,
  ],
  '**/*.md': 'prettier --list-different',
};

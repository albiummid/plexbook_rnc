// tailwind.config.js

const {colors} = require('./src/constants/colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};

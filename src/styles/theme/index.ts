import light from './colors/light';
import dark from './colors/dark';

const theme = {
  color: light,
  colors: { light, dark },
  font: {
    family: {
      default: 'GeneralSans, sans-serif',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  transition: {
    default: '160s ease-in-out',
  },
};

export default theme;


export default {
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Lora', 'serif'],
      roboto: ['Roboto', 'serif']
    },
    extend: {
      screens: {
        '2md': '960px'
      }
    },
    colors: {
      white: '#FFF',
      black: '#000',
      blue: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        400: '#42A5F5',
        800: '#1565C0'
      },
      pink: {
        100: '#BBDEFB',
        800: '#C12357'
      },
      yellow: {
        100: '#FFEEB4',
        900: '#C12357'
      },
      green: {
        50: '#E6F6EC',
        100: '#C3E9D0',
        500: '#1FB767',
        600: '#16A75C',
        700: '#069550',
        800: '#008444'
      },
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121'
      },
      'blue-gray': {
        50: '#E3E7ED',
        400: '#415C84',
        700: '#083461',
        800: '#022B55'
      }
    }
  },
  plugins: [
    require('windicss/plugin/line-clamp')
  ]
}

import { Appearance } from 'react-native';

interface Colors {
    [key: string]: string | undefined
}

// COLORS FOR THE DARK THEME
const darkColorScheme: Colors = {
    text: '#000000',
    screenBg: '#ffffff',
    greyText: '#838383',
    subtitle: '#969AA8',
    button: '#4BB4B6',
    signUpBtnBorder: 'rgba(237, 237, 237, 100)',
    backButtonBorder: 'rgba(128 128 128 10)',
    headingColor: '#001B13',
    inputBorder: '#EFEFEF',
    signUpText: '#21899C',
    buyerProfile: '#C9F0F8',
    ownerProfile: '#F2E9DF',
    privacyAndTerms: '#15224F',
    black: '#000',
};

// COLORS FOR THE LIGHT THEME
const lightColorScheme: Colors = {
    text: '#000000',
    screenBg: '#ffffff',
    greyText: '#838383',
    subtitle: '#969AA8',
    button: '#4BB4B6',
    signUpBtnBorder: 'rgba(237, 237, 237, 100)',
    backButtonBorder: 'rgba(128 128 128 10)',
    headingColor: '#001B13',
    inputBorder: '#EFEFEF',
    signUpText: '#21899C',
    buyerProfile: '#C9F0F8',
    ownerProfile: '#F2E9DF',
    privacyAndTerms: '#15224F',
    black: '#000',

};

export const Color = (color: string) => {
    // GET USER DEVICE THEME (LIGHT/DARK)
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme === 'dark') {           // IF USER DEVICE THEME IS DARK
        return darkColorScheme[color];
    } else {                                 // IF USER DEVICE THEME IS LIGHT
        return lightColorScheme[color];
    }
};


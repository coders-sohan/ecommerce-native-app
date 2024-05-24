import { Platform } from 'react-native';

const height = (Platform.OS === 'ios') ? 20 : 50;

export const colors = {
    primary: '#B97505',
    secondary: '#CF8403',
    background: '#FFFFFF'
}
export const padding = {
    default: height,
}
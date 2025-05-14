import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const { width, height } = Dimensions.get('window');
export { width, height };
const guidelineBaseWidth = 375;

export const getResponsiveFontSize = (fontSize: number): number => {
  return fontSize * (SCREEN_WIDTH / guidelineBaseWidth);
};

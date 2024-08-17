import {Dimensions, PixelRatio} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const normalizeModerately = (size: number, factor = 0.5): number => {
  return PixelRatio.roundToNearestPixel(moderateScale(size, factor));
};

export const normalizeWidth = (size: number): number => {
  return PixelRatio.roundToNearestPixel(scale(size));
};

export const normalizeHeight = (size: number): number => {
  return PixelRatio.roundToNearestPixel(verticalScale(size));
};

export {hp, wp};
export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;

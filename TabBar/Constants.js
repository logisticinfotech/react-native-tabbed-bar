import { Dimensions, Platform } from 'react-native';

const Constants = {
  scrWidth: Dimensions.get(Platform.select({ ios: 'screen', android: 'window' })).width,
  scrHeight: Dimensions.get(Platform.select({ ios: 'screen', android: 'window' })).height,
};
export default Constants;

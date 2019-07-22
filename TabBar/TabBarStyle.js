import { StyleSheet } from 'react-native';

import Constants from './Constants';

export const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: Constants.scrWidth,
  },
  tabContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  // Active tab container
  tabContainerActive: {
    height: 2,
    marginVertical: 5,
  },
  // Tab text
  tabText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default { styles };

import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

const styles = StyleSheet.create({
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topbarlogoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  leftIcon: {
    color: '#000',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cartIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
  cartItemCountContainer: {
    position: 'absolute',
    zIndex: 10,
    top: -10,
    left: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
  },

  noItemContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyBoxText: {
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
  emptyView: {
    height: 20,
  },
});

export default styles;

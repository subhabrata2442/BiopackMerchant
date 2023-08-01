import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: 10,

    marginBottom: 10,
    elevation: 1,
  },
  containerSec1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  productImageContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  productDetailsContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  productImage: {
    height: 130,
    width: 100,
  },

  containerSec2: {
    width: '100%',
    backgroundColor: '#ecfae3',
    padding: 10,
  },
  containerOrderSec: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  containerOrderAmountSec: {
    marginBottom: 10,
  },
  invoiceButtonSec: {},
  invoiceButton: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: colors.muted,
    backgroundColor: '#8ab468',
    width: '100%',
  },
  invoiceButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },

  primaryText: {
    fontSize: 15,
    color: colors.dark,
    fontWeight: 'bold',
  },
  secondaryTextSm: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: 'bold',
  },
  productReviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  reviewButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8ab468',
    borderStyle: 'solid',
    borderRadius: 6,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    //backgroundColor: '#8ab468',
  },
  reviewButtonText: {
    fontSize: 14,
    color: '#8ab468',
    fontWeight: 'bold',
  },
});

export default styles;

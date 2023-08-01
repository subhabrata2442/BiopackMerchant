import {StyleSheet} from 'react-native';
import {fontFamily} from '../../constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: '600',
  },
  cartBodyContiainer: {
    //marginBottom: 10,
  },
  cartProductListContiainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // shadowColor: 'rgba(0, 0, 0, 0.3) 0 12px 16px -8px',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  cartProductLeftMainContiainer: {
    width: '35%',
  },
  leftImgContainer: {
    width: '100%',
    height: 158,
  },
  cartProductRightMainContiainer: {
    width: '65%',
    padding: 10,
    position: 'relative',
  },
  cartRemoveContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  productTitleTextContainer: {
    //fontFamily:fontFamily.poppins_bold
  },
  productDescTextContainer: {
    fontFamily: fontFamily.poppins_bold,
  },
  producDropdownContainer: {},
  dropdown2BtnStyle: {
    //width: '100%',
    height: 30,
    fontSize: 5,
    //backgroundColor: '#444',
    //borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  productSizeTextContainer: {
    fontSize: 12,
    fontWeight: 'bold',
    //fontFamily: fontFamily.poppins_bold,
  },
  productReviewContainer: {
    flexDirection: 'row',
  },
  productReviewLeftContainer: {
    //marginRight: 20,
  },
  productQtyContainer: {},
  productPriceContainer: {
    //marginTop: 1,
  },
  productPriceTextContainer: {
    //fontFamily: fontFamily.poppins_bold,
    fontWeight: 'bold',
  },
  productQtyTextContainer: {
    //fontFamily: fontFamily.poppins_bold,
  },
  cartProductListContiainerEmpty: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.muted,
  },
  cartBottomContainer: {
    width: '100%',
    display: 'flex',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cartBottomPriceText: {
    fontFamily: fontFamily.poppins_bold,
    fontSize: 14,
  },
  cartBottomLeftContainer: {},
  cartBottomRightContainer: {},
  addToCartcontainer: {
    backgroundColor: '#8ab468',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  addToCartbuttonText: {
    color: '#fff',
    fontFamily: fontFamily.poppins_bold,
    letterSpacing: 1,
    fontSize: 16,
  },

  cartBottomPrimaryText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  cartBottomSecondaryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyView: {
    width: '100%',
    height: 20,
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  cartInfoContainerTopBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartInfoTopBar: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary_light,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    width: 70,
  },
});

export default styles;

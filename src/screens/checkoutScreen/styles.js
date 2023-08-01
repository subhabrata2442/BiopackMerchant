import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

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
  bodyContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  orderSummaryMainContainer: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  orderSummaryContainer: {
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    marginBottom: 10,
    // paddingTop: 30,
    // paddingBottom: 30,
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    width: '100%',
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  emptyView: {
    width: '100%',
    height: 20,
  },
  modelBody: {
    flex: 1,
    display: 'flex',
    flexL: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: 320,
    height: 400,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 3,
  },
  listCouponMainContainer: {
    marginTop: 10,
  },
  CouponContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 5,
    marginBottom: 15,
  },
  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },

  ApplyCoupanMainContainer: {
    display: 'flex',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  ApplyCoupanContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ApplyCoupanRemoveBtnContainer: {},
  ApplyCoupanTextContainer: {},
  CouponRemoveBtn: {},
  CouponBtnRemoveTextContainer: {},
  CouponBtnRemoveText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  CouponBtnMainContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#bcc4bc',
    paddingTop: 10,
    marginTop: 10,
  },
  CouponBtnTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  ApplyCoupanText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ApplyCoupanText2: {},
  ApplyCoupanText3: {
    color: '#4fac52',
    //fontSize: 13,
    fontWeight: 'bold',
  },
  CouponBtnContainer: {},

  CouponBtnTex: {
    color: colors.dark,
    //fontSize: 13,
    fontWeight: 'bold',
  },
});

export default styles;

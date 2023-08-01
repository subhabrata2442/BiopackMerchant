import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: colors.light,
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
      },
      topBarContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      },
      topbarlogoContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 20,
      },
      logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
      },
      toBarText: {
        fontSize: 15,
        fontWeight: "600",
      },
      bodyContainer: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: colors.light,
        flex: 1,
        position:"relative",
      },
      productImageSliderContainer: {
        
      },
      productInfoContainer: {
        width: "100%",
        flex: 3,
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        elevation: 25,
      },
      productImage: {
        height: 300,
        width: 300,
        resizeMode: "contain",
      },
      productInfoTopContainer: {
      },
      productInfoBottomContainer: {
        marginTop:1
      },
      productNameContaier: {
       
      },
      productNameText: {
        fontSize: 14,
        color:"#333",
        fontWeight: "bold",
      },
      productDescText:{
        fontSize: 16,
        fontWeight: "bold",
        color:"#000",
        marginBottom:5
      },
      productSkuText:{
        fontSize: 14,
        color:"#000",
      },
      infoButtonContainer: {
        position:"absolute",
        top:10,
        right:10,
      },
      wishlistButtonContainer: {
      },
      productDetailBtnText:{
        fontSize: 14,
        fontWeight: "bold",
        color:"#8ab468",
        //textDecorationLine:"underline",
        borderBottomWidth:1
      },
      productRatingContainer:{
        display:"flex",
        flexDirection: "row",
      },
      productRatingText:{
        fontSize: 15,
        color:"#262626"
      },
      productRatingNumberText:{
        fontSize: 15,
        color:"#000"
      },
      
      productRatingBar:{
        marginLeft:10,
        marginRight:10,
      },

      productDetailMainContainer: {
        paddingTop:10,
        paddingLeft: 20,
        paddingRight: 20,
        width: "100%",
        flexDirection: "column",
      },
      productInfoTopContainer:{
        width: "100%",
        marginBottom:5,
      },
      productInfo2ndContainer:{
        width: "100%",
        marginBottom:5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:20
      },
      productInfo3rdContainer:{
        width: "100%",
        marginBottom:5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
      },
      productSizeBtnText:{
        backgroundColor:"#8ab468",
        color:"#fff",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        fontWeight: "bold",
      },
      productInfo3rdPriceContainer:{
        marginBottom:5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
      },      
      secondaryTextSm: { fontSize: 14, color:"#444" },
      primaryTextSm: { 
        color: "#000", 
        fontSize: 20, 
        fontWeight: "bold",
        marginRight:5
      },
      secondarySubText: { 
        fontSize: 15,
        color:"#262626",
        //lineHeight:1
      },
      productDescriptionContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
      },
      iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 20,
      },
      cartIconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cartItemCountContainer: {
        position: "absolute",
        zIndex: 10,
        top: -10,
        left: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 22,
        width: 22,
        backgroundColor: colors.danger,
        borderRadius: 11,
      },
      cartItemCountText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 10,
      },
      viewCartcontainer: {
          padding: 15,
          width: "100%",
          alignItems: "center",
          backgroundColor: "#8ab468",
      },
      viewCartbuttonText: {
          fontWeight: "bold",
          color: "#fff",
      },
      primaryText: {
        fontSize: 17,
        color:'#555',
        fontWeight: "bold",
        letterSpacing:1

      },
      productFeatureBottomContainer:{
        paddingTop:10,
        paddingBottom:10
      },
      primaryTextContainer:{
        marginBottom:5,
        paddingLeft:20,
        paddingRight:20
      },
      productCardContainer:{
        paddingLeft:15,
        paddingRight:15
      }
   
});

export default styles;
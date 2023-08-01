import { StyleSheet } from 'react-native';
import { colors, network, fontSize } from "../../constants";


const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer:{
    padding:5
  },
  mainContainer:{
    paddingLeft:8,
    paddingRight:8

  },
  topBarBtnContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  topBarIconContainer:{
    marginRight:10
  },
  topBarTextContainer:{
    fontWeight:"bold",
    fontSize:16
  },
  colorTextMainContainer:{
    marginBottom:15
  },
  colorTextContainer:{
    fontWeight: "bold",
    fontSize:fontSize.font20,
    color:"#0e0e0e",
    letterSpacing:1,
  },
  colorContainer:{
    width: "100%",
    marginBottom:5,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20,
  },
  colorAttContainer:{
    width:30,
    height:30,
    borderRadius:50,
    backgroundColor:"#151515",
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:5
  },
  colorAttContainer2:{
    width:30,
    height:30,
    borderRadius:50,
    backgroundColor:"#f6f0f0",
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:5
  },
  colorAttContainer3:{
    width:30,
    height:30,
    borderRadius:50,
    backgroundColor:"#cdab87",
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:5
  },
  colorAttTextontainer:{
    fontSize:14,
    color:"#000",
    //fontFamily: 'Raleway-Light',
    //fontFamily: 'Poppins-Bold',
  },
  tabContainer:{
    paddingBottom:20

  },
  tabTitleContainer:{
    fontWeight: "bold",
    marginBottom:5,
    fontSize:fontSize.font20,
    color:"#0e0e0e",
  },
  tabTextContainer:{
    fontWeight: "400",
    fontSize:15,
    color:"#0e0e0e",
    
  },
  leftImgContainer:{
    width: 30,
    height: 30,
    marginRight:10
  },
  rightImgContainer:{
    width: 30,
    height: 30,
    marginRight:10
  },
  scrollMaincontainer:{
    // flex: 1,

  },
  buttomIconContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    alignItems:"center",
  },
  buttomLeftIconContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  buttomRightIconContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    width:160,
    borderWidth:1,
    borderColor:"#ddd",
    padding:10
  },
  buttomTitleContainer:{
    color:"#333",
    fontWeight:"bold",
    flex: 1, 
    flexWrap: 'wrap'

  }


  
});

export default styles;
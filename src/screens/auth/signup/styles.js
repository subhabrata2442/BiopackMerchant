import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  regisSec: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.5)',
    width: '86%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginImg: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    margin: 20,
  },
  userIcon: {
    fontSize: 60,
    color: '#000',
    marginBottom: 5,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
  },

  intlSectionStyle: {
    height: 50,
    marginTop: 20,
    width: '100%',
  },
  flagStyle: {
    height: '100%',
  },

  passSectionStyle: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
  },
  inputIcon: {
    padding: 10,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#6f6b6a',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#dadae8',
  },
  intlInputStyle: {
    width: '100%',
  },

  phoneContainer: {
    width: '100%',
    height: 50,
  },
  phoneTextInput: {
    paddingVertical: 0,
  },
  inputFieldPassword: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#fff',
  },
  dropdown: {
    flexGrow: 1,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 15,
  },
  InnerSectionStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SectionStyle2: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    width: '50%',
    right: -1,
  },
  BtnMainSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BtnSection: {
    width: '48%',
    position: 'relative',
    left: -6,
  },
  BtnSection2: {
    width: '48%',
    right: -6,
  },

  dropdownContainer: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    width: '50%',
    left: -1,
    //paddingRight: 20,
  },
  regisButtonStyle: {
    backgroundColor: '#fe0000',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 1,
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: '#fe0000',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
  },
});

export default styles;

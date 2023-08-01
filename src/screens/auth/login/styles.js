import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        //justifyContent: 'center',
        //backgroundColor: '#307ecc',
        //alignContent: 'center',
    },
    bgImage: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
    },
    loginSec: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,.5)',
        width: '86%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        paddingTop: 30,
        paddingBottom: 70,
        paddingLeft: 20,
        paddingRight: 20,
    },
    loginImg: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        margin: 50
    },
    userIcon: {
        fontSize: 60,
        color: '#000',
        marginBottom: 5,
    },
    SectionStyle: {
        flexDirection: 'row',
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
    buttonStyle: {
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
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 15,
        padding: 5

    }
});

export default styles;
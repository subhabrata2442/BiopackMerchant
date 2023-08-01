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
    categoryContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%'
    },
    emptyView: { width: 30 },
    bodyContainer: {
        flex: 1,
        width: "100%",
        flexDirecion: "row",
        backgroundColor: colors.light,
        justifyContent: "flex-start",
    },  
    
});

export default styles;
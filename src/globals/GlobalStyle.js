import {
    Dimensions,
    StyleSheet
} from 'react-native';
import { Fonts, Colors } from './GlobalConfig';
const { width } = Dimensions.get('window')
const GlobalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    containerCenter: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationBarShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    calendarModalContainer: {
        backgroundColor: Colors.WhiteColor,
        minHeight: width * 0.9,
        width: '90%',
        padding: 5,
        justifyContent: 'center',
        borderRadius: 7,
    },
    viewContainer: {
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    blackTitleText: {
        fontSize: 20,
        color: Colors.BLACK,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: "bold",
        letterSpacing: 0.5,
        marginBottom: 20
    },
    blackContentText: {
        color: Colors.BLACK,
        fontFamily: Fonts.SF_REGULAR,
        marginBottom: 20,
        lineHeight: 20
    },
    textFontSize10: {
        fontSize: 10
    },
    textFontSize12: {
        fontSize: 12
    },
    textFontSize13: {
        fontSize: 13
    },
    textFontSize14: {
        fontSize: 14
    },
    textFontSize16: {
        fontSize: 16
    },
    textFontSize18: {
        fontSize: 18
    },
    textFontSize20: {
        fontSize: 20
    },
    textFontSize24: {
        fontSize: 24
    },
    contentCardTextLabel: {
        color: "#272727",
        lineHeight: 18
    },
    contentCardTextValue: {
        color: "#272727",
        lineHeight: 18, 
        fontWeight: "bold"
    },
    modalHeaderContainer: {
        backgroundColor: "#59b05c",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    modalHeaderText: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 16,
        textAlignVertical: "center"
    },
    modalContentContainer: {
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    imageAmbilFotoStyle: {
        width: "100%",
        height: 300,
        resizeMode: "contain"
    },
    detailContainer: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
    },
    detailInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY,
    },
    detailInputContainerWithoutBorder: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
    },
    detailDateValue: {
        fontSize: 14,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: 'bold',
        color: Colors.BLUE
    },
    detailValue: {
        fontSize: 14,
        color: Colors.DARK,
        lineHeight: 30,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    notesInputContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.DARK,
        borderRadius: 15
    },
    cameraIconContainer: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingBottom: 5
    },
    photoContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 30,
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    formHeaderTitleText: {
        fontSize: 14,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: 'bold',
        color: Colors.DARK,
        marginBottom: 20
    },
    formHeaderContentContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 4,
        borderBottomColor: Colors.GRAY_LIGHT
    },
    formContentContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 4,
        borderBottomColor: Colors.GRAY_LIGHT
    },
    formButtonContainer: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20
    },
    informationIllustrationContainer: {
        height: 150,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: Colors.GRAY_LIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    informationContainer: {
        width: 300,
        marginTop: 30
    },
    informationBodyText: {
        fontFamily: Fonts.SF_MEDIUM,
        textAlign: 'center',
        color: Colors.GRAY_DARK,
        fontSize: 14,
        letterSpacing: 0.5,
        lineHeight: 24
    }
});

export default GlobalStyle;
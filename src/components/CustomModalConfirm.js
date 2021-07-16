import React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import GlobalStyle from '../globals/GlobalStyle';
import { Colors, Fonts } from '../globals/GlobalConfig';

const CustomModalConfirm = (props) => {
    const {
        title,
        body,
        onConfirm,
        onCancel,
        isModalVisible
    } = props

    let bodyArray = body.split('*')

    const bodyContentView = (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
            <Text style={styles.modalContent}>
                {bodyArray.map((item, index) => {
                    if (index % 2 != 0) return <Text key={String(index)} style={{ fontFamily: Fonts.SF_MEDIUM, fontWeight: 'bold' }}>{item}</Text>
                    return item
                })}
            </Text>
        </View>
    )

    const modalContent = (
        <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
                <Text style={GlobalStyle.modalHeaderText}>{title}</Text>
            </View>
            <View style={styles.modalContentContainer}>
                {bodyContentView}
                <View style={{ flexDirection: "row" }}>
                    <TouchableNativeFeedback onPress={onConfirm}>
                        <View style={[styles.buttonContainer, { backgroundColor: Colors.GREEN_DARK, marginRight: 10 }]}>
                            <FontAwesome style={styles.iconStyle} name="check-circle" />
                            <View style={styles.buttonTextContainer}>
                                <Text style={styles.buttonText}>Ya</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={onCancel}>
                        <View style={[styles.buttonContainer, { backgroundColor: Colors.RED, marginLeft: 10 }]}>
                            <FontAwesome style={styles.iconStyle} name="times-circle" />
                            <View style={styles.buttonTextContainer}>
                                <Text style={styles.buttonText}>Tidak</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    )

    return (
        <Modal
            avoidKeyboard={Platform.OS === "ios"}
            isVisible={isModalVisible}
            style={{ margin: 30 }}
            backdropOpacity={0.8}
            children={modalContent} />
    )
}

export default CustomModalConfirm

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        overflow: 'hidden'
    },
    modalHeaderContainer: {
        backgroundColor: Colors.GREEN_DARK,
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalContentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    modalTitle: {
        ...GlobalStyle.textFontSize16,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: "bold",
        color: Colors.WHITE
    },
    modalContent: {
        ...GlobalStyle.textFontSize14,
        fontFamily: Fonts.SF_REGULAR,
        color: Colors.DARK,
        lineHeight: 20
    },
    buttonContainer: {
        flex: 1,
        height: 36,
        flexDirection: 'row',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    buttonTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    buttonText: {
        ...GlobalStyle.textFontSize14,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: "bold",
        letterSpacing: 0.2,
        color: Colors.WHITE
    },
    iconStyle: {
        position: 'absolute',
        left: 8,
        top: 6,
        fontSize: 24,
        color: Colors.WHITE
    }
})

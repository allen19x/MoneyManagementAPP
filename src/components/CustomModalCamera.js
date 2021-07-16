import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';

import GlobalStyle from '../globals/GlobalStyle';
import { Colors, Fonts } from '../globals/GlobalConfig';
import { wait } from '../globals/GlobalFunction';

const CustomModalCamera = (props) => {
    const {
        onCancel,
        isModalVisible,
        onPictureTaken
    } = props
    const [isDisableCancel, setIsDisableCancel] = useState(false)
    const [isShowCamera, setIsShowCamera] = useState(false)

    const cameraRef = useRef(null);

    useEffect(() => {
        if (isModalVisible) wait(500).then(() => setIsShowCamera(true))
        else wait(500).then(() => setIsShowCamera(false))
    }, [isModalVisible])

    const handleTakePicture = async () => {
        if (cameraRef) {
            await setIsDisableCancel(true)
            const options = {
                quality: 0.2,
                base64: true,
                width: 624,
                height: 832
            };
            const data = await cameraRef.current.takePictureAsync(options)
            wait(2000).then(() => setIsDisableCancel(false))
            onPictureTaken(data)
        }
    }

    const modalContent = (
        <View style={styles.modalContainer}>
            {isShowCamera ? (
                <RNCamera
                    ref={cameraRef}
                    style={styles.modalCamera}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Izin menggunakan kamera',
                        message: 'Kemenko Maritim butuh akses kamera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Batal'
                    }}
                />
            ) : (
                    <View style={styles.modalCamera} />
                )}
            <View style={{ margin: 20, flexDirection: "row" }}>
                <TouchableNativeFeedback
                    disabled={isDisableCancel}
                    onPress={handleTakePicture}>
                    <View style={[styles.buttonContainer, { backgroundColor: isDisableCancel ? Colors.GRAY : Colors.GREEN_DARK, marginRight: 10 }]}>
                        <Text style={styles.buttonText}>TAKE PHOTO</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    disabled={isDisableCancel}
                    onPress={onCancel}>
                    <View style={[styles.buttonContainer, { backgroundColor: isDisableCancel ? Colors.GRAY : Colors.RED, marginLeft: 10 }]}>
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )

    return (
        <Modal
            isVisible={isModalVisible}
            backdropOpacity={0.8}
            style={{ margin: 0 }}
            children={modalContent} />
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.DARK,
        overflow: 'hidden'
    },
    modalCamera: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    modalContent: {
        ...GlobalStyle.textFontSize14,
        fontFamily: Fonts.SF_REGULAR,
        color: Colors.DARK,
        lineHeight: 30,
        marginBottom: 20
    },
    buttonContainer: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        borderRadius: 8,
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
    buttonText: {
        ...GlobalStyle.textFontSize14,
        fontFamily: Fonts.SF_MEDIUM,
        fontWeight: "bold",
        letterSpacing: 0.2,
        color: Colors.WHITE
    }
})

export default CustomModalCamera
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, TextInput, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Colors, StorageKeys } from '../../../globals/GlobalConfig';
import GlobalStyle from '../../../globals/GlobalStyle';

import CustomInputComponent from '../../../components/CustomInputComponent'
import CustomModalCamera from '../../../components/CustomModalCamera';
import CustomButton from '../../../components/CustomButton';
import CustomToast from '../../../components/CustomToast';
import CustomModalConfirm from '../../../components/CustomModalConfirm';
import AsyncStorage from '@react-native-community/async-storage';

const DetailTransaction = (props) => {
	const [scrollPosition, setScrollPosition] = useState(0)
	const [tempReceiverIDPhoto, setTempReceiverIDPhoto] = useState()

	const [catatan, setCatatan] = useState()

	const [isLoading, setIsLoading] = useState(false)
	const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false)
	const [isModalTakePhotoVisible, setIsModalTakePhotoVisible] = useState(false)

	const toastRef = useRef(null);

	useEffect(() => {
	}, [])

	const handeSubmitTransaction = () => {
		setIsModalConfirmVisible(true)
	}

	const onSubmitTransaction = () => {

	}

	const onPictureTaken = (cameraData) => {
		const {
			uri,
		} = cameraData

		setTempReceiverIDPhoto(uri)
		setIsModalTakePhotoVisible(false)
	}

	const handleTakePhoto = () => {
		setIsModalTakePhotoVisible(true)
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				onMomentumScrollEnd={e => setScrollPosition(e.nativeEvent.contentOffset.y)}>
				<View style={GlobalStyle.formHeaderContentContainer}>
					<CustomInputComponent
						disabledTextInput
						label='-'
						value="-"
					/>
				</View>

				<View style={GlobalStyle.formButtonContainer}>
					<CustomButton
						customColor={Colors.GREEN_LIGHT}
						onPress={() => handleTakePhoto()}
						label='Take Photo'
					/>
					{tempReceiverIDPhoto ? (
						<View style={styles.tempImageStyle}>
							<Image resizeMethod="resize" resizeMode='cover' source={{ uri: tempReceiverIDPhoto }} style={{ height: '100%', width: '100%' }} />
						</View>
					) : null}
				</View>
				<View style={[GlobalStyle.formButtonContainer, { flexDirection: "row" }]}>
						<CustomButton
							onPress={handeSubmitTransaction}
							isLoading={isLoading}
							label='Save'
						/>
					<View style={{ width: 10 }}></View>
					<CustomButton
						customColor={Colors.RED}
						onPress={() => Actions.pop()}
						label='Back'
					/>
				</View>
			</ScrollView>
			<CustomModalCamera
				onPictureTaken={onPictureTaken}
				onCancel={() => setIsModalTakePhotoVisible(false)}
				isModalVisible={isModalTakePhotoVisible}
			/>
			<CustomModalConfirm
				title='Save Material'
				body='Are you sure want to save material? Make sure your data is correct.'
				onConfirm={onSubmitTransaction}
				onCancel={() => setIsModalConfirmVisible(false)}
				isModalVisible={isModalConfirmVisible}
			/>
			<CustomToast ref={toastRef} />
		</View >
	)
}

export default DetailTransaction

const styles = StyleSheet.create({
	tempImageStyle: {
		width: '100%',
		aspectRatio: 1,
		marginTop: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.GRAY,
		borderStyle: 'dashed',
		overflow: 'hidden'
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
})
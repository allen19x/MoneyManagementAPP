import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, StyleSheet, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Colors, StorageKeys } from '../../../globals/GlobalConfig';
import GlobalStyle from '../../../globals/GlobalStyle';

import CustomInputComponent from '../../../components/CustomInputComponent'
import CustomButton from '../../../components/CustomButton';
import CustomToast from '../../../components/CustomToast';
import moment from 'moment';
import { currencyFormat, getTransactionList } from '../../../globals/GlobalFunction';
import AsyncStorage from '@react-native-community/async-storage';

const DetailTransaction = (props) => {
	const { date, transactionType, value, note, image, postingDateTime } = props
	const [scrollPosition, setScrollPosition] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const toastRef = useRef(null);

	useEffect(() => {
		console.log(date)
		console.log(postingDateTime)
	}, [])

	const deleteTransaction = () => {
		let dataTransaction = []
		getTransactionList().then(result => {
			dataTransaction = result
			let found = dataTransaction.indexOf(e => moment(e.postingDateTime).format('YYYY-MM-DD hh-mm-ss') == moment(postingDateTime).format('YYYY-MM-DD hh-mm-ss'))
			let newData = dataTransaction.splice(found, result.length - 1);
			AsyncStorage.setItem(StorageKeys.TRANSACTION_LIST, JSON.stringify(newData));
		})
		Actions.pop()
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				onMomentumScrollEnd={e => setScrollPosition(e.nativeEvent.contentOffset.y)}>
				<View style={GlobalStyle.formHeaderContentContainer}>
					<CustomInputComponent
						disabled
						label='Transaction Type'
						value={transactionType} />
					<CustomInputComponent
						disabled
						label='Transaction Nominal'
						value={`RP ${currencyFormat(value)}`}
					/>
					<CustomInputComponent
						disabled
						isDate
						label='Transaction Date'
						value={date}
					/>
					{note!="" &&
						<View style={GlobalStyle.formContentContainer}>
							<CustomInputComponent
								disabled
								isVertical
								label='Notes (Optional)'
								isLabelBold
								value={note}
							/>
						</View>
					}
				</View>
				<View style={GlobalStyle.formContentContainer}>
					<View style={[GlobalStyle.formButtonContainer, { paddingHorizontal: 0 }]}>
						{image !="" ? (
							<View style={styles.tempImageStyle}>
								<Image resizeMethod="resize" resizeMode='cover' source={{ uri: image }} style={{ height: '100%', width: '100%' }} />
							</View>
						) : null}
					</View>
				</View>
				<View style={[GlobalStyle.formButtonContainer, { flexDirection: "row" }]}>
					<CustomButton
						customColor={Colors.BLUE_DARK}
						onPress={() => deleteTransaction()}
						isLoading={isLoading}
						label='Delete'
						/>
				</View>
				<View style={[GlobalStyle.formButtonContainer, { flexDirection: "row" }]}>
					<CustomButton
						customColor={Colors.RED}
						onPress={() => Actions.pop()}
						isLoading={isLoading}
						label='Back'
					/>
				</View>
			</ScrollView>
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
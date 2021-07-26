import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Modal from 'react-native-modal';
import MonthPicker from 'react-native-month-picker';

import { Colors, Fonts, Icons, Illustrations, Metrics, StorageKeys } from '../../../globals/GlobalConfig'
import GlobalStyle from '../../../globals/GlobalStyle';

import CustomToast from '../../../components/CustomToast';
import CustomCalendar from '../../../components/CustomCalendar';
import CustomButton from '../../../components/CustomButton';
import { getTransactionList } from '../../../globals/GlobalFunction';

const CardDisplay = (props) => {
	const { data } = props
	const {
		type,
		value,
		image,
		note,
		pickedDate,
		postingDateTime
	} = data

	const openDetail = () => {
		Actions.detailTransaction({
			date: pickedDate,
			image: image,
			note: note,
			transactionType: type,
			value: value,
			postingDateTime: postingDateTime
		})
	}
	return (
		<TouchableOpacity style={[styles.cardContainer, type == "In" || type == "Save" ? { backgroundColor: Colors.GREEN_LIGHT } : { backgroundColor: Colors.RED_LIGHT }]} onPress={() => openDetail()}>
			<View style={{ flex: 3 }}>
				<Text style={styles.cardTitleText}>Transaction Date</Text>
				<Text style={styles.cardTitleText}>Transaction Type</Text>
				<Text style={styles.cardTitleText}>Transaction Nominal</Text>
			</View>
			<View style={{ flex: 2, alignItems: "flex-end" }}>
				<Text style={styles.cardDescriptionText}>{moment(pickedDate).format('DD-MM-YYYY')}</Text>
				<Text style={styles.cardDescriptionText}>{type}</Text>
				<Text style={styles.cardDescriptionText}>{value}</Text>
			</View>
			<View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
				<Image resizeMethod="resize" source={Icons.iconChevronRight} style={{ height: 15, width: 15 }} />
			</View>
		</TouchableOpacity>
	)
}

const MonthlyTrackScreen = (props) => {
	const { lastUpdate } = props
	const [isLoading, setIsLoading] = useState(false)
	const [isMonthModalVisible, setIsMonthModalVisible] = useState(false)
	const [dataMonthlyTrack, setDataMonthlyTrack] = useState([])
	const [filteredMonthlyTrack, setFilteredMonthlyTrack] = useState([])
	const toastRef = useRef(null);
	const [startDate, setStartDate] = useState(moment(new Date).startOf('month').format('YYYY-MM-DD'))
	const [endDate, setEndDate] = useState(moment(new Date).endOf('month').format('YYYY-MM-DD'))
	const [selectedMonth, setSelectedMonth] = useState(new Date())
	

	useEffect(() => {
		initialLoad()
	}, [])

	useEffect(() => {
		if (lastUpdate) {
			initialLoad()
		}
	}, [lastUpdate])

	const initialLoad = (data, data2) => {
		const { current } = toastRef
		setIsLoading(true)
		getTransactionList().then(result => {
			if (data != null && data2 !== null) {
				var filteredTransaction = result.filter(a => {
					var date = moment(a.pickedDate).format('MM');
					return (date >= moment(data).format('MM') && date <= moment(data2).format('MM'));
				});
				console.log(data, data2)
				const sortedTransaction = filteredTransaction.sort((a, b) => new Date(b.pickedDate) - new Date(a.pickedDate))
				setDataMonthlyTrack(sortedTransaction)
				setFilteredMonthlyTrack(sortedTransaction)
			}
			else {
				if (result != null) {
					var filteredTransaction = result.filter(a => {
						var date = moment(a.pickedDate).format('MM');
						return (date >= moment(startDate).format('MM') && date <= moment(endDate).format('MM'));
					});
					const sortedTransaction = filteredTransaction.sort((a, b) => new Date(b.pickedDate) - new Date(a.pickedDate))
					setDataMonthlyTrack(sortedTransaction)
					setFilteredMonthlyTrack(sortedTransaction)
				}
			}
		})
		setIsLoading(false)
	}

	const pickMonth =(data)=> {
		setStartDate(moment(data).startOf('month').format('YYYY-MM-DD'))
		setEndDate(moment(data).endOf('month').format('YYYY-MM-DD'))
		let startMonth = moment(data).startOf('month').format('YYYY-MM-DD')
		let endMonth = moment(data).endOf('month').format('YYYY-MM-DD')
		initialLoad(startMonth, endMonth)
		setIsMonthModalVisible(false)
    }

	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={() => setIsMonthModalVisible(true)}
				style={styles.dateStyle}>
				<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}>Select Month</Text>
				<View style={{ alignItems: 'center', flexDirection: 'row' }}>
					<Ionicons name="calendar-outline" size={22} color="black" />
					<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}> {moment(startDate).format('MMMM')}</Text>
				</View>
			</TouchableOpacity>
			<View style={[GlobalStyle.formButtonContainer, { flexDirection: "row" }]}>
				<CustomButton
					customColor={Colors.BLUE_DARK}
					onPress={() => Actions.addTransaction()}
					label='Add Transaction'
				/>
			</View>
			<FlatList
				refreshControl={(
					<RefreshControl
						refreshing={isLoading}
						onRefresh={initialLoad}
					/>
				)}
				data={filteredMonthlyTrack}
				extraData={filteredMonthlyTrack}
				keyExtractor={item => String(item.pickedDate)}
				contentContainerStyle={GlobalStyle.viewContainer}
				onEndReachedThreshold={0.1}
				ListEmptyComponent={(
					<View style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
						<View style={styles.illustContainerImage}>
							<Image style={styles.illustStyle} source={Illustrations.illustEmpty} />
							<View style={styles.titleTextContainer}>
								<Text style={styles.illustTextDesc}>Transaction is empty</Text>
							</View>
						</View>
					</View>
				)}
				renderItem={({ item, index }) => (
					<CardDisplay
						data={item} />
				)}
			/>
			<Modal
				isVisible={isMonthModalVisible}
				onBackdropPress={() => setIsMonthModalVisible(false)}
				style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}>
				<View style={styles.calendarModalContainer}>
					<MonthPicker
						selectedDate={selectedMonth}
						onMonthChange={(date) => pickMonth(date)}
						selectedBackgroundColor={Colors.GREEN_DARK}
					/>
				</View>
			</Modal>
			<CustomToast ref={toastRef} />
		</View >
	)
}

const styles = StyleSheet.create({
	calendarModalContainer: {
        backgroundColor: Colors.WhiteColor,
        minHeight: Metrics.SCREEN_WIDTH * 0.9,
        width: '90%',
        padding: 5,
        justifyContent: 'center',
        borderRadius: 7,

    },
	dateStyle: {
		backgroundColor: Colors.WhiteColor,
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 3,
		borderBottomColor: Colors.GRAY_LIGHT,
	},
	cardContainer: {
		flexDirection: "row",
		marginBottom: 20,
		marginHorizontal: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		backgroundColor: Colors.WHITE,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.50,
		shadowRadius: 1.45,
		elevation: 2,
	},
	cardTitleText: {
		fontSize: 14,
		fontFamily: Fonts.SF_MEDIUM,
		fontWeight: 'bold'
	},
	cardDescriptionText: {
		fontSize: 12,
		fontFamily: Fonts.SF_REGULAR,
		fontWeight: 'bold',
		marginBottom: 4
	},
	illustContainerImage: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	illustStyle: {
		width: 200,
		height: 200,
		resizeMode: 'cover',
	},
	illustTextDesc: {
		fontFamily: Fonts.SF_REGULAR,
		fontSize: 14,
		textAlign: 'center',
		marginTop: 20,
		color: Colors.BLACK,
	},
})

export default MonthlyTrackScreen
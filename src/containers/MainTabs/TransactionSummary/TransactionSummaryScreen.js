import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image, ActivityIndicator } from 'react-native'
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
import { currencyFormat, getTransactionList } from '../../../globals/GlobalFunction';

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
			date: date,
			image: image,
			note: note,
			transactionType: type,
			value: value,
			postingDateTime: postingDateTime
		})
	}
	return (
		<TouchableOpacity style={[styles.cardContainer, type == "In" ? { backgroundColor: Colors.GREEN_LIGHT } : { backgroundColor: Colors.RED_LIGHT }]} onPress={() => openDetail()}>
			<View style={{ flex: 3 }}>
				<Text style={styles.cardTitleText}>Transaction Type</Text>
				<Text style={styles.cardTitleText}>Transaction Nominal</Text>
				<Text style={styles.cardTitleText}>TransactionDate</Text>
			</View>
			<View style={{ flex: 2, alignItems: "flex-end" }}>
				<Text style={styles.cardDescriptionText}>{type}</Text>
				<Text style={styles.cardDescriptionText}>{value}</Text>
				<Text style={styles.cardDescriptionText}>{moment(pickedDate).format('DD-MM-YYYY')}</Text>
				{/* <Text style={styles.cardDescriptionText}>{date}</Text> */}
			</View>
			<View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
				<Image resizeMethod="resize" source={Icons.iconChevronRight} style={{ height: 15, width: 15 }} />
			</View>
		</TouchableOpacity>
	)
}

const TransactionSummary = (props) => {
	const { lastUpdate } = props
	const [isLoading, setIsLoading] = useState(false)
	const [isMonthModalVisible, setIsMonthModalVisible] = useState(false)
	const [transactionInMonthly, setTransactionInMonthly] = useState(null)
	const [transactionInCountMonthly, setTransactionInCountMonthly] = useState(null)
	const [transactionOutBalanceMonthly, setTransactionOutBalanceMonthly] = useState(null)
	const [transactionOutCountMonthly, setTransactionOutCountMonthly] = useState(null)
	const [dataMonthlyTrack, setDataMonthlyTrack] = useState([])
	const [filteredMonthlyTrack, setFilteredMonthlyTrack] = useState([])
	const toastRef = useRef(null);
	const [startDate, setStartDate] = useState(moment(new Date).startOf('month').format('YYYY-MM-DD'))
	const [endDate, setEndDate] = useState(moment(new Date).endOf('month').format('YYYY-MM-DD'))
	const [selectedMonth, setSelectedMonth] = useState(new Date())


	useEffect(() => {
		initialLoad()
		// const keys = [
		// 	StorageKeys.TRANSACTION_LIST
		// ]
		// AsyncStorage.multiRemove(keys)
	}, [])

	useEffect(() => {
		if (lastUpdate) {
			initialLoad()
		}
	}, [lastUpdate])

	const initialLoad = (data, data2) => {
		setIsLoading(true)
		getTransactionList().then(result => {
			if (data != null && data2 !== null) {
				var filteredTransaction = result.filter(a => {
					var date = moment(a.pickedDate).format('MM');
					return (date >= moment(data).format('MM') && date <= moment(data2).format('MM'));
				});
				const sortedTransaction = filteredTransaction.sort((a, b) => new Date(b.pickedDate) - new Date(a.pickedDate))
				setDataMonthlyTrack(sortedTransaction)
				setFilteredMonthlyTrack(sortedTransaction)
				getDetailTransaction(sortedTransaction)

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
					getDetailTransaction(sortedTransaction)
				}
			}
		})
		setIsLoading(false)
	}

	const pickMonth = (data) => {
		setStartDate(moment(data).startOf('month').format('YYYY-MM-DD'))
		setEndDate(moment(data).endOf('month').format('YYYY-MM-DD'))
		let startMonth = moment(data).startOf('month').format('YYYY-MM-DD')
		let endMonth = moment(data).endOf('month').format('YYYY-MM-DD')
		setIsMonthModalVisible(false)
		initialLoad(startMonth, endMonth)
	}


	const getDetailTransaction = (data) => {
		const totalValueMonthly = data.filter(e => e.type == "In")
			.map(e => e.value)
		const totalBalanceInMonthly = totalValueMonthly.reduce((a, b) => a + parseInt(b), 0);
		setTransactionInMonthly(totalBalanceInMonthly)
		setTransactionInCountMonthly(totalValueMonthly.length)

		const totalValueMonthlyOut = data.filter(e => e.type == "Out")
			.map(e => e.value)
		const totalBalanceOutMonthly = totalValueMonthlyOut.reduce((a, b) => a + parseInt(b), 0)
		setTransactionOutBalanceMonthly(totalBalanceOutMonthly)
		setTransactionOutCountMonthly(totalValueMonthlyOut.length)
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			{isLoading ?
				<>
					<ActivityIndicator size={"large"} color={Colors.BLUE_DARK} onRefresh={getDetailTransaction} />
				</>
				:
				<>
					<TouchableOpacity
						onPress={() => setIsMonthModalVisible(true)}
						style={styles.dateStyle}>
						<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}>Select Month</Text>
						<View style={{ alignItems: 'center', flexDirection: 'row' }}>
							<Ionicons name="calendar-outline" size={22} color="black" />
							<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}> {moment(startDate).format('MMMM')}</Text>
						</View>
					</TouchableOpacity>
					<View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
						<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
							<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GREEN_DARK }}>Transaction In (Rp)</Text>
								<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionInMonthly)}</Text>
								{/* <Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionInMonthly)}</Text> */}
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }}>{transactionInCountMonthly}</Text>
							</View>
							<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
							<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Transaction Out (Rp)</Text>
								<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceMonthly)}</Text>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }}>{transactionOutCountMonthly}</Text>
							</View>
						</View>
						<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
					</View>
					<View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
						<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
							<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GREEN_DARK }}>Transaction In</Text>
								<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(50000000)}</Text>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }}>Rp</Text>
							</View>
							<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
							<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Transaction Out</Text>
								<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(500000000)}</Text>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }}>RP</Text>
							</View>
						</View>
						<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
					</View>
					<View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
						<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
							<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GREEN_DARK }}>Transaction In</Text>
								<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(50000000)}</Text>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }}>Rp</Text>
							</View>
							<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
							<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Transaction Out</Text>
								<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(500000000)}</Text>
								<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }}>RP</Text>
							</View>
						</View>
						<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
					</View>
					<FlatList
						style={{ height: Metrics.SCREEN_WIDTH * 0.5 }}
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
							<View style={{ height: Metrics.SCREEN_WIDTH * 0.5, alignItems: 'center' }}>
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
				</>
			}
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

export default TransactionSummary
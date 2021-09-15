import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image, ActivityIndicator, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Modal from 'react-native-modal';
import MonthPicker from 'react-native-month-picker';

import { Colors, Fonts, Icons, Illustrations, Metrics } from '../../../globals/GlobalConfig'
import { currencyFormat, getAHPAlternative, getTransactionList, inputValidation } from '../../../globals/GlobalFunction';
import GlobalStyle from '../../../globals/GlobalStyle';

import CustomToast from '../../../components/CustomToast';
import CustomButton from '../../../components/CustomButton';
import CustomInputComponent from '../../../components/CustomInputComponent';

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

const TransactionSummary = (props) => {
	const { lastUpdate } = props
	const [isLoading, setIsLoading] = useState(false)
	const [isMonthModalVisible, setIsMonthModalVisible] = useState(false)
	const [isCalculate, setIsCalculate] = useState(false)
	const [isEndMonth, setIsEndMonth] = useState(false)
	const [estimatedIncome, setEstimatedIncome] = useState("")

	const [budgetPlan, setBudgetPlan] = useState("")
	const [eightyPercent, setEightyPercent] = useState("")
	const [twentyPercent, setTwentyPercent] = useState("")

	const [fiftyPercent, setFiftyPercent] = useState("")
	const [thirtyPercent, setThirtyPercent] = useState("")

	const [thirtyFivePercent, setThirtyFivePercent] = useState("")
	const [fifiteenPercent, setFifiteenPercent1] = useState("")
	const [fifiteenPercent2, setFifiteenPercent2] = useState("")
	const [fifiteenPercent3, setFifiteenPercent3] = useState("")

	const [transactionInMonthly, setTransactionInMonthly] = useState(null)
	const [transactionOutBalanceMonthly, setTransactionOutBalanceMonthly] = useState(null)

	const [transactionOutBalanceNeedsMonthly, setTransactionOutBalanceNeedsMonthly] = useState(null)
	const [transactionOutBalanceWantsMonthly, setTransactionOutBalanceWantsMonthly] = useState(null)

	const [transactionOutBalanceHousingMonthly, setTransactionOutBalanceHousingMonthly] = useState(null)
	const [transactionOutBalanceTransportationMonthly, setTransactionOutBalanceTransportationMonthly] = useState(null)
	const [transactionOutBalanceWantsNOtherMonthly, setTransactionOutBalanceWantsNOtherMonthly] = useState(null)
	const [transactionOutBalanceDebtPaydownMonthly, setTransactionOutBalanceDebtPaydownMonthly] = useState(null)

	const [dataMonthlyTrack, setDataMonthlyTrack] = useState([])
	const [filteredMonthlyTrack, setFilteredMonthlyTrack] = useState([])
	const toastRef = useRef(null);
	const [startDate, setStartDate] = useState(moment(new Date).startOf('month').format('YYYY-MM-DD'))
	const [endDate, setEndDate] = useState(moment(new Date).endOf('month').format('YYYY-MM-DD'))
	const [selectedMonth, setSelectedMonth] = useState(new Date())


	useEffect(() => {
		console.log(isEndMonth)
		console.log(isCalculate)
		getAHPAlternative().then(result => {
			if (result == "Budget 50 - 30 - 20") {
				setBudgetPlan(2)
			}
			else if (result == "Budget 80 - 20") {
				setBudgetPlan(1)
			}
			else {
				setBudgetPlan(3)
			}
		})
		if (moment(new Date).format('YYYY-MM-DD') == moment(endDate).endOf('month').format('YYYY-MM-DD')) {
			setIsEndMonth(true)
			initialLoad(startDate, endDate, 1)
		}
		else {
			setIsEndMonth(false)
			initialLoad()
		}
	}, [])

	useEffect(() => {
		if (moment(new Date).format('YYYY-MM-DD') == moment(endDate).endOf('month').format('YYYY-MM-DD')) {
			setIsEndMonth(true)
			initialLoad(startDate, endDate, 1)
		}
		else {
			setIsEndMonth(false)
			initialLoad()
		}
	}, [lastUpdate])

	const initialLoad = (data, data2, data3) => {
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
				if (data3 == 1) {
					getDetailTransaction(sortedTransaction, 1)
				}
				else {
					getDetailTransaction(sortedTransaction, 2)
				}
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
					if (data3 == 1) {
						getDetailTransaction(sortedTransaction, 1)
					}
					else {
						getDetailTransaction(sortedTransaction, 2)
					}
				}
			}
		})
	}

	const calendarClicked = () => {
		setIsMonthModalVisible(true)
		setIsCalculate(false)
		setTransactionInMonthly("")
		setTransactionOutBalanceMonthly("")
		setTransactionOutBalanceNeedsMonthly("")
		setTransactionOutBalanceWantsMonthly("")
		setTransactionOutBalanceHousingMonthly("")
		setTransactionOutBalanceTransportationMonthly("")
		setTransactionOutBalanceWantsNOtherMonthly("")
		setTransactionOutBalanceDebtPaydownMonthly("")
		setEightyPercent("")
		setTwentyPercent("")
		setFiftyPercent("")
		setThirtyPercent("")
		setTwentyPercent("")
		setThirtyFivePercent("")
		setFifiteenPercent1("")
		setFifiteenPercent2("")
		setFifiteenPercent3("")
		setEstimatedIncome("")
	}

	const pickMonth = (data) => {
		setIsLoading(true)
		setStartDate(moment(data).startOf('month').format('YYYY-MM-DD'))
		setEndDate(moment(data).endOf('month').format('YYYY-MM-DD'))
		let startMonth = moment(data).startOf('month').format('YYYY-MM-DD')
		let endMonth = moment(data).endOf('month').format('YYYY-MM-DD')
		if (moment(new Date).format('YYYY-MM-DD') == moment(data).endOf('month').format('YYYY-MM-DD')) {
			initialLoad(startMonth, endMonth, 1)
			setIsEndMonth(true)
		}
		else {
			initialLoad(startMonth, endMonth, 2)
		}
		setIsMonthModalVisible(false)
	}


	const getDetailTransaction = (data, data2) => {
		if (budgetPlan == 1) {
			const totalValueMonthly = data.filter(e => e.type == "In")
				.map(e => e.value)
			const totalBalanceInMonthly = totalValueMonthly.reduce((a, b) => a + parseInt(b), 0);
			setTransactionInMonthly(totalBalanceInMonthly)

			const totalValueMonthlyOut = data.filter(e => e.type == "Out")
				.map(e => e.value)
			const totalBalanceOutMonthly = totalValueMonthlyOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceMonthly(totalBalanceOutMonthly)
			if (data2 == 1) {
				var income = parseInt(totalBalanceInMonthly)
				var percentage80 = (income * 80) / 100
				var percentage20 = (income * 20) / 100
				setEightyPercent(percentage80)
				setTwentyPercent(percentage20)
			}
			else {
				var income = parseInt(estimatedIncome)
				var percentage80 = (income * 80) / 100
				var percentage20 = (income * 20) / 100
				setEightyPercent(percentage80)
				setTwentyPercent(percentage20)
			}
			console.log("80%", percentage80)
			console.log("20%", percentage20)
			console.log("Transaction In", totalBalanceInMonthly)
			console.log("Transaction Out", totalBalanceOutMonthly)
		}
		else if (budgetPlan == 2) {
			// console.log(isCalculate)
			const totalValueMonthly = data.filter(e => e.type == "Save")
				.map(e => e.value)
			const totalBalanceInMonthly = totalValueMonthly.reduce((a, b) => a + parseInt(b), 0);
			setTransactionInMonthly(totalBalanceInMonthly)

			const totalValueMonthlyNeedsOut = data.filter(e => e.type == "Needs")
				.map(e => e.value)
			const totalBalanceOutNeedsMonthly = totalValueMonthlyNeedsOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceNeedsMonthly(totalBalanceOutNeedsMonthly)

			const totalValueMonthlyWantsOut = data.filter(e => e.type == "Wants")
				.map(e => e.value)
			const totalBalanceOutWantsMonthly = totalValueMonthlyWantsOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceWantsMonthly(totalBalanceOutWantsMonthly)
			if (data2 == 1) {
				var income = parseInt(totalBalanceInMonthly)
				var percentage50 = (income * 50) / 100
				var percentage30 = (income * 30) / 100
				var percentage20 = (income * 20) / 100
				setFiftyPercent(percentage50)
				setThirtyPercent(percentage30)
				setTwentyPercent(percentage20)
			}
			else {
				var income = parseInt(estimatedIncome)
				var percentage50 = (income * 50) / 100
				var percentage30 = (income * 30) / 100
				var percentage20 = (income * 20) / 100
				setFiftyPercent(percentage50)
				setThirtyPercent(percentage30)
				setTwentyPercent(percentage20)
			}
			console.log("50%", percentage50)
			console.log("30%", percentage30)
			console.log("20%", percentage20)
			console.log("Transaction In", totalBalanceInMonthly)
			console.log("Transaction Out Needs", totalBalanceOutNeedsMonthly)
			console.log("Transaction Out Wants", totalBalanceOutWantsMonthly)
		}
		else {
			const totalValueMonthly = data.filter(e => e.type == "Save")
				.map(e => e.value)
			const totalBalanceInMonthly = totalValueMonthly.reduce((a, b) => a + parseInt(b), 0);
			setTransactionInMonthly(totalBalanceInMonthly)

			const totalValueMonthlyHousingOut = data.filter(e => e.type == "Housing")
				.map(e => e.value)
			const totalBalanceOutHousingMonthly = totalValueMonthlyHousingOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceHousingMonthly(totalBalanceOutHousingMonthly)

			const totalValueMonthlyTransportationOut = data.filter(e => e.type == "Transportation")
				.map(e => e.value)
			const totalBalanceOutTransportationMonthly = totalValueMonthlyTransportationOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceTransportationMonthly(totalBalanceOutTransportationMonthly)

			const totalValueMonthlyWantsNOtherOut = data.filter(e => e.type == "Wants and Other")
				.map(e => e.value)
			const totalBalanceOutWantsNOtherMonthly = totalValueMonthlyWantsNOtherOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceWantsNOtherMonthly(totalBalanceOutWantsNOtherMonthly)

			const totalValueMonthlyDebtPaydownOut = data.filter(e => e.type == "Debt Paydown")
				.map(e => e.value)
			const totalBalanceOutDebtPaydownMonthly = totalValueMonthlyDebtPaydownOut.reduce((a, b) => a + parseInt(b), 0)
			setTransactionOutBalanceDebtPaydownMonthly(totalBalanceOutDebtPaydownMonthly)
			if (data2 == 1) {
				var income = parseInt(totalBalanceInMonthly)
				var percentage35 = (income * 35) / 100
				var percentage15Trans = (income * 15) / 100
				var percentage20 = (income * 20) / 100
				var percentage15Debt = (income * 15) / 100
				var percentage15Save = (income * 15) / 100
				setThirtyFivePercent(percentage35)
				setFifiteenPercent1(percentage15Trans)
				setTwentyPercent(percentage20)
				setFifiteenPercent2(percentage15Debt)
				setFifiteenPercent3(percentage15Save)
			}
			else {
				var income = parseInt(estimatedIncome)
				var percentage35 = (income * 35) / 100
				var percentage15Trans = (income * 15) / 100
				var percentage20 = (income * 25) / 100
				var percentage15Debt = (income * 15) / 100
				var percentage15Save = (income * 10) / 100
				setThirtyFivePercent(percentage35)
				setFifiteenPercent1(percentage15Trans)
				setTwentyPercent(percentage20)
				setFifiteenPercent2(percentage15Debt)
				setFifiteenPercent3(percentage15Save)
			}
			console.log("35%", percentage35)
			console.log("15% Trans", percentage15Trans)
			console.log("20% Other Living Expense", percentage20)
			console.log("15% Debt", percentage15Debt)
			console.log("15% Save", percentage15Save)
			console.log("Transaction In", totalBalanceInMonthly)
			console.log("Transaction Out Housing", totalBalanceOutHousingMonthly)
			console.log("Transaction Out Transportation", totalBalanceOutTransportationMonthly)
			console.log("Transaction Out Other Living Expense", totalBalanceOutWantsNOtherMonthly)
			console.log("Transaction Out Debt", totalBalanceOutDebtPaydownMonthly)
		}
		setIsLoading(false)
	}

	const calculateBudget = () => {
		const { current } = toastRef
		if (estimatedIncome == '') {
			current.showToast('warning', "Please input estimated income monthly!")
		}
		else {
			setIsLoading(true)
			setIsCalculate(true)
			initialLoad(startDate, endDate, 2)
		}
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<TouchableOpacity
				onPress={() => calendarClicked()}
				style={styles.dateStyle}>
				<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}>Select Month</Text>
				<View style={{ alignItems: 'center', flexDirection: 'row' }}>
					<Ionicons name="calendar-outline" size={22} color="black" />
					<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}> {moment(startDate).format('MMMM')}</Text>
				</View>
			</TouchableOpacity>
			<ScrollView style={{ height: Metrics.SCREEN_WIDTH * 0.5 }}>
				{isLoading ?
					<>
						<ActivityIndicator size={"large"} color={Colors.BLUE_DARK} onRefresh={getDetailTransaction} />
					</>
					:
					<>

						<View style={GlobalStyle.formHeaderContentContainer}>
							<CustomInputComponent
								label='Estimated Income Monthly'
								value={estimatedIncome}
								onChangeText={inputValidation(setEstimatedIncome, "money")}
								keyboardType='numeric'
							/>
						</View>
						<View style={[GlobalStyle.formButtonContainer, { flexDirection: "row" }]}>
							<CustomButton
								customColor={Colors.BLUE_DARK}
								onPress={() => calculateBudget()}
								label='Calculate Budget'
							/>
						</View>
						{(isEndMonth || isCalculate) && budgetPlan == "1" &&
							<View style={{ aspectRatio: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
								<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GREEN_DARK }}>Transaction In (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{estimatedIncome == "" ? currencyFormat(transactionInMonthly) : currencyFormat(estimatedIncome)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }]}>{currencyFormat(twentyPercent)}</Text>
									</View>
									<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Transaction Out (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceMonthly > eightyPercent && { color: Colors.RED }]}>{currencyFormat(eightyPercent)}</Text>
									</View>
								</View>
								<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
							</View>
						}
						{(isEndMonth || isCalculate) && budgetPlan == "2" &&
							<View style={{ aspectRatio: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
								<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GREEN_DARK }}>Transaction In (Rp)</Text>
									<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>Total {estimatedIncome == "" ? currencyFormat(transactionInMonthly) : currencyFormat(estimatedIncome)}</Text>
									<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>Saved {estimatedIncome == "" ? currencyFormat(transactionInMonthly - transactionOutBalanceNeedsMonthly - transactionOutBalanceWantsMonthly) : currencyFormat(estimatedIncome - transactionOutBalanceNeedsMonthly - transactionOutBalanceWantsMonthly)}</Text>
									<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }]}>Target saved {currencyFormat(twentyPercent)}</Text>
								</View>
								<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
								<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Transaction Out Needs (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceNeedsMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceNeedsMonthly > fiftyPercent && { color: Colors.RED }]}>Limit needs {currencyFormat(fiftyPercent)}</Text>
										{transactionOutBalanceNeedsMonthly > fiftyPercent &&
											<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Exceeds Budget Limit</Text>
										}
									</View>
									<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Transaction Out Wants (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceWantsMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceWantsMonthly > thirtyPercent && { color: Colors.RED }]}>Limit wants {currencyFormat(thirtyPercent)}</Text>
										{transactionOutBalanceWantsMonthly > thirtyPercent &&
											<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED }}>Exceeds Budget Limit</Text>
										}
									</View>
								</View>
								<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
							</View>
						}
						{(isEndMonth || isCalculate) && budgetPlan == "3" &&
							<View style={{ aspectRatio: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
								<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GREEN_DARK, textAlign: 'center' }}>Transaction In (Rp)</Text>
									<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{estimatedIncome == "" ? currencyFormat(transactionInMonthly) : currencyFormat(estimatedIncome)}</Text>
									<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }]}>{currencyFormat(fifiteenPercent3)}</Text>
								</View>
								<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
								<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED, textAlign: 'center' }}>Transaction Out Housing (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceHousingMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceHousingMonthly > thirtyFivePercent && { color: Colors.RED }]}>{currencyFormat(thirtyFivePercent)}</Text>
									</View>
									<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED, textAlign: 'center' }}>Transaction Out Trasportation (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceTransportationMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceTransportationMonthly > fifiteenPercent && { color: Colors.RED }]}>{currencyFormat(fifiteenPercent)}</Text>
									</View>
								</View>
								<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
								<View style={{ flex: 1, width: '100%', flexDirection: 'row', marginVertical: 10 }}>
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED, textAlign: 'center' }}>Transaction Out Other (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceWantsNOtherMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceWantsNOtherMonthly > twentyPercent && { color: Colors.RED }]}>{currencyFormat(twentyPercent)}</Text>
									</View>
									<View style={{ height: '100%', borderColor: Colors.GRAY, borderWidth: 1 }} />
									<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.RED, textAlign: 'center' }}>Transaction Out Debt Paydown (Rp)</Text>
										<Text style={{ fontSize: 24, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.75, color: Colors.BLACK }}>{currencyFormat(transactionOutBalanceDebtPaydownMonthly)}</Text>
										<Text style={[{ fontSize: 12, fontFamily: Fonts.SF_MEDIUM, letterSpacing: 0.38, color: Colors.GRAY_DARK }, transactionOutBalanceDebtPaydownMonthly > fifiteenPercent2 && { color: Colors.RED }]}>{currencyFormat(fifiteenPercent2)}</Text>
									</View>
								</View>
							</View>
						}
					</>
				}
			</ScrollView>
			<View style={{ width: '100%', borderColor: Colors.GRAY, borderWidth: 2 }} />
			<FlatList
				style={{ height: Metrics.SCREEN_WIDTH * 0.4 }}
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
		</View>
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
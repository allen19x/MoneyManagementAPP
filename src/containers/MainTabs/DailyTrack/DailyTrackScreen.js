import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { Colors, Fonts, Icons, Illustrations, Metrics, StorageKeys } from '../../../globals/GlobalConfig'
import GlobalStyle from '../../../globals/GlobalStyle';

import CustomToast from '../../../components/CustomToast';
import CustomCalendar from '../../../components/CustomCalendar';

const CardDisplay = (props) => {
	const { data } = props
	const {
	} = data

	const openDetail = () => {
	}
	return (
		<TouchableOpacity style={styles.cardContainer} onPress={() => openDetail()}>
			<View style={{ flex: 3 }}>
				<Text style={styles.cardTitleText}></Text>
				<Text style={styles.cardTitleText}></Text>
				<Text style={styles.cardTitleText}></Text>
				<Text style={styles.cardTitleText}></Text>
			</View>
			<View style={{ flex: 2, alignItems: "flex-end" }}>
				<Text style={styles.cardDescriptionText}></Text>
				<Text style={styles.cardDescriptionText}></Text>
				<Text style={styles.cardDescriptionText}></Text>
				<Text style={styles.cardDescriptionText}></Text>
			</View>
			<View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
				<Image resizeMethod="resize" source={Icons.iconChevronRight} style={{ height: 15, width: 15 }} />
			</View>
		</TouchableOpacity>
	)
}

const DailyTrackScreen = (props) => {
	const { lastUpdate } = props
	const [isLoading, setIsLoading] = useState(false)
	const [isStartDate, setIsStartDate] = useState(false)
	const [incorrectDate, setIncorrectDate] = useState(null)
	const [incorrectMessage, setIncorrectMessage] = useState('')
	const [isDateModalVisible, setIsDateModalVisible] = useState(false)
	const [dataDailyTrack, setDataDailyTrack] = useState([])
	const [filteredDailyTrack, setFilteredDailyTrack] = useState([])
	const toastRef = useRef(null);
	const [search, setSearch] = useState('')
	const [startDate, setStartDate] = useState(moment(new Date).startOf('month').format('YYYY-MM-DD'))
	const [endDate, setEndDate] = useState(moment(new Date).format('YYYY-MM-DD'))

	useEffect(() => {
		const keys = [
		]
		AsyncStorage.multiRemove(keys)
		initialLoad()
	}, [lastUpdate])

	const initialLoad = (data, data2) => {
		const { current } = toastRef
		setIsLoading(true)
		setIsLoading(false)
	}

	const clearGR = () => {
		setSearch("")
		setFilteredGR(dataGR)
	}

	const funcGetDate = (res) => {
		if (!isStartDate) {
			if (res.dateString > endDate) {
				setStartDate(moment().startOf('month').format('YYYY-MM-DD'))
				setEndDate(moment(new Date).format('YYYY-MM-DD'))
				setIsStartDate(false)
				setIncorrectDate(new Date)
				setIncorrectMessage("Start date must be smaller than end date")
			} else {
				setStartDate(res.dateString)
				setIsStartDate(true)
			}
		}
		else {
			if (startDate > res.dateString) {
				setStartDate(moment().startOf('month').format('YYYY-MM-DD'))
				setEndDate(moment(new Date).format('YYYY-MM-DD'))
				setIsStartDate(false)
				setIncorrectDate(new Date)
				setIncorrectMessage("Start date must be smaller than end date")
			}
			else {
				setEndDate(res.dateString)
				setIsStartDate(false)
				setIsDateModalVisible(false)
				initialLoad(startDate, res.dateString)
			}
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={() => setIsDateModalVisible(true)}
				style={styles.dateStyle}>
				<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}>Select Start Date</Text>
				<View style={{ alignItems: 'center', flexDirection: 'row' }}>
					<Ionicons name="calendar-outline" size={22} color="black" />
					<Text style={{ fontSize: 14, fontFamily: Fonts.SF_REGULAR, letterSpacing: 0.5, lineHeight: 24, color: Colors.SemiBlackColor }}> {moment(startDate).format('DD MMMM')} - {moment(endDate).format('DD MMMM')}</Text>
				</View>
			</TouchableOpacity>
			<FlatList
				refreshControl={(
					<RefreshControl
						refreshing={isLoading}
						onRefresh={initialLoad}
					/>
				)}
				data={filteredDailyTrack}
				extraData={filteredDailyTrack}
				keyExtractor={item => String(item.key)}
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
			<CustomCalendar
				message={incorrectMessage}
				lastUpdate={incorrectDate}
				isStartDate={isStartDate}
				onBackdropPress={() => setIsDateModalVisible(false)}
				currentDate={startDate}
				endDate={endDate}
				funcGetDate={funcGetDate}
				isDateModalVisible={isDateModalVisible}
			/>
			<CustomToast ref={toastRef} />
		</View >
	)
}

const styles = StyleSheet.create({
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

export default DailyTrackScreen
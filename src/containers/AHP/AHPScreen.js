import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { Colors, Fonts, Icons, Illustrations, Metrics, StorageKeys } from '../../globals/GlobalConfig'
import GlobalStyle from '../../globals/GlobalStyle';

import CustomToast from '../../components/CustomToast';
import CustomButton from '../../components/CustomButton';

const AHPScreen = (props) => {
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

    return (
        <View style={{ flex: 1, paddingVertical: 20 }}>
            <View style={GlobalStyle.formHeaderContentContainer, { height: Metrics.SCREEN_HEIGHT * 0.5, justifyContent: 'space-evenly', paddingHorizontal: 30 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.illustContainerImage}>
                        <Text style={{ fontSize: 20, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.5, lineHeight: 24, color: Colors.DARK, textAlign: 'center', marginBottom: 20 }}>Welcome to Money Management App !!!</Text>
                        <Image style={styles.illustStyle} source={Illustrations.illustWelcome} />
                        <Text style={styles.illustTextDesc}>With this app you will get the best budget plan by using Analytical Hierarchy Process for decision making.</Text>
                    </View>
                </View>
            </View>
            <View style={[GlobalStyle.formButtonContainer, { flex: 1, flexDirection: "row", position: 'absolute', bottom: 20 }]}>
                <CustomButton
                    customColor={Colors.BLUE_DARK}
                    onPress={() => Actions.pop()}
                    label='Start Finding Your Budget Plan'
                />
            </View>
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

export default AHPScreen
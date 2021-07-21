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
import CustomInputComponent from '../../components/CustomInputComponent'
import { inputValidation } from '../../globals/GlobalFunction';

const AHPScreen = (props) => {
    const { lastUpdate } = props
    const [isLoading, setIsLoading] = useState(false)
    const [isWelcome, setIsWelcome] = useState(false)
    const [isCriteria1, setIsCriteria1] = useState(true)
    const [isCriteria2, setIsCriteria2] = useState(true)
    const [isCriteria3, setIsCriteria3] = useState(true)

    const [Rank1, setRank1] = useState()
    const [Rank2, setRank2] = useState()
    const [Rank3, setRank3] = useState()

    const [alternativePriorityDetail1, setAlternativePriorityDetail1] = useState(0.230)
    const [alternativePriorityDetail2, setAlternativePriorityDetail2] = useState(0.122)
    const [alternativePriorityDetail3, setAlternativePriorityDetail3] = useState(0.648)

    const [alternativePriorityWants1, setAlternativePriorityWants1] = useState(0.633)
    const [alternativePriorityWants2, setAlternativePriorityWants2] = useState(0.260)
    const [alternativePriorityWants3, setAlternativePriorityWants3] = useState(0.106)

    const [alternativePriorityDebt1, setAlternativePriorityDebt1] = useState(0.429)
    const [alternativePriorityDebt2, setAlternativePriorityDebt2] = useState(0.429)
    const [alternativePriorityDebt3, setAlternativePriorityDebt3] = useState(0.143)

    const [firstValue, setFirstValue] = useState('')
    const [secondValue, setSecondValue] = useState('')
    const [thirdValue, setThirdValue] = useState('')

    const toastRef = useRef(null);

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

    const startAHP = () => {
        setIsWelcome(true)
    }

    const handleSubmit = () => {
        const { current } = toastRef
        setIsLoading(true)
        if (firstValue == '' || secondValue == '' || thirdValue == '') {
            current.showToast('warning', "Please input compared value!")
            setIsLoading(false)
        }
        else if (firstValue > 9 || firstValue <= 0 || secondValue > 9 || secondValue <= 0 || thirdValue > 9 || thirdValue <= 0) {
            current.showToast('warning', "Please input value range between 1 to 9!")
            setIsLoading(false)
        }
        else {
            let sum1 = 0
            let sum2 = 0
            let sum3 = 0
            let priority1 = 0
            let priority2 = 0
            let priority3 = 0
            let WS1 = 0
            let WS2 = 0
            let WS3 = 0
            let lambdaMax = 0

            let CR = 0
            let MS1 = 0
            let MS2 = 0
            let MS3 = 0
            const balancedValue = 1
            const value1 = parseInt(firstValue)
            const value2 = parseInt(secondValue)
            const value3 = parseInt(thirdValue)

            sum1 = balancedValue + (isCriteria1 ? (1 / value1) : value1) + (isCriteria2 ? (1 / value2) : value2)
            sum2 = (isCriteria1 ? value1 : 1 / value1) + balancedValue + (isCriteria3 ? (1 / value3) : value3)
            sum3 = (isCriteria2 ? value2 : 1 / value2) + (isCriteria3 ? value3 : 1 / value3) + balancedValue

            priority1 = (balancedValue / sum1 + (isCriteria1 ? value1 : 1 / value1) / sum2 + (isCriteria2 ? value2 : 1 / value2) / sum3) / 3
            priority2 = ((isCriteria1 ? 1 / value1 : value1) / sum1 + balancedValue / sum2 + (isCriteria3 ? value3 : 1 / value3) / sum3) / 3
            priority3 = ((isCriteria2 ? 1 / value2 : value2) / sum1 + (isCriteria3 ? 1 / value3 : value3) / sum2 + balancedValue / sum3) / 3

            WS1 = balancedValue * priority1 + (isCriteria1 ? value1 : 1 / value1) * priority2 + (isCriteria2 ? value2 : 1 / value2) * priority3
            WS2 = (isCriteria1 ? 1 / value1 : value1) * priority1 + balancedValue * priority2 + (isCriteria3 ? value3 : 1 / value3) * priority3
            WS3 = (isCriteria2 ? 1 / value2 : value2) * priority1 + (isCriteria3 ? 1 / value3 : value3) * priority2 + balancedValue * priority3

          
            lambdaMax = (WS1 / priority1 + WS2 / priority2 + WS3 / priority3) / 3
            CR = ((lambdaMax - 3) / 2) / 0.58
            console.log(CR.toFixed(3))

            if (CR < 0.1) {
                MS1 = priority1*alternativePriorityDetail1+ priority2*alternativePriorityWants1 + priority3*alternativePriorityDebt1
                MS2 = priority1*alternativePriorityDetail2+ priority2*alternativePriorityWants2 + priority3*alternativePriorityDebt2
                MS3 = priority1*alternativePriorityDetail3+ priority2*alternativePriorityWants3 + priority3*alternativePriorityDebt3
                console.log(MS1.toFixed(3))
                console.log(MS2.toFixed(3))
                console.log(MS3.toFixed(3))
            }
            else {
                setFirstValue('')
                setSecondValue('')
                setThirdValue('')
                setIsCriteria1(true)
                setIsCriteria2(true)
                setIsCriteria3(true)
            }
            setIsLoading(false)
        }
    }


    const criteria1 = () => {
        if (isCriteria1) {
            setIsCriteria1(false)
        }
        else {
            setIsCriteria1(true)
        }
    }

    const criteria2 = () => {
        if (isCriteria2) {
            setIsCriteria2(false)
        }
        else {
            setIsCriteria2(true)
        }
    }

    const criteria3 = () => {
        if (isCriteria3) {
            setIsCriteria3(false)
        }
        else {
            setIsCriteria3(true)
        }
    }

    return (
        <View style={{ flex: 1, paddingVertical: 20 }}>
            {!isWelcome ?
                <>
                    <View style={{
                        height: Metrics.SCREEN_HEIGHT * 0.5, justifyContent: 'space-evenly', paddingHorizontal: 30, paddingTop: 20,
                        paddingHorizontal: 20,
                        paddingBottom: 10,
                    }}>
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
                            onPress={() => startAHP()}
                            label='Start Finding Your Budget Plan'
                        />
                    </View>
                </>
                :
                <>
                    <View style={[GlobalStyle.formHeaderContentContainer, { height: Metrics.SCREEN_HEIGHT * 0.5, justifyContent: 'space-evenly', paddingHorizontal: 30 }]}>
                        <Text style={{ fontSize: 18, fontFamily: Fonts.SF_BOLD, letterSpacing: 0.5, lineHeight: 24, color: Colors.DARK, textAlign: 'center', marginBottom: 20 }}>To know your best budget plan, we need you to input ratio value to all the compared criteria</Text>
                        <View style={styles.illustContainerImage}>
                            <Image style={styles.illustStyle} source={Illustrations.illustPairwise} />
                            <Text style={styles.illustTextDesc1}>note :</Text>
                            <Text style={styles.illustTextDesc1}>Please select the criteria you prefer more, then input the value from table above</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle.formHeaderContentContainer, { justifyContent: 'space-evenly', paddingHorizontal: 30 }]}>
                        <CustomInputComponent
                            isCompared
                            label='Budget Detail'
                            label2='Big Spending (Wants)'
                            selectedCriteria={isCriteria1}
                            onChangeOption={criteria1}
                            value={firstValue}
                            onChangeText={inputValidation(setFirstValue, 'number')}
                        />
                        <CustomInputComponent
                            isCompared
                            label='Budget Detail'
                            label2='Debt Needs More Than 15%'
                            selectedCriteria={isCriteria2}
                            onChangeOption={criteria2}
                            value={secondValue}
                            onChangeText={inputValidation(setSecondValue, 'number')}
                        />
                        <CustomInputComponent
                            isCompared
                            label='Big Spending (Wants)'
                            label2='Debt Needs More Than 15%'
                            selectedCriteria={isCriteria3}
                            onChangeOption={criteria3}
                            value={thirdValue}
                            onChangeText={inputValidation(setThirdValue, 'number')}
                        />
                    </View>
                    <View style={[GlobalStyle.formButtonContainer, { flex: 1, flexDirection: "row", alignItems: 'center' }]}>
                        <CustomButton
                            customColor={Colors.BLUE_DARK}
                            onPress={() => handleSubmit()}
                            label='Submit'
                        />
                    </View>
                </>
            }
            <CustomToast ref={toastRef} />
        </View >
    )
}

const styles = StyleSheet.create({
    illustTextDesc1: {
        fontSize: 14,
        fontFamily: Fonts.SF_MEDIUM,
        letterSpacing: 0.5,
        color: Colors.DARK,
        textAlign: 'center',
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
        width: 250,
        height: 200,
        resizeMode: 'contain',
    },
    illustTextDesc: {
        fontFamily: Fonts.SF_REGULAR,
        fontSize: 14,
        textAlign: 'center',
        color: Colors.BLACK,
    },
})

export default AHPScreen
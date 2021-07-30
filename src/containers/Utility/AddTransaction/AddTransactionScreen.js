import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors, Fonts, SelectedBudget, StorageKeys } from '../../../globals/GlobalConfig'
import { getAHPAlternative, getTransactionList, inputValidation } from '../../../globals/GlobalFunction';
import GlobalStyle from '../../../globals/GlobalStyle';

import CustomToast from '../../../components/CustomToast';
import CustomButton from '../../../components/CustomButton';
import CustomInputComponent from '../../../components/CustomInputComponent';
import CustomModalCamera from '../../../components/CustomModalCamera';
import CustomModalConfirm from '../../../components/CustomModalConfirm';

const AddTransactionScreen = (props) => {
    const { lastUpdate } = props
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState('')
    const [type, setType] = useState([])
    const [selectedType, setSelectedType] = useState('')
    const [catatan, setCatatan] = useState('')
    const [nominal, setNominal] = useState("")
    const [tempReceiverIDPhoto, setTempReceiverIDPhoto] = useState('')
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false)
    const [isModalTakePhotoVisible, setIsModalTakePhotoVisible] = useState(false)
    const [date, setDate] = useState(new Date)
    const [fullTime, setFullTime] = useState(new Date)
    const toastRef = useRef(null);

    useEffect(() => {
        getAHPAlternative().then(result => {
            if (result == "Budget 50 - 30 - 20") {
                setType(SelectedBudget.B_50_30_20)
            }
            else if (result == "Budget 80 - 20") {
                setType(SelectedBudget.B_80_20)
            }
            else {
                setType(SelectedBudget.DEBT_DIET)
            }
        })
        setFullTime(new Date)
        initialLoad()
    }, [lastUpdate])

    const initialLoad = () => {
        const { current } = toastRef
        setIsLoading(true)
        setIsLoading(false)
    }

    const changeDate = () => {
        setIsShowDatePicker(true)
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate)
        setIsShowDatePicker(false);
        setDate(currentDate);
    };

    const handleTakePhoto = () => {
        setIsModalTakePhotoVisible(true)
    }

    const onPictureTaken = (cameraData) => {
        const {
            uri,
        } = cameraData
        setTempReceiverIDPhoto(uri)
        setIsModalTakePhotoVisible(false)
    }

    const handleSubmit = () => {
        const { current } = toastRef
        if (selectedType == '') {
            current.showToast('warning', "Please select transaction type!")
        }
        else if (nominal === '') {
            current.showToast('warning', "Please input transaction nominal!")
        }
        else if (date === '') {
            current.showToast('warning', "Please select transaction date!")
        }
        else {
            setIsModalConfirmVisible(true)
        }
    }

    const onSubmit = () => {
        const { current } = toastRef
        getTransactionList().then(result => {
            const data = {
                type: selectedType,
                value: nominal,
                image: tempReceiverIDPhoto,
                note: catatan,
                postingDateTime: fullTime,
                pickedDate: date
            };
            if (result != null) {
                let transactionData = [...result, data]
                AsyncStorage.setItem(StorageKeys.TRANSACTION_LIST, JSON.stringify(transactionData));
            }
            else {
                AsyncStorage.setItem(StorageKeys.TRANSACTION_LIST, JSON.stringify([data]));
            }
        });
        setIsModalConfirmVisible(false)
        Actions.pop()
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                onMomentumScrollEnd={e => setScrollPosition(e.nativeEvent.contentOffset.y)}>
                <View style={GlobalStyle.formHeaderContentContainer}>
                    {type != null && !isLoading ?
                        <>
                            <CustomInputComponent
                                isOption
                                label='Transaction Type'
                                optionList={type}
                                isOptionIncludeValue={true}
                                onValueChange={setSelectedType}
                                value={selectedType} />
                        </>
                        :
                        <>
                        </>
                    }
                    <CustomInputComponent
                        label='Transaction Nominal'
                        value={`RP ${nominal}`}
                        onChangeText={inputValidation(setNominal, 'money')}
                        keyboardType='numeric'
                    />
                    <CustomInputComponent
                        isDate
                        onDatePress={() => changeDate()}
                        label='Transaction Date'
                        value={date}
                    />
                    {isShowDatePicker && (
                        <DateTimePicker
                            maximumDate={new Date}
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />)}
                    <View style={GlobalStyle.formContentContainer}>
                        <CustomInputComponent
                            isVertical
                            label='Notes (Optional)'
                            isLabelBold
                            value={catatan}
                            placeholder='Notes'
                            onChangeText={setCatatan}
                        />
                    </View>
                </View>
                <View style={GlobalStyle.formContentContainer}>
                    <View style={[GlobalStyle.formButtonContainer, { paddingHorizontal: 0 }]}>
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
                </View>
                <View style={[GlobalStyle.formButtonContainer, { flexDirection: "row" }]}>
                    <CustomButton
                        customColor={Colors.BLUE_DARK}
                        onPress={() => handleSubmit()}
                        label='Submit'
                    />
                    <View style={{ width: 10 }}></View>
                    <CustomButton
                        customColor={Colors.GRAY_DARK}
                        onPress={() => Actions.pop()()}
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
                title='Save Transaction'
                body='Are you sure want to save transaction? Make sure your data is correct.'
                onConfirm={onSubmit}
                onCancel={() => setIsModalConfirmVisible(false)}
                isModalVisible={isModalConfirmVisible}
            />
            <CustomToast ref={toastRef} />
        </View >
    )
}

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

export default AddTransactionScreen
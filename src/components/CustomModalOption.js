import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableNativeFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import GlobalStyle from '../globals/GlobalStyle';
import { Colors, Fonts } from '../globals/GlobalConfig';
import CustomButton from './CustomButton';

const ItemOption = (props) => {
    const { item, index, chosenOption, onChoose } = props
    const { label, value } = item

    return (
        <TouchableNativeFeedback
            onPress={() => onChoose(item)}>
            <View style={styles.itemContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={[GlobalStyle.textFontSize14, chosenOption == value && { fontFamily: Fonts.SF_MEDIUM, fontWeight: 'bold' }]}>{label}</Text>
                </View>
                <View style={{ height: '100%', width: 40, justifyContent: 'center', alignItems: 'flex-end' }}>
                    {chosenOption == value && (
                        <Feather name='check' size={24} color={Colors.GREEN} />
                    )}
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const CustomModalOption = (props) => {
    const {
        searchKeyword,
        chosenOption,
        optionList,
        onChoose,
        onCancel,
        isModalVisible
    } = props

    const [filterKeyword, setFilterKeyword] = useState('')
    const [filteredOptionList, setFilteredOptionList] = useState([])

    useEffect(() => {
        setFilteredOptionList(optionList)
    }, [optionList])

    useEffect(() => {
        setFilteredOptionList(optionList.filter(e => String(e.label).toLowerCase().includes(filterKeyword.toLowerCase())))
    }, [filterKeyword])

    const onChooseOption = (item) => {
        setFilterKeyword('')
        onChoose(item.key)
        onCancel()
    }

    const onBack = () => {
        setFilterKeyword('')
        onCancel()
    }

    const modalContent = (
        <View style={styles.modalContainer}>
            <View style={styles.searchBoxContainer}>
                <View style={styles.searchIconContainer}>
                    <AntDesign name='search1' size={20} />
                </View>
                <TextInput
                    style={{ flex: 1 }}
                    value={filterKeyword}
                    placeholder={`Ketik disini untuk mencari ${searchKeyword}`}
                    onChangeText={setFilterKeyword}
                />
            </View>
            {filteredOptionList.length > 0 && (
                <View style={{ paddingLeft: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Pilih salah satu {searchKeyword} dibawah ini</Text>
                </View>
            )}
            <View style={styles.modalContentContainer}>
                <FlatList
                    data={filteredOptionList}
                    extraData={filteredOptionList}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent={() => (
                        <View style={{ paddingHorizontal: 10, height: 1 }}>
                            <View style={{ flex: 1, backgroundColor: Colors.GRAY }} />
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={{ marginTop: 100, alignItems: 'center' }}>
                            <Text style={{ fontFamily: Fonts.SF_MEDIUM, fontWeight: 'bold' }}>{searchKeyword} tidak ditemukan</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <ItemOption
                            item={item}
                            index={index}
                            chosenOption={chosenOption}
                            onChoose={onChooseOption}
                        />
                    )}
                />
            </View>
            <CustomButton
                customColor={Colors.RED}
                onPress={onBack}
                label={'Kembali'}
            />
        </View>
    )

    return (
        <Modal
            avoidKeyboard={Platform.OS === "ios"}
            isVisible={isModalVisible}
            style={{ margin: 20 }}
            backdropOpacity={0.8}
            children={modalContent} />
    )
}

export default CustomModalOption

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden'
    },
    searchBoxContainer: {
        height: 50,
        width: '100%',
        backgroundColor: `${Colors.GRAY}44`,
        borderRadius: 10,
        flexDirection: "row"
    },
    searchIconContainer: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContentContainer: {
        flex: 1
    },
    itemContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10
    }
})

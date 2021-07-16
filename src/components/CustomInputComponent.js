import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Icons, Colors, Fonts } from '../globals/GlobalConfig';
import GlobalStyle from '../globals/GlobalStyle';
import moment from 'moment';

export default class CustomInputComponent extends PureComponent {
    render() {
        const {
            label,
            suffix = '',
            isLabelBold,
            value,
            isOption,
            isOptionSloc,
            isCustomOption,
            isOptionIncludeValue,
            isDate,
            isTime,
            isNote,
            isVertical,
            optionList,
            disabled,
            disabledTextInput,
            onTimePress,
            onDatePress,
            onCameraPress,
            onCustomOptionPress,
            onValueChange,
            onChangeText,
            onFocus,
            onEndEditing,
            isPlaceholder,
            placeholder = '',
            keyboardType = 'default'
        } = this.props


        let inputView = (
            <View style={GlobalStyle.detailInputContainer}>
                <TextInput
                    style={{ paddingHorizontal: 0, flex: 1 }}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.GRAY}
                    value={String(value)}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onEndEditing={onEndEditing}
                    keyboardType={keyboardType}
                    multiline={false}
                />
                {suffix != '' && (
                    <View style={{ width: 50, alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold' }}>{suffix}</Text>
                    </View>
                )}
            </View>
        )

        if (isCustomOption) {
            inputView = (
                <TouchableOpacity onPress={onCustomOptionPress} style={GlobalStyle.detailInputContainer}>
                    <Picker
                        style={{ marginLeft: -8, flex: 1 }}
                        // iosHeader={placeholder}
                        enabled={false}
                        mode="dropdown"
                        selectedValue={value}
                        onValueChange={onValueChange}
                    // placeholder={placeholder}
                    >
                        {optionList.map((item, index) => 
                        <Picker.Item key={item.key} label={isOptionIncludeValue && item.value != '' ? `${item.value} - ${item.label}` : item.label} value={item.value} />)}
                    </Picker>
                    <View style={{ height: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 1, right: 0, backgroundColor: Colors.WHITE }}>
                        <AntDesign name='search1' size={20} />
                    </View>
                </TouchableOpacity>
            )
        }

        if (isOption) {
            inputView = (
                <View style={GlobalStyle.detailInputContainer}>
                    <Picker
                        style={{ marginLeft: -8, flex: 1 }}
                        // iosHeader={placeholder}
                        mode="dropdown"
                        selectedValue={value}
                        onValueChange={onValueChange}
                    // placeholder={placeholder}
                    >
                        {optionList.map((item, index) => <Picker.Item key={item.MA_MATL_BATCH} label={ item.MA_MATL_BATCH} value={item.MA_MATL_BATCH} />)}
                    </Picker>
                </View>
            )
        }

        if (isOptionSloc) {
            inputView = (
                <View style={GlobalStyle.detailInputContainer}>
                    <Picker
                        style={{ marginLeft: -8, flex: 1 }}
                        // iosHeader={placeholder}
                        mode="dropdown"
                        selectedValue={value}
                        onValueChange={onValueChange}
                    // placeholder={placeholder}
                    >
                        {optionList.map((item, index) => <Picker.Item key={item.text} label={ item.text } value={item.id} />)}
                    </Picker>
                </View>
            )
        }

        if (disabled) {
            inputView = (
                <View style={GlobalStyle.detailInputContainerWithoutBorder}>
                    <Text style={[GlobalStyle.contentCardTextValue, isPlaceholder && { color: Colors.GRAY }]}>{value}</Text>
                </View>
            )
        }
        if (disabledTextInput) {
            inputView = (
                    <View style={GlobalStyle.detailInputContainerWithoutBorder}>
                        <View style={{ paddingHorizontal: 0, flex: 1 }}>
                            <Text style={[GlobalStyle.contentCardTextValue, isPlaceholder && { color: Colors.GRAY }]}>{value}</Text>
                        </View>
                            <View style={{ width: 50, alignItems: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold' }}>{suffix}</Text>
                            </View>
                    </View>
            )
        }
        if (isDate) {
            if (disabled) {
                inputView = (
                    <View style={GlobalStyle.detailInputContainerWithoutBorder}>
                        <Image source={Icons.iconTanggalBlack} resizeMode='contain' style={{ height: 24, width: 24, marginRight: 15 }} />
                        <Text style={GlobalStyle.detailValue}>{value ? moment(value).format('YYYY-MM-DD') : 'YYYY-MM-DD'}</Text>
                    </View>
                )
            }
            else {
                inputView = (
                    <TouchableOpacity onPress={onDatePress} style={GlobalStyle.detailInputContainer}>
                        <Image source={Icons.iconTanggalBlue} resizeMode='contain' style={{ height: 24, width: 24, marginRight: 15 }} />
                        <Text style={GlobalStyle.detailDateValue}>{value ? moment(value).format('YYYY-MM-DD') : 'YYYY-MM-DD'}</Text>
                    </TouchableOpacity>
                )
            }
        }

        if (isTime) {
            if (disabled) {
                inputView = (
                    <View style={GlobalStyle.detailInputContainerWithoutBorder}>
                        <Image source={Icons.iconWaktuBlack} resizeMode='contain' style={{ height: 24, width: 24, marginRight: 15 }} />
                        <Text style={GlobalStyle.detailValue}>{value ? value : 'HH:MM'}</Text>
                    </View>
                )
            }
            else {
                inputView = (
                    <TouchableOpacity onPress={onTimePress} style={GlobalStyle.detailInputContainer}>
                        <Image source={Icons.iconWaktuBlue} resizeMode='contain' style={{ height: 24, width: 24, marginRight: 15 }} />
                        <Text style={GlobalStyle.detailDateValue}>{value ? value : 'HH:MM'}</Text>
                    </TouchableOpacity>
                )
            }
        }

        if (isNote) {
            return (
                <View style={GlobalStyle.notesInputContainer}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 20
                    }}>
                        <TextInput
                            editable={disabled ? false : true}
                            placeholder='Isi Catatan'
                            placeholderTextColor={Colors.GRAY}
                            value={value}
                            onChangeText={onChangeText}
                            style={{ color: Colors.DARK }}
                        />
                    </View>
                    {!disabled && (
                        <TouchableOpacity
                            onPress={onCameraPress}
                            style={GlobalStyle.cameraIconContainer}>
                            <Image source={Icons.iconCamera} resizeMode='contain' style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    )}
                </View>
            )
        }

        if (isVertical) {
            return (
                <View style={{ height: 80, width: '100%', marginBottom: 10 }}>
                    {label != undefined && (
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={[GlobalStyle.contentCardTextLabel, isLabelBold && { fontFamily: Fonts.SF_MEDIUM, fontWeight: 'bold' }]}>{label}</Text>
                        </View>
                    )}
                    {inputView}
                </View>
            )
        }

        return (
            <View style={GlobalStyle.detailContainer}>
                {label != undefined && (
                    <View style={{ flex: 1, marginRight: 20, justifyContent: "center" }}>
                        <Text style={[GlobalStyle.contentCardTextLabel, isLabelBold && { fontFamily: Fonts.SF_MEDIUM, fontWeight: 'bold' }]}>{label}</Text>
                    </View>
                )}
                {inputView}
            </View>
        );
    }
}

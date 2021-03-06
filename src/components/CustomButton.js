
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    ActivityIndicator,
    Platform
} from 'react-native';
import { Fonts, Colors } from '../globals/GlobalConfig';

const PRIMARY_BUTTON_COLOR = Colors.GREEN_DARK
const DISABLED_BUTTON_COLOR = Colors.GRAY
const RIPPLE_COLOR = Colors.GRAY
const WHITE_COLOR = Colors.WHITE

const BUTTON_FONT = Fonts.SF_MEDIUM

export default (props) => {
    const {
        label,
        onPress,
        customColor,
        outline,
        style,
        isLoading,
        disabled
    } = props;

    const buttonStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flex: 1,
        borderRadius: 6
    }
    const buttonShadowStyle = {
        backgroundColor: customColor ? customColor : outline ? WHITE_COLOR : PRIMARY_BUTTON_COLOR,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
    }
    const buttonDisabledShadowStyle = {
        backgroundColor: DISABLED_BUTTON_COLOR,
    }
    const buttonText = {
        color: (outline || customColor == WHITE_COLOR) && !disabled ? PRIMARY_BUTTON_COLOR : WHITE_COLOR,
        fontFamily: BUTTON_FONT,
        fontWeight: 'bold',
        letterSpacing: 0.5
    }

    if (Platform.OS == 'android') {
        return (
            <TouchableNativeFeedback
                {...props}
                disabled={isLoading || disabled}
                onPress={onPress}
                background={Platform.Version >= 21 ?
                    TouchableNativeFeedback.Ripple(RIPPLE_COLOR) :
                    TouchableNativeFeedback.SelectableBackground()}>
                <View style={[
                    buttonStyle,
                    outline && { borderWidth: 1, borderColor: PRIMARY_BUTTON_COLOR },
                    disabled || isLoading ? buttonDisabledShadowStyle : buttonShadowStyle,
                    style
                ]}>
                    {isLoading ?
                        <ActivityIndicator color={customColor == WHITE_COLOR ? PRIMARY_BUTTON_COLOR : WHITE_COLOR} size='small' />
                        : <Text style={buttonText}>{String(label).toUpperCase()}</Text>}
                </View>
            </TouchableNativeFeedback>
        )
    }

    return (
        <TouchableOpacity
            {...props}
            style={[
                buttonStyle,
                disabled || isLoading ? buttonDisabledShadowStyle : buttonShadowStyle,
                style
            ]} disabled={isLoading || disabled} onPress={onPress}>
            {isLoading ?
                <ActivityIndicator color={customColor == WHITE_COLOR ? PRIMARY_BUTTON_COLOR : WHITE_COLOR} size='small' />
                : <Text style={buttonText}>{String(label).toUpperCase()}</Text>}
        </TouchableOpacity>
    )
}
import { Dimensions } from "react-native"

export const Version = '1.0'

export const DefaultErrorMessage = 'Terjadi Kesalahan, mohon coba kembali nanti'

export const Icons = Object.freeze({
    iconCalendar: require("../assets/images/icons/calendar.png"),
    iconCalendar2: require("../assets/images/icons/calendar_1.png"),
    iconDaily: require("../assets/images/icons/24-hour-daily-service.png"),
    iconReport: require("../assets/images/icons/report.png"),
    iconMoney: require("../assets/images/icons/money.png"),
})

export const Illustrations = Object.freeze({
    illustMoneyManagement : require("../assets/images/illustrations/trophy.png"),
    illustEmpty : require("../assets/images/illustrations/marketing.png"),
    illustWelcome : require("../assets/images/illustrations/business-strategy.png"),
})

export const Metrics = Object.freeze({
    SAFE_AREA: 30,
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height,
    NAVBAR_HEIGHT: 56
})

export const Colors = Object.freeze({
    WHITE: '#FFFFFF',
    GOLD: '#D2A71D',
    DARK: '#272727',
    DARK_LIGHT: '#707070',
    RED: '#EE2020',
    RED_LIGHT: '#F88989',
    GRAY_LIGHT: '#F8F8F8',
    GRAY: '#B7B7B7',
    GRAY_DARK: '#ABABAB',
    BLUE_LIGHT: '#1A7DDC',
    BLUE: '#2f3e69',
    BLUE_DARK: '#253152',
    GREEN_LIGHT: '#3EC870',
    GREEN: '#59b05c',
    GREEN_DARK: '#00535C',
    BLACK: '#000000',
})

export const PropertyColors = Object.freeze({
    LOADING: Colors.DARK,
    ERROR_COLOR : '#EF6950',
    WARNING_COLOR : '#FBC100',
    SUCCESS_COLOR : '#40C5AF'
})

export const Fonts = Object.freeze({
    SF_REGULAR: 'SFCompactText-Regular',
    SF_BOLD: 'SFCompactText-Bold',
    SF_MEDIUM: 'SFCompactText-Medium',
})

export const StorageKeys = {
    TRANSACTION_LIST: 'transaction_list',
    AHP_ALTERNATIVE: 'ahp_alternative',
}
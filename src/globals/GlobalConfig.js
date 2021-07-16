import { Dimensions } from "react-native"

export const Version = '1.0'

export const DefaultErrorMessage = 'Terjadi Kesalahan, mohon coba kembali nanti'

export const Icons = Object.freeze({
    iconGoodIssue: require("../assets/images/iconFooterTab/box_out_icon.png"),
    iconGoodReceipt: require("../assets/images/iconFooterTab/box_in_icon.png"),
    iconTabStockOpname: require("../assets/images/iconFooterTab/stock_opname_tab.png"),
    iconTabHistory: require("../assets/images/iconFooterTab/history_tab.png"),
    iconTabReport: require("../assets/images/iconFooterTab/report_icon.png"),

    iconChevronRight: require("../assets/images/icons/chevron-grey-right.png"),
    iconTanggalBlue: require("../assets/images/icons/tanggal_blue.png"),
    iconTanggalBlack: require("../assets/images/icons/tanggal_black.png"),
    iconWaktuBlue: require("../assets/images/icons/waktu_blue.png"),
    iconWaktuBlack: require("../assets/images/icons/waktu_black.png"),

    iconUpload: require("../assets/images/icons/upload_data.png"),
    iconChecklist: require("../assets/images/icons/checklist.png"),
    iconCamera: require("../assets/images/icons/camera.png"),
    iconLock: require("../assets/images/icons/lock.png"),
    iconPerson: require("../assets/images/icons/person.png"),
    iconEdit: require("../assets/images/icons/edit.png"),
    iconAuthor: require("../assets/images/icons/author.png"),
})

export const Illustrations = Object.freeze({
})

export const Metrics = Object.freeze({
    SAFE_AREA: 30,
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height,
    NAVBAR_HEIGHT: 56
})

export const Colors = Object.freeze({
    WHITE: '#FFFFFF',
    CYAN: '#279a98',
    GOLD: '#D2A71D',
    DARK: '#272727',
    DARK_LIGHT: '#707070',
    RED: '#EE2020',
    RED_LIGHT: '#F88989',
    PURPLE: '#A95EFD',
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
    BROWN: '#bd6208'
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
    CUSTOMER_TOKEN : 'customer_token',
    USER_DATA: 'user_data',
    PO_NUMBER: 'po_number',
    GR_DATA_SUBMIT: 'gr_data_submit',
    PO_NUMBER_GI: 'po_number_gi',
    GI_DATA_SUBMIT: 'gi_data_submit',
    TP_DATA_SUBMIT: 'tp_data_submit',
    PID_DATA_SUBMIT: 'pid_data_submit',
    PID_SUBMITTED:'pid_submitted'
}
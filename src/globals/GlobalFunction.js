import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { StorageKeys } from './GlobalConfig';

/**
 * Run the function after x ms
 * @param {milisec} ms 
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Check whether the given result is empty
 * @param {Array} result 
 */
export const isEmptyResult = (result) => {
    return Array.isArray(result) && result.length == 0
}

export const getMinimumDate = (daysBefore = 1) => {
    return getDate(-(daysBefore), false)
}

export const getMaximumDate = (daysAfter = 0) => {
    return getDate(daysAfter, false)
}

export const isArray = (obj) => !!obj && obj.constructor === Array

/**
 * Get date in DD/MM/YYYY format
 * Default to Current Date
 * Pass Params to re-adjust date difference
 */
export const getDate = (days = 0, formatted = true, reversed = false) => {
    // const offset = new Date().getTimezoneOffset()
    let date = moment()
    // if (offset < 0) date = date.add(Math.abs(offset), 'minutes')
    // else date = date.subtract(Math.abs(offset), 'minutes')

    if (days < 0) date = date.subtract(Math.abs(days), 'days')
    else date = date.add(days, 'days')

    return formatted ? date.format(reversed ? 'YYYY-MM-DD' : 'DD/MM/YYYY') : date.toDate()
}

export const getTime = () => {
    return moment().format('HH:mm')
}

/**
 * Get current datetime default in database format
 */
export const getCurrentDateTime = (formatted = true) => {
    let date = moment.utc().local()

    return formatted ? date.format('YYYY-MM-DD HH:mm:ss') : date.toDate()
}

/**
 * Check if String is null
 */
export const isNullString = (value) => value == null || value == "null" ? '' : value

/**
 * Check if Int is null
 */
export const isNullInteger = (value) => value == null ? 0 : value

/**
 * Separate given params to thousands
 * @param {Int} value 
 */
export const setThousands = (value) => {
    if (value) return parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    else return '0'
}

// GET DOC HARI KE 
export const getDocHariKe = (value) => {
    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear().toString();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    var targetDoc = value.split('-');

    var date1 = new Date(targetDoc[0], targetDoc[1] - 1, targetDoc[2]);
    var date2 = new Date(yyyy, mm - 1, dd);

    console.warn("date1 = " + date1)
    console.warn("date2 = " + date2)

    if (date1 > date2) {
        var x = 0
    }
    else {
        var x = 1
    }

    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(diffDays)
    return diffDays + x
}

// GET DOC HARI KE DOUBLE PARAMETER
export const getDocHariKeDoubleParam = (valueTanggalCatat, valueTargetDoc) => {
    var tanggalCatat = valueTanggalCatat.split('-');
    var targetDoc = valueTargetDoc.split('-');

    var date1 = new Date(tanggalCatat[0], tanggalCatat[1] - 1, tanggalCatat[2]);
    var date2 = new Date(targetDoc[0], targetDoc[1] - 1, targetDoc[2]);

    console.warn("tanggal catat = " + date1)
    console.warn("startfarm_date = " + date2)

    if (date1 < date2) {
        var x = 0
    }
    else {
        var x = 1
    }

    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(diffDays)
    return diffDays + x
}

/**
 * Put this function inside the String sort
 * a and b is default params
 * fieldName is the name of field to be compared
 */
export const sortChar = fieldName => (a, b) => {
    const itemA = a[fieldName].toUpperCase();
    const itemB = b[fieldName].toUpperCase();

    let comparison = 0;
    if (itemA > itemB) comparison = 1
    else if (itemA < itemB) comparison = -1

    return comparison;
}

/**
 * Validate the user input
 * @param {function} inputFunction The useState set function
 * @param {string} validation validation type alphanumeric|alphabet|number
 */
export const inputValidation = (inputFunction, validation = '') => (value) => {
    switch (validation) {
        case 'alphanumeric':
            value = value.replace(/[^a-zA-Z 0-9]/g, "")
            inputFunction(value)
            break;
        case 'alphabet':
            value = value.replace(/[^a-zA-Z]/g, "")
            inputFunction(value)
            break;
        case 'number':
        default:
            value = value.trim()
            value = value.replace(/[^0-9$.]/g, '')
            inputFunction(value)
            break;
    }
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function getUserData() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.USER_DATA, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else reject(err)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getGRDataSubmit() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.GR_DATA_SUBMIT, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getPoNumber() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.PO_NUMBER, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else reject(err)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getGIDataSubmit() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.GI_DATA_SUBMIT, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getPoNumberGI() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.PO_NUMBER_GI, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else reject(err)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getTPDataSubmit() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.TP_DATA_SUBMIT, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getPIDDataSubmit() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.PID_DATA_SUBMIT, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getSubmittedPID() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.PID_SUBMITTED, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

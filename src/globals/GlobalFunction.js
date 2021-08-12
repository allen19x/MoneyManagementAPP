import AsyncStorage from '@react-native-community/async-storage';
import { StorageKeys } from './GlobalConfig';

/**
 * Run the function after x ms
 * @param {milisec} ms 
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))


export const isArray = (obj) => !!obj && obj.constructor === Array

/**
 * Separate given params to thousands
 * @param {Int} value 
 */
export const setThousands = (value) => {
    if (value) return parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    else return '0'
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

export function getTransactionList() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.TRANSACTION_LIST, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export function getAHPAlternative() {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem(StorageKeys.AHP_ALTERNATIVE, (err, res) => {
                if (res) resolve(JSON.parse(res))
                else resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const currencyFormat = (value) => {
    if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    else return '0'
}

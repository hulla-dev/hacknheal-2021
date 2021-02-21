
import { DataProperty } from '../lib/types'

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi
export const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g

export const isValidEmail = (input: string): boolean => !!input.match(emailRegex)
export const isValidPhone = (input: string): boolean => !!input.match(phoneRegex)

export const validate = (name: DataProperty, value: string | boolean): {value: string | boolean, error: string} => {
  switch (name) {
    case 'firstName':
    case 'lastName':
      return {
        value,
        error: (typeof value === 'string' && value.length) < 3 
          ? 'Must be at least 3 characters long'
          : ''
        }
     case 'email':
       return {
          value,
          error: (typeof value === 'string' && !isValidEmail(value))
            ? 'Please use a valid e-mail format'
            : ''
       }
    case 'phone': {
      return {
        value,
        error: (typeof value === 'string' && !isValidPhone(value))
          ? 'Please use a valid phone format'
          : ''
      }
    }
    case 'termsOfUse': {
      return {
        value,
        error: !value
          ? 'It is mandatory to read and agree to Terms of Use'
          : ''
      }
    }
    case 'privacyPolicy': {
      return {
        value,
        error: !value
          ? 'It is mandatory to read and agree to Privacy Policy'
          : ''
      }
    }
    default:
      throw Error(`Incorrect form name ${name} ${value}`)
  }
}
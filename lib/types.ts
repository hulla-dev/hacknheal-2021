import { ChangeEvent, FocusEvent } from 'react'

export type Input = {
  value: string | boolean,
  error: string,
  blurred: boolean,
}

export type RadioValue = {
  // -1 = undefined, rest is graded
  value: -1 | 0 | 1 | 2 | 3 | 4,
  question: string,
}

export type DataType = {
  contact: {
    firstName: Input,
    lastName: Input,
    email: Input,
    phone: Input,
    termsOfUse: Input,
    privacyPolicy: Input,
  },
}

export type RadioType = {
  health: {
    illnesses: RadioValue,
    cancer: RadioValue,
    flu: RadioValue,
    heart: RadioValue,
    headache: RadioValue,
    digestion: RadioValue,
  },
  psychology: {
    depression: RadioValue,
    anxiety: RadioValue,
    psychologyst: RadioValue,
    amnesia: RadioValue,
    sleepIssues: RadioValue,
    irritable: RadioValue,
  },
  lifeStyle: {
    sedantry: RadioValue,
    food: RadioValue,
    drinks: RadioValue,
    burnout: RadioValue,
    sadness: RadioValue,
    stress: RadioValue,
  }
}

export type DataProperty = keyof DataType[keyof DataType]
export type RadioProperty = keyof RadioType[keyof RadioType]

export type FormType = DataType & RadioType

export type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type ToggleEvent = ChangeEvent<HTMLInputElement>
export type BlurToggleEvent = FocusEvent<HTMLButtonElement>
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import { Box, Button, Grid, Step, StepLabel, Stepper, Tooltip } from '@material-ui/core'
import { Fade } from  'react-awesome-reveal'
import { isSame } from '../../lib/math'
import { validate } from '../../lib/validation'
import Section from '../../components/Section'
import Layout from '../../components/Layout'
import ToolFields from '../../components/tool/ToolFields'
import ToolRadio from '../../components/tool/ToolRadio'
import ToolResults from '../../components/tool/ToolResults'

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

const steps = ['Contact Information', 'Health', 'Psychology', 'Lifestyle', 'Results']


const DiagnosticTool = (): JSX.Element => {

  const [step, setStep] = useState(0)
  const [isFormValid, setIsFormValid] = useState(false)
  const [attemptedNext, setAttemptedNext] = useState(false)

  const getEmptyField = (name: DataProperty): Input => ({ ...validate(name, ''), blurred: false })
  const getEmptyToggle = (name: DataProperty): Input => ({ ...validate(name, false), blurred: false})
  const [data, setData] = useState<FormType>({
    contact: {
      firstName: getEmptyField('firstName'),
      lastName: getEmptyField('lastName'),
      email: getEmptyField('email'),
      phone: getEmptyField('phone'),
      termsOfUse: getEmptyToggle('termsOfUse'),
      privacyPolicy: getEmptyToggle('privacyPolicy'),
    },
    health: {
      illnesses: { value: -1, question: 'Do you have history of illnesses in your family?' },
      cancer: { value: -1, question: 'Do you have history of cancer in your family?' },
      flu: { value: -1, question: 'Do you have history of flu in your family?' },
      heart: { value: -1, question: 'Do you have history of heart related issues in your family?' },
      headache: { value: -1, question: 'Do you have history of headache in your family?' },
      digestion: { value: -1, question: 'Do you have history of digestion issues in your family?' },
    },
    psychology: {
      depression: { value: -1, question: 'Have you experienced depression lately?' },
      anxiety: { value: -1, question: 'Have you experienced anxiety lately?' },
      psychologyst: { value: -1, question: 'Have you visited a psychologyst in last 3 years?'},
      amnesia: { value: -1, question: 'Have you experienced amnesia lately'},
      sleepIssues: { value: -1, question: 'Have you experienced sleep issues lately?'},
      irritable: { value: -1, question: 'Have you been irritable lately'},
    },
    lifeStyle: {
      sedantry: { value: -1, question: 'Do you lead a sedantry lifestyle?' },
      food: { value: -1, question: 'Do you consume a lot of fast food?'},
      drinks: { value: -1, question: 'Do you drink a lot of sweetened drinks?' },
      burnout: { value: -1, question: 'Are you in risk of a burnout?' },
      sadness: { value: -1, question: 'Have you experienced sadness lately?'},
      stress: { value: -1, question: 'Does your lifestyle contain a lot of stress?'},
    }
  })

  const wasBlurred = Object.values(data).some(field =>
      Object.values(field).some(input => input.blurred)
  )

  const containsErrors = Object.values(data).some(field =>
    Object.values(field).some(input => !!input.error)
  )

  /**
   * Checks whether at least 1 field contains errors
   */
  const updateFormValid = () => {
    setIsFormValid(wasBlurred && !containsErrors)
  }

  // Check form validity every time we update data
  useEffect(updateFormValid, [data, containsErrors, wasBlurred])


  const isToggleEvent = (event: InputEvent | ToggleEvent): event is ToggleEvent =>
    Object.prototype.hasOwnProperty.call(event.target, 'checked')

  const isBlurToggleEvent = (event: InputEvent | BlurToggleEvent): event is BlurToggleEvent =>
    Object.prototype.hasOwnProperty.call(event.target, 'checked')

  const onBlur = (event: InputEvent | BlurToggleEvent, type: keyof DataType, name: DataProperty) => {
    const value = isBlurToggleEvent(event)
      ? data[type][name].value
      : event.target.value

    const validatedField = validate((name as DataProperty), value)

    setData(prevData => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: {
          ...prevData[type][name],
          ...validatedField,
          blurred: true,
        }
      }
    }))
  }

  const onChange = (event: InputEvent | ToggleEvent, type: keyof DataType) => {
    const name = event.target.name as DataProperty
    const value = isToggleEvent(event)
      ? event.target.checked
      : event.target.value

    const validatedField = validate(name, value)
    setData(prevData => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: {
          ...prevData[type][name],
          ...validatedField,
          blurred: true,
        },
      }
    }))
  }


  const onRadioChange = (event: InputEvent, type: keyof RadioType) => {
    const { name, value } = event.target
    setData(prevData => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: {
          ...prevData[type][name],
          value,
        }
      }
    }))
  }

  const validateAllFields = () => {
    Object.entries(data).forEach(([type, fields]) => {
      if (type === 'contact') {
        Object.entries(fields).forEach(([name, input]) => {
          const validatedData = validate((name as DataProperty), input.value)
          setData(prevData => ({
            ...prevData,
            [type]: {
              ...prevData[type],
              [name]: {
                ...prevData[type][name],
                ...validatedData,
                blurred: true,
              }
            }
          }))
        })
      }
    })
  }

  const onNextStep = () => setStep(prevStep => prevStep + 1)
  const onPrevStep = () => setStep(prevStep => prevStep - 1)
  // const resetForm = () => {
  //   // cler form here
  //   setStep(0)
  // }

  const attemptGoNext = () => {
    validateAllFields()
    setAttemptedNext(true)
    if (isFormValid) {
      onNextStep()
    }
  }

  const isRadioType = (input: Input | RadioValue): input is RadioValue =>
    Object.prototype.hasOwnProperty.call(input, 'question')

  const answered = Object.values(data).reduce(
    (result, field) => result + Object.values(field).reduce(
      (sum, input) => isRadioType(input)
        ? isSame(input.value, -1)
          ? sum 
          : sum + 1
        : sum
      , 0
    )
    , 0
  )

  const available = Object.values(data).reduce(
    (result, field) => result + Object.values(field).reduce(
      (sum, input) => isRadioType(input)
        ? sum + 1
        : sum
      , 0
    )
    , 0
  )

  const renderStep = (current: number): string | JSX.Element => {
    switch (current) {
      case 0:
        return <ToolFields onBlur={onBlur} onChange={onChange} data={data} />
      case 1:
        return <ToolRadio
            type="health"
            answered={answered}
            available={available}
            data={data}
            onChange={onRadioChange}
          />
      case 2:
        return <ToolRadio
            type="psychology"
            answered={answered}
            available={available}
            data={data}
            onChange={onRadioChange}
          />
      case 3:
        return <ToolRadio
            type="lifeStyle"
            answered={answered}
            available={available}
            data={data}
            onChange={onRadioChange}
          />
      case 4:
        return <ToolResults answered={answered} available={available} data={data} />
      default:
        return 'Unknown step'
    }
  }

  return (
    <Layout>
      <Fade cascade>
        <Section>
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <Stepper activeStep={step} alternativeLabel>
                {steps.map(step => (
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item xs={12} container alignItems="center" justify="center">
              {renderStep(step)}
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <Box mx={3}>
                {step > 0 && (
                  <Button variant="contained" color="primary" onClick={onPrevStep}>
                    Previous
                  </Button>
                )}
                </Box>
                <Box mx={3}>
                {step < steps.length - 1 && (
                  (attemptedNext && !isFormValid)
                    ? (
                      <Tooltip title="Please correct the errors first" placement="top">
                        {/* MUI ToolTip needs div wrap otherwise is buggy */}
                        <div>
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={!isFormValid}
                            onClick={attemptGoNext}>
                            Next
                          </Button>
                        </div>
                      </Tooltip>
                      ) : (
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={attemptGoNext}>
                        Next
                      </Button>
                    )
                )}
                {step >= steps.length - 1 && (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={!isFormValid}
                    onClick={attemptGoNext}>
                    Save results
                  </Button>
                )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Section>
      </Fade>
    </Layout>
  )
}

export default DiagnosticTool
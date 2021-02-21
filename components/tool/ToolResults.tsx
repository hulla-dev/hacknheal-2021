import { Box, Grid, TextField } from '@material-ui/core'
import { FormType , RadioValue } from  '../../lib/types'
import AccuracyMeter from '../AccuracyMeter'

type Props = {
  data: FormType,
  answered: number,
  available: number,
  accuracyColor: 'error' | 'warning' | 'success'
}

type LockedFieldProps = {
  value: string,
  label: string,
  key: unknown
}

const LockedField = ({ value, label, key }: LockedFieldProps) => (
  // eslint-disable-next-line
  // @ts-ignore
  <Grid item xs={6} key={key}>
    {/* MUI Gride does not support key attribute... sigh */}
     <TextField label={label} value={value} disabled fullWidth variant="outlined" />
  </Grid>
)


const defaultGrade = ['None', 'Little', 'Some', 'Bunch', 'Myriad']
const defaultLabel = ["First name", "Last name", "E-mail", "Phone"]

const isRadioQuestion = (_input: unknown, type: string): _input is RadioValue =>
  type !== 'contact'

const ToolResults = (props: Props): JSX.Element=> {
  const { data , answered, available, accuracyColor } = props

  return (
    <Grid item container xs={12} spacing={6}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <AccuracyMeter
            available={available}
            answered={answered}
            title="How accurate will my result be?"
            text="It depends on how much data you're willing to provide. We value your privacy, but 
            the more information you'll be able to provide, the more accurate will be our diagnosis"
          />
        </Box>
      </Grid>
      {Object.entries(data).map(([type, field]) => Object.entries(field)
        .filter(([key]) => key !== 'termsOfUse' && key !== 'privacyPolicy')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_key, input], index) => isRadioQuestion(input, type)
          ? <LockedField key={index} value={defaultGrade[input.value] || ' '} label={input.question} />
          : <LockedField key={index} value={input.value} label={defaultLabel[index]} />
        )
      )}
    </Grid>
  )
}

export default ToolResults
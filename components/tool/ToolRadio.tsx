import { Box, Grid } from '@material-ui/core'
import { FormType , InputEvent, RadioProperty, RadioType } from  '../../lib/types'
import RadioQuestion, { RadioItem } from '../RadioQuestion'
import AccuracyMeter from '../AccuracyMeter'

type Props = {
  data: FormType,
  onChange: (event: InputEvent, type: keyof RadioType) => void,
  answered: number,
  available: number,
  type: keyof RadioType,
  accuracyColor: 'error' | 'warning' | 'success'
}


const defaultGrade = ['None', 'Little', 'Some', 'Bunch', 'Myriad']
const defaultOptions: RadioItem[] = defaultGrade.map((grade, index) => ({
  value: index,
  label: grade,
}))


const ToolRadio = (props: Props): JSX.Element=> {
  const { data , onChange, answered, type, available, accuracyColor } = props
  const { [type]: category } = data

  return (
    <Grid item container xs={12} spacing={6}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <AccuracyMeter
            accuracyColor={accuracyColor}
            available={available}
            answered={answered}
            title="How accurate will my result be?"
            text="It depends on how much data you're willing to provide. We value your privacy, but 
            the more information you'll be able to provide, the more accurate will be our diagnosis"
          />
        </Box>
      </Grid>
      {Object.entries(category).map(([name, field]) => (
        <RadioQuestion
          value={field.value} 
          items={defaultOptions}
          question={field.question}
          type={type}
          name={name as RadioProperty}
          key={field.question}
          onChange={onChange}
        />
      ))}
    </Grid>
  )
}

export default ToolRadio

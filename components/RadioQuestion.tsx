import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core'
import { InputEvent, RadioProperty, RadioType } from '../pages/tool' 

export type RadioItem = {
  value: number,
  label: string,
}

type Props = {
  items: Array<RadioItem>,
  question: string,
  value: -1 | 0 | 1 | 2 | 3 | 4,
  type: keyof RadioType,
  name: RadioProperty,
  onChange: (event: InputEvent, type: keyof RadioType) => void,
  key?: unknown,
}

const RadioQuestion = (props: Props): JSX.Element => {
  const { items, type, question, name, value, onChange } = props
  return (
    <Grid item xs={6}>
        <FormControl component="fieldset">
          <FormLabel><Typography variant="h6">{question}</Typography></FormLabel>
        </FormControl>
          {/* Need to use Math.floor because 3 !== 3 in JS *sigh* */}
          <RadioGroup value={Math.floor(value)} name={name} onChange={event => onChange(event, type)}>
            <Grid container xs={12} spacing={1}>
              {items.map(({ value: itemValue, label}) => (
                <Grid item xs key={label}>
                  {/* Need to use Math.floor because 3 !== 3 in JS *sigh* */}
                  <FormControlLabel
                    key={label}
                    control={<Radio color="primary"/>}
                    label={label}
                    value={Math.floor(itemValue)} />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
    </Grid>
  )
}

export default RadioQuestion

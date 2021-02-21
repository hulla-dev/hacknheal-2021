import { Box, Checkbox, FormControl, FormHelperText, FormLabel, Grid, TextField } from '@material-ui/core'
import { BlurToggleEvent, DataProperty, DataType, InputEvent, ToggleEvent } from  '../../pages/tool/index'
import { useTheme } from '@material-ui/core/styles'
import Link from '../Link'

type Props = {
  onChange: (event: InputEvent | ToggleEvent, type: keyof DataType) => void,
  onBlur: (event: InputEvent | BlurToggleEvent, type: keyof DataType, name: DataProperty) => void,
  data: DataType,
}

const ToolFields = (props: Props): JSX.Element => {
  
  const theme = useTheme()
  const { onChange, onBlur, data } = props
  const { contact } = data
  const { firstName, lastName, phone, email, termsOfUse, privacyPolicy } = contact
  
  return (
    <Grid item xs={12} container spacing={5}>
      <Grid item xs={6}>
        <TextField
          name="firstName"
          value={firstName.value}
          onChange={event => onChange(event, 'contact')}
          onBlur={event => onBlur(event, 'contact', 'firstName')}
          fullWidth
          placeholder="First name"
          required
          variant="outlined"
          error={firstName.blurred && !!firstName.error}
          helperText={firstName.blurred ? firstName.error : ''}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="lastName"
          value={lastName.value}
          onChange={event => onChange(event, 'contact')}
          onBlur={event => onBlur(event, 'contact', 'lastName')}
          fullWidth
          placeholder="Last name"
          required
          variant="outlined"
          error={lastName.blurred && !!lastName.error}
          helperText={lastName.blurred ? lastName.error : ''}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="email"
          value={email.value}
          onChange={event => onChange(event, 'contact')}
          onBlur={event => onBlur(event, 'contact', 'email')}
          fullWidth
          placeholder="Email"
          required
          variant="outlined"
          error={email.blurred && !!email.error}
          helperText={email.blurred ? email.error : ''}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="phone"
          value={phone.value}
          onChange={event => onChange(event, 'contact')}
          onBlur={event => onBlur(event, 'contact', 'phone')}
          fullWidth
          placeholder="Phone"
          required
          variant="outlined"
          error={phone.blurred && !!phone.error}
          helperText={phone.blurred ? phone.error : ''}
        />
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <FormControl required error={privacyPolicy.blurred && !!privacyPolicy.error}>
            <Box display="flex" alignItems="center" width={350} justifyContent="space-between">
              <FormLabel>
                I have read and agree to &nbsp;
                <Link href="/landing" text="Privacy Policy" color={theme.palette.primary.main} />
              </FormLabel>
              <Checkbox
                checked={!!privacyPolicy.value}
                name="privacyPolicy"
                onChange={event => onChange(event, 'contact')}
                onBlur={event => onBlur(event, 'contact', 'privacyPolicy')}
                color="primary"
              />
            </Box>
            {privacyPolicy.blurred && (
              <FormHelperText>{privacyPolicy.error}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl required error={termsOfUse.blurred && !!termsOfUse.error}>
            <Box display="flex" alignItems="center" width={350} justifyContent="space-between">
              <FormLabel>
                I have read and agree to &nbsp;
                <Link href="/landing" text="Terms of Use" color={theme.palette.primary.main} />
              </FormLabel>
              <Checkbox
                checked={!!termsOfUse.value}
                name="termsOfUse"
                onChange={event => onChange(event, 'contact')}
                onBlur={event => onBlur(event, 'contact', 'termsOfUse')}
                color="primary"
              />
            </Box>
            {termsOfUse.blurred && (
              <FormHelperText>{termsOfUse.error}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ToolFields

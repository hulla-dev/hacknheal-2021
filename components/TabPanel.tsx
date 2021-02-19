import { ReactChild } from 'react'
import { Box } from '@material-ui/core'

type Props = {
  children: ReactChild,
  value: number
  index: number,
  key?: string | number,
}

const TabPanel = (props: Props): JSX.Element => {
  const { children, value, index } = props
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default TabPanel
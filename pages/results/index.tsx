
import { FormType } from '../../lib/types'

type Props = {
  api: FormType | null,
}


const Results = (props: Props): JSX.Element => { 
  return (
    <div>
      {props}
    </div>
  )
}

export default Results

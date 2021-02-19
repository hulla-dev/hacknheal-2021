import Layout from '../components/Layout'
import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const Home = (): JSX.Element => (
  <Layout>
    <section>
      Home
      <Button variant="contained" color="primary">
        Test
      </Button>
      <Alert severity="warning">
        Test
      </Alert>
    </section>
  </Layout>
)

export default Home

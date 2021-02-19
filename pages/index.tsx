import Layout from '../components/Layout'
import { Button } from '@material-ui/core'

const Home = (): JSX.Element => (
  <Layout>
    <section>
      Home
      <Button variant="contained" color="primary">
        Test
      </Button>
    </section>
  </Layout>
)

export default Home


import { Button, Grid, List, ListItem, Typography } from '@material-ui/core'
import { AttentionSeeker } from 'react-awesome-reveal'
import { BubbleChart, FavoriteBorder, FitnessCenter } from '@material-ui/icons'
import { FormType, RadioField, RadioType } from '../../lib/types'
import { isSame } from '../../lib/math'
import Layout from '../../components/Layout'
import Section from '../../components/Section'
import Score from '../../components/Score'
import Link from '../../components/Link'
import React from 'react'

type Props = {
  api: FormType | null,
}


const Results = ({ api }: Props): JSX.Element => {


  if (api === null) {
    return (
      <Layout>
        <Section>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Typography variant="h2">
              It appears you do not have any results yet
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Either you have not filled in the questionaire properly
                or just manually transferred to this page
                without using the tool
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                <Link href="/tool" text="Go to diagnostics tool" />
              </Button>
            </Grid>
          </Grid>
        </Section>
    </Layout>
    )
  }

  const labels = ['Health', 'Psychology', 'Lifestyle']
  const icons = [ <FavoriteBorder key={0} />, <BubbleChart key={1} />, <FitnessCenter key={2} />]

  const { health, lifeStyle, psychology } = api
  const radio: RadioType = {
    health,
    lifeStyle,
    psychology
  }

  const getScore = <K extends keyof RadioType>(field: RadioField<K>) => {
    const voted = Object.values(field).reduce(
      (result, { value }) => isSame(value, -1)
        ? result + 0
        : result + value + 1
      , 0
    )
    const fieldAmount = Object.values(field).length
    const maxAchievable = fieldAmount * 4
    return ((maxAchievable - voted) / maxAchievable) * 100
  }

  const getVotedCount = <K extends keyof RadioType>(field: RadioField<K>) => Object.values(field).reduce(
    (result, { value }) => isSame(value, -1)
      ? result
      : result + 1
    , 0
  )

  const getTitle = (votedCount: number, index: number) => votedCount <= 2
    ? `${labels[index]} (Inconclusive)`
    : `${labels[index]}`

  // allowing ts-ignore here, it's correctly typed but Object.entries transcodes key to string instead of maintaing
  // keyed object type
  /* eslint-disable @typescript-eslint/ban-ts-comment */


  return (
    <Layout>
      <Section>
        <AttentionSeeker effect="tada">
          <List>
          {Object.entries(radio).map(([type, field], index) => (
            // Ts doesnt like me manually mapping to radio object, but no time to fix
            <ListItem key={index}>
              <Score
                // @ts-ignore
                score={getScore<typeof type>(field)}
                // @ts-ignore
                category={getTitle<typeof type>(getVotedCount(field), index)}
                icon={icons[index]}
              />
            </ListItem>
          ))}
          </List>
        </AttentionSeeker>
      </Section>
    </Layout>
  )
}

export default Results

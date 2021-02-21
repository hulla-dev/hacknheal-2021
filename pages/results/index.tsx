
import Image from 'next/image'
import { Button, Grid, List, ListItem, Typography } from '@material-ui/core'
import { AttentionSeeker, Slide } from 'react-awesome-reveal'
import { AddShoppingCart, BubbleChart, FavoriteBorder, FitnessCenter } from '@material-ui/icons'
import Parallax from '../../components/animations/Parallax'
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
        : result + (+value) + 1
      , 0
    )
    const fieldAmount = Object.values(field).length
    const maxAchievable = fieldAmount * 4
    const result = ((maxAchievable - voted) / maxAchievable) * 100
    return getVotedCount(field) <= 2
      ? 0
      : result
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
      <Grid container spacing={8}>
        <Grid item xs={12}>
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
                    // @ts-ignore
                    inconclusive={getVotedCount<typeof type>(field) <= 2}
                  />
                </ListItem>
              ))}
              </List>
            </AttentionSeeker>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Slide delay={1000}>
            <Section>
              <Grid container spacing={4}>
                <Grid item container xs={8} spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="h2">Perhaps this could help you?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Based on our Diagnostic Tool Results,
                      it appears you would <b>greatly benefit from our product GlobiFer!</b> &nbsp;
                      Why not give it a try?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="large" startIcon={<AddShoppingCart />} variant="outlined" color="secondary">
                      Buy now
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Parallax
                    items={[<Image key="glob" src="/images/globifer.png" alt="Globifer" width={300} height={300} />]}
                  />
                </Grid>
              </Grid>
            </Section>
          </Slide>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Results

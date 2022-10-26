import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Card,
  Typography
} from '@mui/material'
import Head from 'next/head'
import { DashboardLayout } from '../components/dashboard-layout';
import LineGraph from '../components/dashboard/line'
import FuelGraph from '../components/dashboard/fuelGraph'

const Charts = ({ wsdata }) => {
  const [protocolDays, setProtocolDays] = useState(wsdata.protocolDays)

  useEffect(() => {
    setProtocolDays(wsdata.protocolDays)
  }, [])
    
  return (
    <>
        <Container maxWidth={false}>
          <Grid
          container
          marginTop={2}
            spacing={3}
          >
            <Grid item
              lg={12}
              sm={12}
              xs={12}>
              <Card
                sx={{
                  height: '100%',
                marginBottom: 2,
                  padding: 4
                }}
            >
              <Typography gutterBottom
              variant="p"
              component="div"
              margin={2}
              marginBottom={0}
            >
              Reserved Fuel
            </Typography>
                <FuelGraph
                  protocolDays={protocolDays}
                />
            </Card>
          </Grid>
          <Grid item
              lg={12}
              sm={12}
              xs={12}>
              <Card
                sx={{
                  height: '100%',
                marginBottom: 2,
                  padding: 4
                }}
            >
              <Typography gutterBottom
              variant="p"
              component="div"
              margin={2}
              marginBottom={0}
            >
              Ticket Interactions
            </Typography>
                <LineGraph
                  protocolDays={protocolDays}
                />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}


Charts.getLayout = (page) => (
  <>
  <Head>
    <title>
      Charts | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Charts

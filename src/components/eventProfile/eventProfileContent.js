import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../integrator/account-profile';
import { AccountProfileDetails } from '../integrator/account-profile-details';
import { useRouter } from 'next/router'
 
function EventProfileContent(props) {
  const router = useRouter();
  console.log(router.query)  
  return (
    <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>        
    </>
  )
}

export default EventProfileContent

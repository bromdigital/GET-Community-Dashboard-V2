import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import {
  Box,
  Link,
  Typography,
  Chip
} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { numberWithCommas } from '../../utils/helpers';
import SoldChip from '../topEvents/soldChip';
import ReSoldChip from '../topEvents/ReSoldChip';
import ScannedChip from '../topEvents/scannedChip';
import CheckedInChip from '../topEvents/checkedInChip';

import { EventHeroImage } from './EventHeroImage';
import { EventDateIcon } from './EventDateIcon';
import moment from 'moment';

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

const EVENT_QUERY = `
  query Event($eventId: String!) {
    event(id: $eventId) {
      blockNumber
      checkedInCount
      claimedCount
      createTx {
        timestamp
      }
      endTime
      id
      imageUrl
      integrator {
        id
        name
      }
      name
      longitude
      latitude
      reservedFuel
      resoldCount
      scannedCount
      shopUrl
      soldCount
    }
  }
`;

const EventDate = ({ date }) => {
  const momentDate = moment(date * 1000);
  const month = momentDate.format('MMM');
  const day = momentDate.format('D');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <EventDateIcon sx={{ fontSize: 40, color: 'primary.main' }} />
      <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', mt: 1 }}>
        {month.toUpperCase()}
      </Typography>
      <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>
        {day}
      </Typography>
    </Box>
  );
};

const EventDetails = ({ eventId }) => {
  const [event, setEvent] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph', {
        query: EVENT_QUERY,
        variables: { eventId },
      });
      setEvent(result.data.data.event);
    };
    fetchData();
  }, [eventId]);

  if (!event) {
    return null;
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <EventHeroImage imageUrl={event.imageUrl} name={event.name} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
      
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Chip
          icon={<LocalGasStationIcon />}
          label={`${numberWithCommas(
            Number(event.reservedFuel).toFixed(2)
          )} available fuel`}
        />
        <SoldChip soldCount={`SOLD: ${numberWithCommas(event.soldCount)}`} />
        <ReSoldChip
          reSoldCount={`RESOLD: ${numberWithCommas(event.resoldCount)}`}
        />
        <ScannedChip
          scannedCount={`SCANNED: ${numberWithCommas(event.scannedCount)}`}
        />
        <CheckedInChip
          checkedInCount={`CHECKED IN: ${numberWithCommas(
            event.checkedInCount
          )}`}
      />
    </Box>
  </Box>
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Link href={`https://sleepy-shore-42215.herokuapp.com/event-profile/${event.id}`} target="_blank" sx={{ textDecoration: 'none' }}>
      <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>
        GO TO V1 EVENT PROFILE
      </Typography>
    </Link>
  </Box>
</Box>
);
};

export default EventDetails;
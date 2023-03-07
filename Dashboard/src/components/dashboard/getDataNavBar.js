import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { numberWithCommas } from '../../utils/helpers';
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from '../../pages/config.json';

const DailyData = () => {
  const [soldCountItem, setSoldCount] = useState(null);
  const [reservedFuel, setReservedFuel] = useState(null);
  const [salesVolume, setSalesVolume] = useState(null);
  const [eventCount, setEventCount] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send('Index Page connected');
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data);
      setSoldCount(numberWithCommas(pageData.protocolDays[0].soldCount));
      setReservedFuel(
        numberWithCommas(
          Number(pageData.protocolDays[0].reservedFuel).toFixed(2)
        )
      );
      setSalesVolume(
        numberWithCommas(
          Number(pageData.protocolDays[0].totalSalesVolume).toFixed(2)
        )
      );
      setEventCount(Number(pageData.protocolDays[0].eventCount));
      setLoading(true);
    };
    client.onerror = function () {
      console.log('Connection Error');
    };
  }, []);

  const displayUsage = () => {
    return (
      <>
        <p
          sx={{
            margin: 2,
          }}
        >
          <b>TODAY:</b> {soldCountItem} tickets sold | {reservedFuel} GET used |{' '}
          {eventCount} events created | ${salesVolume} sales volume{' '}
        </p>
      </>
    );
  };

  return (
    <Container>
      {loading ? (
        displayUsage()
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Container>
  );
};

export default DailyData;

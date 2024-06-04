import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios'
import React,{ useEffect, useState } from 'react';


const OverviewPage = () => {

    const [maaserTotal, setMaaserTotal] = useState();
    const [incomeTotal, setIncomeTotal] = useState();


    useEffect(() => {
        const loadMaaserTotal = async () => {
            const { data } = await axios.get("/api/maaser/gettotal");
            setMaaserTotal(data)
        }
        const loadIncomeTotal = async() => {
            const { data } = await axios.get("/api/income/gettotal");
            setIncomeTotal(data)
        }

        loadMaaserTotal();
        loadIncomeTotal();
    },[])

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
                      Total Income: ${incomeTotal }
          </Typography>
          <Typography variant="h5" gutterBottom>
                      Total Maaser: ${maaserTotal }
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
                      Maaser Obligated: ${(incomeTotal/10).toFixed(2) }
          </Typography>
          <Typography variant="h5" gutterBottom>
                      Remaining Maaser obligation: ${(incomeTotal/10 - maaserTotal).toFixed(2) }
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;

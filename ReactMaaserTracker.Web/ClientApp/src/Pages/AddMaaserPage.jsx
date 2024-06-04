import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddMaaserPage =() => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const navigate = useNavigate();

    const onAddMaaserClick = async () => {
        const maaser = { amount, date: dayjs(selectedDate).format('YYYY-MM-DD'),  recipient }
        await axios.post("/api/maaser/add", maaser);
        navigate("/maaser")
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" value={recipient} onChange={e=>setRecipient(e.target.value) }  />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" value={amount} onChange={e=>setAmount(e.target.value) } />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddMaaserClick }>Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;

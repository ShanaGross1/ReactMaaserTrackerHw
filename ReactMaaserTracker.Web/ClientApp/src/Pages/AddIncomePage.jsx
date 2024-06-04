import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddIncomePage = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedSource, setSelectedSource] = useState({});
    const [amount, setAmount] = useState();
    const [sources, setSources] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadSources = async () => {
            const { data } = await axios.get("/api/sources/getall");
            setSources(data.map(source => { return { ...source, label: source.name } }))
        }

        loadSources();
    }, [])

    const onAddIncomeClick = async () => {
        const income = { amount: amount, dateReceived: dayjs(selectedDate).format('YYYY-MM-DD'), sourceId: selectedSource.id }
        await axios.post("/api/income/add", income);
        navigate("/income")
    }


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.label}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
                onChange={(e, newValues) => setSelectedSource({ ...newValues })}
                value={selectedSource.name}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddIncomeClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;

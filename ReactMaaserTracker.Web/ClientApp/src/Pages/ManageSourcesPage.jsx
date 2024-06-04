import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {

    const [sources, setSources] = useState([]);
    const [open, setOpen] = useState(false);
    const [addEditSource, setAddEditSource] = useState({});
    const [confirmOpen, setConfirmOpen] = useState(false);

    const loadSources = async () => {
        const { data } = await axios.get("/api/sources/getall");
        setSources(data)
    }

    useEffect(() => {
        loadSources();

    }, []);


    const handleOpen = (source = '') => {
        setOpen(true);
        setAddEditSource(source);
    };

    const handleClose = () => {
        setOpen(false);
        setAddEditSource({});
    };

    const handleAddEdit = async () => {
        const action = addEditSource ? "update" : "add";
        await axios.post(`/api/sources/${action}`, { ...addEditSource });

        loadSources();
        handleClose();
    };

    const handleDelete = (source) => {
        setConfirmOpen(true);
        setAddEditSource(source)
    };

    const handleConfirmDelete = async () => {
        setConfirmOpen(false);
        await axios.post("/api/sources/delete", { ...addEditSource });
        loadSources();
    }


    return (
        < Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add Source
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sources.map((source) => (
                            <TableRow key={source.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{addEditSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={addEditSource.name} onChange={e => setAddEditSource({ ...addEditSource, name: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="primary">
                        {addEditSource ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    This source has some income associated with it, are you sure you want to delete it?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </ Container>

    );
}

export default ManageSourcesPage;


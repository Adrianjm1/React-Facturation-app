import { Modal, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import { useItemsRequest } from './useItemsRequest'
import { useStoreZ } from '../../store/zustand/zustand'

export const DeleteConfirm = ({ open, setOpen, itemsToDelete }) => {
    const { deleteItems, getItems } = useItemsRequest()

    const { items } = useStoreZ()

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        deleteItems(itemsToDelete)
        getItems()
        setOpen(false)
        console.log(itemsToDelete)
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2">
                    Confirm Deletion
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Are you sure you want to delete these items?
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

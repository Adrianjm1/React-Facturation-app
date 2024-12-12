import { Modal, Typography, TextField, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useItemsRequest } from './useItemsRequest'
import { toast } from 'react-toastify'
import { setItemsFuction } from '../../store/zustand/zustand'
import Api from '../../api/apiConfig'

export const AddItemModal = ({ open, setOpen, initialData, setItemToModify }) => {

    const { getItems } = useItemsRequest()
    const [formData, setFormData] = useState(() => ({
        category: initialData?.category || '',
        name: initialData?.name || '',
        price: initialData?.price || 0,
        quantity: initialData?.quantity || 0,
        investment: initialData?.investment || 0
    }));

    useEffect(() => {
        setFormData({
            category: initialData?.category || '',
            name: initialData?.name || '',
            price: initialData?.price || 0,
            quantity: initialData?.quantity || 0,
            investment: initialData?.investment || 0
        })
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setItemToModify(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...formData,
                investment: parseFloat(formData.investment.toString()),
                price: parseFloat(formData.price.toString()),
                quantity: parseInt(formData.quantity.toString(), 10)
            };

            console.log('formattedData:', formattedData);

            if (initialData) {
                const response = await Api.put(`/items/${initialData._id}`, formattedData);
                console.log('Item updated:', response.data);
                toast.success('Item updated');
            } else {
                const response = await Api.post('/items', formattedData);
                console.log('Item added:', response.data);
                toast.success('Item added');
            }

            setFormData({
                category: '',
                name: '',
                price: 0,
                quantity: 0,
                investment: 0
            })

            setItemsFuction()
            handleClose();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const fields = [
        { label: 'Category', name: 'category', type: 'text' },
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Price', name: 'price', type: 'number' },
        { label: 'Quantity', name: 'quantity', type: 'number' },
        { label: 'Investment', name: 'investment', type: 'number' }
    ];

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...modalStyle }}>
                    <Typography variant="h6" component="h2">
                        Add New Item
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <TextField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        ))}
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
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

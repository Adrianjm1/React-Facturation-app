import { Box, Button, IconButton, Stack } from '@mui/material'
import { useEffect, useState } from 'react';

import { useItemsRequest } from './useItemsRequest';
import { DataGrid } from '@mui/x-data-grid';
import { AddItemModal } from './AddItemModal';
import { DeleteConfirm } from './DeleteConfirm';
import { setItemsFuction, useStoreZ } from '../../store/zustand/zustand';
export const Inventory = () => {

    const { getItems } = useItemsRequest()
    const { items, setItems } = useStoreZ();
    const [itemToModify, setItemToModify] = useState(null);
    const [rowSelectionModel, setRowSelectionModel] = useState([])

    useEffect(() => {
        setItemsFuction()
    }, [])

    const setToModify = (id) => {
        const item = items.find((item) => item._id === id);
        setItemToModify(item);
        setOpen(true);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            sortable: false,
            width: 160,
        },
        {
            field: 'investment',
            headerName: 'Investment',
            type: 'number',
            width: 160,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={() => setToModify(params.row.id)} >
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => {
                        setRowSelectionModel([params.row.id])
                        setOpenDelete(true)
                    }} >
                        <Delete />
                    </IconButton>
                </Box>
            )
        }
    ];

    const rows = items.map((item) => {
        return {
            id: item._id,
            ...item
        }
    });

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <Box sx={{ height: 400, width: '100%', px: 2 }}>
            <Stack gap={2} direction={'row'}>

                <Button sx={{ my: 2 }} variant="contained" color="secondary" onClick={() => setOpen(true)}>
                    Add Item
                </Button>

                <Button sx={{ my: 2 }} variant="contained" color="error" onClick={() => setOpenDelete(true)}>
                    Delete Items
                </Button>
            </Stack>

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={setRowSelectionModel}
                rowSelectionModel={rowSelectionModel}
            />

            <AddItemModal open={open} setOpen={setOpen} initialData={itemToModify} setItemToModify={setItemToModify} />
            <DeleteConfirm open={openDelete} setOpen={setOpenDelete} itemsToDelete={rowSelectionModel} />
        </Box>
    )
}

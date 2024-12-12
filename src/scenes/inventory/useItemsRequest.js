import { useState } from "react";

import Api from "../../api/apiConfig";
import { setItemsFuction, useStoreZ } from "../../store/zustand/zustand";
import { toast } from "react-toastify";

export const useItemsRequest = () => {
    const { token } = useStoreZ();
    const [items, setItems] = useState([]);
    const getItems = async () => {
        try {
            const response = await Api.get('/items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setItems(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    };

    const deleteItems = async (itemsToDelete) => {
        try {
            const response = await Api.delete('/items', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: itemsToDelete
            });
            setItemsFuction()
            setItems(response.data);
            toast.success('Items deleted successfully');
            return response.data;
        } catch (error) {
            console.error('Error deleting items:', error);
            throw error;
        }
    }

    return {
        getItems,
        items,
        deleteItems
    };
};

import { create } from 'zustand'
import Api from '../../api/apiConfig';

export const useStoreZ = create((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),

    token: '',
    setToken: (token) => set({ token }),

    items: [],
    setItems: (items) => set({ items })
}))

// function to set items from api
export const setItemsFuction = async () => {
    const { setItems } = useStoreZ.getState();
    try {
        const res = await Api.get('/items');
        setItems(res.data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

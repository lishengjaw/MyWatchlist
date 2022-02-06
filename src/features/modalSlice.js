import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showModal: false,
    },
    reducers:{
        openModal: (state) => {
            state.showModal = true;
        },
        closeModal: (state) => {
            state.showModal = false;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;

export const selectShowModal = (state) => state.modal.showModal;

export default modalSlice.reducer;
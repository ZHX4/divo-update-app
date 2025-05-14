import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,  reducers: {
    fetchAppointmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
      addAppointment: (state, action) => {
      state.data.unshift(action.payload);
    },    addMultipleAppointments: (state, action) => {
      state.data = [...action.payload, ...state.data];
    },    updateAppointment: (state, action) => {
      const index = state.data.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },    deleteAppointment: (state, action) => {
      state.data = state.data.filter(app => app.id !== action.payload);
    },
    updateRecurringAppointments: (state, action) => {
      const { groupId, updates } = action.payload;
      state.data = state.data.map(app => 
        app.recurring_group_id === groupId ? { ...app, ...updates } : app
      );
    },
    
    // Cancel all future appointments in a recurring group
    cancelFutureRecurringAppointments: (state, action) => {
      const { groupId, fromSequence } = action.payload;
      state.data = state.data.map(app => 
        (app.recurring_group_id === groupId && app.recurring_sequence >= fromSequence) 
          ? { ...app, status: 'cancelled' } 
          : app
      );
    }
  },
});

// Export the simplified actions
export const {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  addAppointment,
  addMultipleAppointments,
  updateAppointment,
  deleteAppointment,
  updateRecurringAppointments,
  cancelFutureRecurringAppointments
} = appointmentSlice.actions;

// Export the reducer
export default appointmentSlice.reducer;

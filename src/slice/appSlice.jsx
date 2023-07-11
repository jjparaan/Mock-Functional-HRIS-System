import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/employees";

const initialState = {
	employees: [],
	toggleDark: false,
	toggleSidebar: false,
};

const appSlice = createSlice({
	name: "slice",
	initialState,
	reducers: {
		setEmployees: (state, action) => {
			state.employees = action.payload;
		},
		setDark: (state) => {
			state.toggleDark = !state.toggleDark;
		},
		setToggleSidebar: (state) => {
			state.toggleSidebar = !state.toggleSidebar;
		},
	},
});

export const selectToggleDark = (state) => state.slice.toggleDark;
export const selectToggleSidebar = (state) => state.slice.toggleSidebar;
export const selectEmployees = (state) => state.slice.employees;

export const { setEmployees, setDark, setToggleSidebar } = appSlice.actions;

// Async action creators for making API requests

export const fetchEmployeesAsync = () => async (dispatch) => {
	try {
		const response = await axios.get(API_URL);
		dispatch(setEmployees(response.data));
	} catch (error) {
		console.error("Error fetching employees:", error);
	}
};

export const updateEmployeeAsync =
	(employeesInfo) => async (dispatch, getState) => {
		try {
			const response = await axios.put(
				`${API_URL}/${employeesInfo.id}`,
				employeesInfo
			);
			const updatedEmployee = response.data;
			const updatedEmployees = getState().slice.employees.map((employee) =>
				employee.id === updatedEmployee.id ? updatedEmployee : employee
			);

			dispatch(setEmployees(updatedEmployees));
		} catch (error) {
			console.error("Error updating employee:", error);
		}
	};

export const addEmployeeAsync =
	(employeesInfo) => async (dispatch, getState) => {
		try {
			const response = await axios.post(API_URL, employeesInfo);
			dispatch(setEmployees([response.data, ...getState().slice.employees]));
		} catch (error) {
			console.error("Error adding employee:", error);
		}
	};

export const deleteEmployeeAsync =
	(employeeId) => async (dispatch, getState) => {
		try {
			await axios.delete(`${API_URL}/${employeeId}`);

			const updatedEmployees = getState().slice.employees.filter(
				(employee) => employee.id !== employeeId
			);

			dispatch(setEmployees(updatedEmployees));
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	};

export default appSlice.reducer;

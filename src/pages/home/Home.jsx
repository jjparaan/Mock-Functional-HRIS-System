import { lazy, Suspense, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widgets/Widget";
import Graph from "../../components/graph/Graph";
const FormModal = lazy(() => import("../../components/modals/form/FormModal"));
const MTable = lazy(() => import("../../components/mtable/MTable"));
import Navdock from "../../components/navdock/Navdock";
import { useSelector, useDispatch } from "react-redux";
import {
	selectEmployees,
	selectToggleSidebar,
	updateEmployeeAsync,
	addEmployeeAsync,
	deleteEmployeeAsync,
} from "../../slice/appSlice";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "./home.scss";

const Home = () => {
	const dispatch = useDispatch();
	const employees = useSelector(selectEmployees);
	const toggleSidebar = useSelector(selectToggleSidebar);

	// Modal Section
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	// Filter Section
	const [selectedFilters, setSelectedFilters] = useState({
		status: "- All",
		years: "- All",
		months: "- All",
	});

	const yearsValue = [
		"- All",
		...new Set(employees.map((employee) => employee.hiredDate.split("-")[0])),
	].sort((a, b) => b - a);

	const monthsValue = [
		"- All",
		...new Set(employees.map((employee) => employee.hiredDate.split("-")[1])),
	].sort((a, b) => a - b);

	const statusValue = [
		"- All",
		...new Set(employees.map((employee) => employee.status)),
	].sort();

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: value,
		}));
	};

	const filteredEmployees = useMemo(() => {
		let result = employees;

		if (selectedFilters.status && selectedFilters.status !== "- All") {
			result = result.filter(
				(employee) => employee.status === selectedFilters.status
			);
		}

		if (selectedFilters.years && selectedFilters.years !== "- All") {
			result = result.filter(
				(employee) =>
					new Date(employee.hiredDate).getFullYear() ===
					parseInt(selectedFilters.years)
			);
		}

		if (selectedFilters.months && selectedFilters.months !== "- All") {
			result = result.filter(
				(employee) =>
					new Date(employee.hiredDate).getMonth() ===
					parseInt(selectedFilters.months) - 1
			);
		}

		return result;
	}, [employees, selectedFilters]);

	// Form Section
	const [employeesInfo, setEmployeesInfo] = useState({
		id: "",
		firstName: "",
		lastName: "",
		age: "",
		gender: "",
		department: "",
		salary: "",
		position: "",
		hiredDate: "",
		email: "",
		address: "",
		contact: "",
		status: "",
	});
	const [filteredData, setFilteredData] = useState(filteredEmployees || []);

	const [isEditing, setIsEditing] = useState(false);
	const [saveChanges, setSaveChanges] = useState(false);

	const handleEdit = (
		id,
		firstName,
		lastName,
		age,
		gender,
		department,
		salary,
		position,
		hiredDate,
		email,
		address,
		contact,
		status
	) => {
		const editedEmployee = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			age: age,
			gender: gender,
			department: department,
			salary: salary,
			position: position,
			hiredDate: hiredDate,
			email: email,
			address: address,
			contact: contact,
			status: status,
		};
		setEmployeesInfo(editedEmployee);
		setIsEditing(true);
		setSaveChanges(true);
		setOpen(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEmployeesInfo((prevInputData) => ({
			...prevInputData,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!employeesInfo.firstName ||
			!employeesInfo.lastName ||
			!employeesInfo.age ||
			!employeesInfo.gender ||
			!employeesInfo.department ||
			!employeesInfo.salary ||
			!employeesInfo.position ||
			!employeesInfo.hiredDate ||
			!employeesInfo.email ||
			!employeesInfo.address ||
			!employeesInfo.contact ||
			!employeesInfo.status
		) {
			return;
		}
		if (isEditing && saveChanges) {
			dispatch(updateEmployeeAsync(employeesInfo));
			location.reload();
			setOpen(false);
			setEmployeesInfo({
				id: "",
				firstName: "",
				lastName: "",
				age: "",
				gender: "",
				department: "",
				salary: "",
				position: "",
				hiredDate: "",
				email: "",
				address: "",
				contact: "",
				status: "",
			});
		} else {
			dispatch(addEmployeeAsync(employeesInfo));
			setOpen(false);
			setEmployeesInfo({
				id: "",
				firstName: "",
				lastName: "",
				age: "",
				gender: "",
				department: "",
				salary: "",
				position: "",
				hiredDate: "",
				email: "",
				address: "",
				contact: "",
				status: "",
			});
		}
	};

	const handleDelete = (employeeId) => {
		const confirmed = window.confirm("Are you sure you want to delete?");

		if (!confirmed) {
			return;
		}
		dispatch(deleteEmployeeAsync(employeeId))
			.then(() => {
				// handle success
				setFilteredData((prevFilteredData) =>
					prevFilteredData.filter((employee) => employee.id !== employeeId)
				);
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
	};

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<>
			<motion.div
				className="home container"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<Sidebar
					statusValue={statusValue}
					yearsValue={yearsValue}
					monthsValue={monthsValue}
					handleFilterChange={handleFilterChange}
					handleClose={handleClose}
					open={open}
					setOpen={setOpen}
					item={item}
				/>
				<motion.div
					className="homeContainer"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					<Navbar item={item} />
					<motion.div className="widgets" variants={item}>
						<Widget type="headcount" filteredEmployees={filteredEmployees} />
						<Widget type="age" filteredEmployees={filteredEmployees} />
						<Widget type="hires" filteredEmployees={filteredEmployees} />
					</motion.div>
					<motion.div className="graphs" variants={item}>
						<Graph type="department" filteredEmployees={filteredEmployees} />
						<Graph type="salary" filteredEmployees={filteredEmployees} />
						<Graph type="status" filteredEmployees={filteredEmployees} />
						<Graph type="gender" filteredEmployees={filteredEmployees} />
						<Graph type="position" filteredEmployees={filteredEmployees} />
					</motion.div>
					<motion.div className="mtables" variants={item}>
						<Suspense fallback={"Loading..."}>
							<FormModal
								employeesInfo={employeesInfo}
								saveChanges={saveChanges}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								handleClose={handleClose}
								open={open}
							/>
						</Suspense>
						<Suspense fallback={"Loading..."}>
							<MTable
								filteredEmployees={filteredEmployees}
								filteredData={filteredData}
								setFilteredData={setFilteredData}
								handleEdit={handleEdit}
								handleDelete={handleDelete}
								setOpen={setOpen}
							/>
						</Suspense>
					</motion.div>
				</motion.div>
				{toggleSidebar && (
					<Navdock
						statusValue={statusValue}
						yearsValue={yearsValue}
						monthsValue={monthsValue}
						handleFilterChange={handleFilterChange}
					/>
				)}
			</motion.div>
		</>
	);
};

export default Home;

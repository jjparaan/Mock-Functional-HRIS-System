import { useState, useMemo, lazy, Suspense } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UserInfo from "../../components/userinfo/UserInfo";
const Navdock = lazy(() => import("../../components/navdock/Navdock"));
import { useSelector } from "react-redux";
import { selectEmployees, selectToggleSidebar } from "../../slice/appSlice";
import { motion } from "framer-motion";
import "./single.scss";

const Single = () => {
	const employees = useSelector(selectEmployees);
	const toggleSidebar = useSelector(selectToggleSidebar);

	const [selectedFilters, setSelectedFilters] = useState({
		status: "",
		years: "",
		months: "",
	});
	const filteredEmployees = useMemo(() => {
		let result = employees;

		if (selectedFilters.status) {
			result = result.filter(
				(employee) => employee.status === selectedFilters.status
			);
		}

		if (selectedFilters.years) {
			result = result.filter(
				(employee) =>
					new Date(employee.hiredDate).getFullYear() ===
					parseInt(selectedFilters.years)
			);
		}

		if (selectedFilters.months) {
			result = result.filter(
				(employee) =>
					new Date(employee.hiredDate).getMonth() ===
					parseInt(selectedFilters.months) - 1
			);
		}

		return result;
	}, [employees, selectedFilters]);

	const yearsValue = [
		...new Set(employees.map((employee) => employee.hiredDate.split("-")[0])),
	].sort((a, b) => b - a);

	const monthsValue = [
		...new Set(employees.map((employee) => employee.hiredDate.split("-")[1])),
	].sort((a, b) => a - b);

	const statusValue = [
		...new Set(employees.map((employee) => employee.status)),
	].sort();

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: value,
		}));
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
		<motion.div
			className="single"
			variants={container}
			initial="hidden"
			animate="visible"
		>
			<Sidebar
				statusValue={statusValue}
				yearsValue={yearsValue}
				monthsValue={monthsValue}
				handleFilterChange={handleFilterChange}
				item={item}
			/>
			<motion.div
				className="singleContainer"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<Navbar item={item} />
				<motion.div className="usersInformation" variants={item}>
					<UserInfo filteredEmployees={filteredEmployees} />
				</motion.div>
			</motion.div>
			{toggleSidebar && (
				<Suspense fallback={"Loading..."}>
					<Navdock
						statusValue={statusValue}
						yearsValue={yearsValue}
						monthsValue={monthsValue}
						handleFilterChange={handleFilterChange}
					/>
				</Suspense>
			)}
		</motion.div>
	);
};

export default Single;

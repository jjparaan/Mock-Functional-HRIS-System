import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import "./widget.scss";

const Widget = ({ type, filteredEmployees }) => {
	let data;

	// To get the average age
	let totalAge = 0;
	for (let i = 0; i < filteredEmployees.length; i++) {
		totalAge += parseInt(filteredEmployees[i].age);
	}
	let averageAge = totalAge / filteredEmployees.length;

	// To get the percentage of new hires based on year
	let newHire = filteredEmployees.filter(
		(employee) => new Date(employee.hiredDate) >= new Date("01/01/2023")
	);
	let newHireCount = newHire.length;
	let newHireDiff = (newHireCount / filteredEmployees.length) * 100;

	switch (type) {
		case "headcount":
			data = {
				title: "HEADCOUNT",
				count: `${filteredEmployees.length}`,
				link: (
					<Link
						to="./users"
						style={{ textDecoration: "none", color: "#333333" }}
					>
						See all users
					</Link>
				),
				icon: (
					<PersonOutlinedIcon
						className="icon"
						style={{
							color: "crimson",
							backgroundColor: "rgba(255, 0, 0, 0.2)",
						}}
					/>
				),
			};
			break;
		case "age":
			data = {
				title: "AVERAGE AGE",
				count: isNaN(averageAge) ? "0" : `${averageAge.toFixed(1)}`,
				link: (
					<Link
						to="./users"
						style={{ textDecoration: "none", color: "#333333" }}
					>
						See all users
					</Link>
				),
				icon: (
					<PersonOutlinedIcon
						className="icon"
						style={{
							color: "#614ab4",
							backgroundColor: "rgba(97, 74, 180, 0.2)",
						}}
					/>
				),
			};
			break;
		case "hires":
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			data = {
				title: `NEW HIRES AS OF ${currentYear}`,
				count: isNaN(newHireDiff) ? "0%" : `${newHireDiff.toFixed(1)}%`,
				link: (
					<Link
						to="./users"
						style={{ textDecoration: "none", color: "#333333" }}
					>
						See all users
					</Link>
				),
				icon: (
					<PersonOutlinedIcon
						className="icon"
						style={{
							color: "purple",
							backgroundColor: "rgba(128, 0, 128, 0.2)",
						}}
					/>
				),
			};
			break;
		default:
			break;
	}

	return (
		<div className="widget">
			<div className="left">
				<span className="title">{data.title}</span>
				<span className="count">{data.count}</span>
				<span className="link">{data.link}</span>
			</div>
			<div className="right">{data.icon}</div>
		</div>
	);
};

export default Widget;

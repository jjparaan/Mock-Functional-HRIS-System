import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import { columnTitles } from "./columnTitles";
import { Link } from "react-router-dom";
import "./mtable.scss";
import * as React from "react";

const MTable = ({
	filteredEmployees,
	filteredData,
	setFilteredData,
	handleEdit,
	handleDelete,
	setOpen,
}) => {
	const [sort, setSort] = useState("All");

	useEffect(() => {
		setFilteredData(
			sort === "All"
				? filteredEmployees
				: filteredEmployees.filter((data) => data.department === sort)
		);
	}, [filteredEmployees, sort]);
	const departmentMenuItems = [
		"All",
		"Accounting",
		"Utility",
		"Human Resources",
		"Sales",
		"Marketing",
		"Projects and Development",
	];
	return (
		<div className="mtable">
			<MaterialTable
				title={<AddIcon className="icon" onClick={() => setOpen(true)} />}
				data={filteredData}
				columns={[
					...columnTitles,
					{
						title: "",
						field: "actions",
						render: (rowData) => (
							<>
								<Link to={`/users/${rowData.id}`}>
									<button className="view">View</button>
								</Link>
								<button
									className="edit"
									onClick={() =>
										handleEdit(
											rowData.id,
											rowData.firstName,
											rowData.lastName,
											rowData.age,
											rowData.gender,
											rowData.department,
											rowData.salary,
											rowData.position,
											rowData.hiredDate,
											rowData.email,
											rowData.address,
											rowData.contact,
											rowData.status
										)
									}
								>
									Edit
								</button>
								<button
									className="delete"
									onClick={() => handleDelete(rowData.id)}
								>
									Delete
								</button>
							</>
						),
					},
				]}
				actions={[
					{
						icon: () => (
							<>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									style={{ width: 100 }}
									value={sort}
									onChange={(e) => setSort(e.target.value)}
								>
									{departmentMenuItems.map((department) => (
										<MenuItem key={department} value={department}>
											{department}
										</MenuItem>
									))}
								</Select>
							</>
						),
						tooltip: "Filter by department",
						isFreeAction: true,
					},
				]}
				options={{
					search: true,
					paging: true,
				}}
			/>
		</div>
	);
};

export default MTable;

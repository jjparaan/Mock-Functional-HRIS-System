import React from "react";
import DataGrid, {
	Sorting,
	Column,
	SearchPanel,
	Selection,
	Scrolling,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./datatable.scss";

const Datatable = ({ filteredEmployees, item }) => {
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const handleSelectionChanged = ({ selectedRowsData }) => {
		setSelectedEmployee(selectedRowsData[0]);
	};

	return (
		<>
			<motion.div className="datatable" variants={item}>
				<DataGrid
					height={750}
					dataSource={filteredEmployees}
					keyExpr="id"
					columnResizingMode="widget"
					allowColumnReordering
					responsiveLayout={{
						mode: "singleColumn",
						breakpoint: 800,
					}}
					showBorders
					showColumnLines={false}
					focusedRowEnabled
					onSelectionChanged={handleSelectionChanged}
				>
					<Sorting mode="multiple" />
					<Scrolling mode="infinite" />
					<SearchPanel visible={true} />
					<Selection mode="single" />
					<Column dataField="id" caption="ID"></Column>
					<Column dataField="firstName" caption="First Name"></Column>
					<Column dataField="lastName" caption="Last Name"></Column>
					<Column dataField="age" caption="Age"></Column>
					<Column dataField="gender" caption="Gender"></Column>
					<Column dataField="department" caption="Department"></Column>
					<Column dataField="salary" caption="Salary"></Column>
					<Column dataField="position" caption="Position"></Column>
					<Column
						dataField="hiredDate"
						caption="Hired Date"
						dataType="date"
					></Column>
					<Column dataField="status" caption="Status"></Column>
				</DataGrid>
			</motion.div>
			{selectedEmployee && (
				<motion.div className="employeeInfo" variants={item}>
					<div className="left">
						<p className="id">
							ID: <span>{selectedEmployee.id}</span>
						</p>
						<p className="fullName">
							Full Name:{" "}
							<span>
								{selectedEmployee.firstName} {selectedEmployee.lastName}
							</span>
						</p>
						<p className="age">
							Age: <span>{selectedEmployee.age}</span>
						</p>
						<p className="gender">
							Gender: <span>{selectedEmployee.gender}</span>
						</p>
					</div>
					<div className="right">
						<p className="department">
							Department: <span>{selectedEmployee.department}</span>
						</p>
						<p className="salary">
							Salary: <span>${selectedEmployee.salary.toLocaleString()}</span>
						</p>
						<p className="position">
							Position: <span>{selectedEmployee.position}</span>
						</p>
						<p className="hiredDate">
							Hired Date:{" "}
							<span>
								{new Date(selectedEmployee.hiredDate).toLocaleDateString(
									"en-US"
								)}
							</span>
						</p>
						<Link
							to={`/users/${selectedEmployee.id}`}
							style={{ textDecoration: "none" }}
							className="icon"
						>
							<Button icon="arrowright" stylingMode="text" />
						</Link>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default Datatable;

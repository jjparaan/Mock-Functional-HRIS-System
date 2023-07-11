import React, { useState, useMemo } from "react";
import {
	Chart,
	Series,
	ValueAxis,
	Title,
	Label,
	Tooltip,
	Grid,
	ArgumentAxis,
} from "devextreme-react/chart";
import PieChart, {
	Connector,
	SmallValuesGrouping,
	Legend,
} from "devextreme-react/pie-chart";
import {
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	FormControlLabel,
} from "@mui/material";
import "devextreme/dist/css/dx.light.css";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PieChartIcon from "@mui/icons-material/PieChart";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import "./graph.scss";

const Graph = ({ type, filteredEmployees }) => {
	const departmentData = filteredEmployees.reduce((acc, curr) => {
		const departmentIndex = acc.findIndex(
			(d) => d.department === curr.department
		);
		if (departmentIndex === -1) {
			acc.push({
				department: curr.department,
				headcount: 1,
			});
		} else {
			acc[departmentIndex].headcount++;
		}
		return acc;
	}, []);
	const statusData = filteredEmployees.reduce((acc, curr) => {
		const statusIndex = acc.findIndex((d) => d.status === curr.status);
		if (statusIndex === -1) {
			acc.push({
				status: curr.status,
				headcount: 1,
			});
		} else {
			acc[statusIndex].headcount++;
		}
		return acc;
	}, []);
	const genderData = filteredEmployees.reduce((acc, curr) => {
		const genderIndex = acc.findIndex((d) => d.gender === curr.gender);
		if (genderIndex === -1) {
			acc.push({
				gender: curr.gender,
				headcount: 1,
			});
		} else {
			acc[genderIndex].headcount++;
		}
		return acc;
	}, []);
	const salaries = filteredEmployees.reduce((acc, curr) => {
		// Check if curr.salary is a string before replacing non-digits
		const salary =
			typeof curr.salary === "string"
				? parseInt(curr.salary.replace(/\D/g, ""), 10)
				: curr.salary;
		const salaryRange = getSalaryRange(salary);
		const salaryRangeIndex = acc.findIndex((d) => d.range === salaryRange);
		if (salaryRangeIndex === -1) {
			acc.push({
				range: salaryRange,
				headcount: 1,
			});
		} else {
			acc[salaryRangeIndex].headcount++;
		}
		return acc;
	}, []);

	function getSalaryRange(salary) {
		const minSalary = Math.floor(salary / 10000) * 10000;
		const maxSalary = minSalary + 9999;

		// Format the numbers with commas
		const formattedMinSalary = minSalary.toLocaleString();
		const formattedMaxSalary = maxSalary.toLocaleString();

		return `$${formattedMinSalary.substring(
			0,
			2
		)}${formattedMinSalary.substring(2)} - $${formattedMaxSalary.substring(
			0,
			2
		)}${formattedMaxSalary.substring(2)}`;
	}

	const salaryData = salaries.sort((a, b) => {
		const aMinSalary = parseInt(a.range.match(/\d+/)[0]);
		const bMinSalary = parseInt(b.range.match(/\d+/)[0]);
		return aMinSalary - bMinSalary;
	});
	const positionData = filteredEmployees.reduce((acc, curr) => {
		const positionIndex = acc.findIndex((d) => d.position === curr.position);
		if (positionIndex === -1) {
			acc.push({
				position: curr.position,
				headcount: 1,
			});
		} else {
			acc[positionIndex].headcount++;
		}
		return acc;
	}, []);

	const [sortChart, setSortChart] = useState({
		departmentCharts: "bar",
		salaryCharts: "pie",
		positionCharts: "bar",
		statusCharts: "doughnut",
		genderCharts: "doughnut",
	});
	const handleChartChange = (e) => {
		const { name, value } = e.target;
		setSortChart((prevSortChart) => ({
			...prevSortChart,
			[name]: value,
		}));
	};

	const sortedDeptChart = useMemo(() => {
		const customizeText = (arg) => {
			return `${arg.argumentText} (${arg.valueText})`;
		};
		const tooltipContentRender = (arg) => {
			const { argumentText, valueText } = arg;
			return `(${valueText}) - ${argumentText}`;
		};
		switch (type) {
			case "department":
				return (
					<div className="graph department">
						<div className="sort">
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Charts
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									value={sortChart.departmentCharts}
									name="radio-buttons-group"
								>
									<FormControlLabel
										name="departmentCharts"
										value="bar"
										checked={sortChart.departmentCharts === "bar"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<EqualizerIcon className="barIcon" />}
									/>
									<FormControlLabel
										name="departmentCharts"
										value="pie"
										checked={sortChart.departmentCharts === "pie"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<PieChartIcon className="pieIcon" />}
									/>
									<FormControlLabel
										name="departmentCharts"
										value="doughnut"
										checked={sortChart.departmentCharts === "doughnut"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<DataSaverOffIcon className="doughnutIcon" />}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div>
							{sortChart.departmentCharts === "bar" && (
								<Chart
									id="barChart"
									dataSource={departmentData}
									animation={{ duration: 2000 }}
									legend={{ visible: false }}
									palette="soft pastel"
									commonAxisSettings={{
										grid: {
											opacity: 0.4,
										},
									}}
								>
									<Series
										valueField="headcount"
										argumentField="department"
										type="bar"
										hoverMode="none"
									/>
									<Tooltip
										enabled={true}
										contentRender={tooltipContentRender}
									/>
									<ValueAxis>
										<Title text="HEADCOUNT" />
										<Grid visible={true} />
									</ValueAxis>
									<ArgumentAxis>
										<Title text="DEPARTMENT" />
										<Grid visible={false} />
									</ArgumentAxis>
								</Chart>
							)}
							{sortChart.departmentCharts === "pie" && (
								<PieChart
									id="pie"
									palette="soft pastel"
									dataSource={departmentData}
								>
									<Legend visible={false} />
									<Series argumentField="department" valueField="headcount">
										<Label
											visible={true}
											position="columns"
											customizeText={customizeText}
										>
											<Connector visible={true} width={0.5} />
										</Label>
									</Series>
								</PieChart>
							)}
							{sortChart.departmentCharts === "doughnut" && (
								<PieChart
									id="pie"
									type="doughnut"
									palette="soft pastel"
									dataSource={departmentData}
								>
									<Series argumentField="department" valueField="headcount">
										<SmallValuesGrouping
											mode="topN"
											topCount={departmentData.length}
										/>
										<Label
											visible={true}
											format="fixedPoint"
											customizeText={customizeText}
										>
											<Connector visible={true} width={1} />
										</Label>
									</Series>
									<Legend visible={false} />
								</PieChart>
							)}
						</div>
					</div>
				);
				break;
			case "salary":
				return (
					<div className="graph salary">
						<div className="sort">
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Charts
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									value={sortChart.salaryCharts}
									name="radio-buttons-group"
								>
									<FormControlLabel
										name="salaryCharts"
										value="bar"
										checked={sortChart.salaryCharts === "bar"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<EqualizerIcon className="barIcon" />}
									/>
									<FormControlLabel
										name="salaryCharts"
										value="pie"
										checked={sortChart.salaryCharts === "pie"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<PieChartIcon className="pieIcon" />}
									/>
									<FormControlLabel
										name="salaryCharts"
										value="doughnut"
										checked={sortChart.salaryCharts === "doughnut"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<DataSaverOffIcon className="doughnutIcon" />}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div>
							{sortChart.salaryCharts === "bar" && (
								<Chart
									id="barChart"
									dataSource={salaryData}
									animation={{ duration: 2000 }}
									palette="soft pastel"
									legend={{ visible: false }}
									commonAxisSettings={{
										grid: {
											opacity: 0.4,
										},
									}}
								>
									<Series
										valueField="headcount"
										argumentField="range"
										type="bar"
										hoverMode="none"
									/>
									<Tooltip
										enabled={true}
										contentRender={tooltipContentRender}
									/>
									<ValueAxis>
										<Title text="HEADCOUNT" />
										<Grid visible={true} />
									</ValueAxis>
									<ArgumentAxis>
										<Title text="RANGE" />
										<Grid visible={false} />
									</ArgumentAxis>
								</Chart>
							)}
							{sortChart.salaryCharts === "pie" && (
								<PieChart
									id="pie"
									palette="soft pastel"
									dataSource={salaryData}
								>
									<Legend visible={false} />
									<Series argumentField="range" valueField="headcount">
										<Label
											visible={true}
											position="columns"
											customizeText={customizeText}
										>
											<Connector visible={true} width={0.5} />
										</Label>
									</Series>
								</PieChart>
							)}
							{sortChart.salaryCharts === "doughnut" && (
								<PieChart
									id="pie"
									type="doughnut"
									palette="soft pastel"
									dataSource={salaryData}
								>
									<Series argumentField="range" valueField="headcount">
										<SmallValuesGrouping
											mode="topN"
											topCount={salaryData.length}
										/>
										<Label
											visible={true}
											format="fixedPoint"
											customizeText={customizeText}
										>
											<Connector visible={true} width={1} />
										</Label>
									</Series>
									<Legend visible={false} />
								</PieChart>
							)}
						</div>
					</div>
				);
				break;
			case "position":
				return (
					<div className="graph position">
						<div className="sort">
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Charts
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									value={sortChart.positionCharts}
									name="radio-buttons-group"
								>
									<FormControlLabel
										name="positionCharts"
										value="bar"
										checked={sortChart.positionCharts === "bar"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<EqualizerIcon className="barIcon" />}
									/>
									<FormControlLabel
										name="positionCharts"
										value="pie"
										checked={sortChart.positionCharts === "pie"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<PieChartIcon className="pieIcon" />}
									/>
									<FormControlLabel
										name="positionCharts"
										value="doughnut"
										checked={sortChart.positionCharts === "doughnut"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<DataSaverOffIcon className="doughnutIcon" />}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div>
							{sortChart.positionCharts === "bar" && (
								<Chart
									id="barChart"
									dataSource={positionData}
									animation={{ duration: 2000 }}
									palette="soft pastel"
									legend={{ visible: false }}
									commonAxisSettings={{
										grid: {
											opacity: 0.4,
										},
									}}
								>
									<Series
										valueField="headcount"
										argumentField="position"
										type="bar"
										hoverMode="none"
									/>
									<Tooltip
										enabled={true}
										contentRender={tooltipContentRender}
									/>
									<ValueAxis>
										<Title text="HEADCOUNT" />
										<Grid visible={true} />
									</ValueAxis>
									<ArgumentAxis>
										<Title text="POSITION" />
										<Grid visible={false} />
									</ArgumentAxis>
								</Chart>
							)}
							{sortChart.positionCharts === "pie" && (
								<PieChart
									id="pie"
									palette="soft pastel"
									dataSource={positionData}
								>
									<Legend visible={false} />
									<Series argumentField="position" valueField="headcount">
										<Label
											visible={true}
											position="columns"
											customizeText={customizeText}
										>
											<Connector visible={true} width={0.5} />
										</Label>
									</Series>
								</PieChart>
							)}
							{sortChart.positionCharts === "doughnut" && (
								<PieChart
									id="pie"
									type="doughnut"
									palette="soft pastel"
									dataSource={positionData}
								>
									<Series argumentField="position" valueField="headcount">
										<SmallValuesGrouping
											mode="topN"
											topCount={positionData.length}
										/>
										<Label
											visible={true}
											format="fixedPoint"
											customizeText={customizeText}
										>
											<Connector visible={true} width={1} />
										</Label>
									</Series>
									<Legend visible={false} />
								</PieChart>
							)}
						</div>
					</div>
				);
				break;
			case "status":
				return (
					<div className="graph status">
						<div className="sort">
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Charts
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									value={sortChart.statusCharts}
									name="radio-buttons-group"
								>
									<FormControlLabel
										name="statusCharts"
										value="bar"
										checked={sortChart.statusCharts === "bar"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<EqualizerIcon className="barIcon" />}
									/>
									<FormControlLabel
										name="statusCharts"
										value="pie"
										checked={sortChart.statusCharts === "pie"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<PieChartIcon className="pieIcon" />}
									/>
									<FormControlLabel
										name="statusCharts"
										value="doughnut"
										checked={sortChart.statusCharts === "doughnut"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<DataSaverOffIcon className="doughnutIcon" />}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div>
							{sortChart.statusCharts === "bar" && (
								<Chart
									id="barChart"
									dataSource={statusData}
									animation={{ duration: 2000 }}
									palette="soft pastel"
									legend={{ visible: false }}
									commonAxisSettings={{
										grid: {
											opacity: 0.4,
										},
									}}
								>
									<Series
										valueField="headcount"
										argumentField="status"
										type="bar"
										hoverMode="none"
									/>
									<Tooltip
										enabled={true}
										contentRender={tooltipContentRender}
									/>
									<ValueAxis>
										<Title text="HEADCOUNT" />
										<Grid visible={true} />
									</ValueAxis>
									<ArgumentAxis>
										<Title text="STATUS" />
										<Grid visible={false} />
									</ArgumentAxis>
								</Chart>
							)}
							{sortChart.statusCharts === "pie" && (
								<PieChart
									id="pie"
									palette="soft pastel"
									dataSource={statusData}
								>
									<Legend visible={false} />
									<Series argumentField="status" valueField="headcount">
										<Label
											visible={true}
											position="columns"
											customizeText={customizeText}
										>
											<Connector visible={true} width={0.5} />
										</Label>
									</Series>
								</PieChart>
							)}
							{sortChart.statusCharts === "doughnut" && (
								<PieChart
									id="pie"
									type="doughnut"
									palette="Soft Pastel"
									dataSource={statusData}
								>
									<Series argumentField="status" valueField="headcount">
										<SmallValuesGrouping
											mode="topN"
											topCount={statusData.length}
										/>
										<Label
											visible={true}
											format="fixedPoint"
											customizeText={customizeText}
										>
											<Connector visible={true} width={1} />
										</Label>
									</Series>
									<Legend visible={false} />
								</PieChart>
							)}
						</div>
					</div>
				);
				break;
			case "gender":
				return (
					<div className="graph gender">
						<div className="sort">
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Charts
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									value={sortChart.genderCharts}
									name="radio-buttons-group"
								>
									<FormControlLabel
										name="genderCharts"
										value="bar"
										checked={sortChart.genderCharts === "bar"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<EqualizerIcon className="barIcon" />}
									/>
									<FormControlLabel
										name="genderCharts"
										value="pie"
										checked={sortChart.genderCharts === "pie"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<PieChartIcon className="pieIcon" />}
									/>
									<FormControlLabel
										name="genderCharts"
										value="doughnut"
										checked={sortChart.genderCharts === "doughnut"}
										onChange={handleChartChange}
										control={<Radio />}
										label={<DataSaverOffIcon className="doughnutIcon" />}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div>
							{sortChart.genderCharts === "bar" && (
								<Chart
									id="barChart"
									dataSource={genderData}
									animation={{ duration: 2000 }}
									palette="soft pastel"
									legend={{ visible: false }}
									commonAxisSettings={{
										grid: {
											opacity: 0.4,
										},
									}}
								>
									<Series
										valueField="headcount"
										argumentField="gender"
										type="bar"
										hoverMode="none"
									/>
									<Tooltip
										enabled={true}
										contentRender={tooltipContentRender}
									/>
									<ValueAxis>
										<Title text="HEADCOUNT" />
										<Grid visible={true} />
									</ValueAxis>
									<ArgumentAxis>
										<Title text="GENDER" />
										<Grid visible={false} />
									</ArgumentAxis>
								</Chart>
							)}
							{sortChart.genderCharts === "pie" && (
								<PieChart
									id="pie"
									palette="soft pastel"
									dataSource={genderData}
								>
									<Legend visible={false} />
									<Series argumentField="gender" valueField="headcount">
										<Label
											visible={true}
											position="columns"
											customizeText={customizeText}
										>
											<Connector visible={true} width={0.5} />
										</Label>
									</Series>
								</PieChart>
							)}
							{sortChart.genderCharts === "doughnut" && (
								<PieChart
									id="pie"
									type="doughnut"
									palette="Soft Pastel"
									dataSource={genderData}
								>
									<Series argumentField="gender" valueField="headcount">
										<SmallValuesGrouping
											mode="topN"
											topCount={genderData.length}
										/>
										<Label
											visible={true}
											format="fixedPoint"
											customizeText={customizeText}
										>
											<Connector visible={true} width={1} />
										</Label>
									</Series>
									<Legend visible={false} />
								</PieChart>
							)}
						</div>
					</div>
				);
				break;

			default:
				return null;
		}
	}, [sortChart, filteredEmployees]);

	return <>{sortedDeptChart}</>;
};

export default Graph;

import React, { useState } from "react";
import { menuItems } from "../sidebar/menuItems";
import { Autocomplete, TextField, Modal, Box } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link } from "react-router-dom";
import "./navdock.scss";

const Navdock = ({
	statusValue,
	yearsValue,
	monthsValue,
	handleFilterChange,
}) => {
	const [openFilter, setOpenFilter] = useState(false);
	const closeFilter = () => {
		setOpenFilter(false);
	};

	const styles = {
		display: "flex",
		gap: "10px",
	};
	return (
		<div className="navdock">
			{menuItems.map((menu) => (
				<ul key={menu.title}>
					{menu.items.map((item, index) => (
						<Link
							key={index}
							to={item.to}
							style={{ textDecoration: "none", color: "white" }}
						>
							<li>{item.icon}</li>
						</Link>
					))}
				</ul>
			))}
			<FilterAltOutlinedIcon
				className="icon"
				onClick={() => setOpenFilter((prevState) => !prevState)}
			/>
			{openFilter && (
				<Modal
					open={openFilter}
					onClose={closeFilter}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<Box sx={styles}>
						<Autocomplete
							disablePortal
							id="status"
							options={statusValue}
							onChange={(e, value) => handleFilterChange("status", value)}
							sx={{ width: 150 }}
							renderInput={(params) => <TextField {...params} label="Status" />}
						/>
						<Autocomplete
							disablePortal
							id="years"
							options={yearsValue}
							onChange={(e, value) => handleFilterChange("years", value)}
							sx={{ width: 150 }}
							renderInput={(params) => <TextField {...params} label="Years" />}
						/>
						<Autocomplete
							disablePortal
							id="months"
							options={monthsValue}
							onChange={(e, value) => handleFilterChange("months", value)}
							sx={{ width: 150 }}
							renderInput={(params) => <TextField {...params} label="Months" />}
						/>
					</Box>
				</Modal>
			)}
		</div>
	);
};

export default Navdock;

import { menuItems } from "./menuItems";
import { Link } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import { selectToggleSidebar } from "../../slice/appSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./sidebar.scss";

const Sidebar = ({
	statusValue,
	yearsValue,
	monthsValue,
	handleFilterChange,
	item,
}) => {
	const toggleSidebar = useSelector(selectToggleSidebar);

	return (
		<motion.div className={toggleSidebar ? "sidebar pull" : "sidebar"}>
			<motion.div className="top" variants={item}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="logo">dashboard admin</span>
				</Link>
			</motion.div>
			<div className="center">
				{menuItems.map((menu) => (
					<motion.ul key={menu.title} variants={item}>
						<p>{menu.title}</p>
						{menu.items.map((item, index) => (
							<Link key={index} to={item.to} style={{ textDecoration: "none" }}>
								<li>
									{item.icon}
									<span>{item.name}</span>
								</li>
							</Link>
						))}
					</motion.ul>
				))}
			</div>
			<motion.div className="bottom" variants={item}>
				<p>Filter</p>
				<motion.div className="autocompletes" variants={item}>
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
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Sidebar;

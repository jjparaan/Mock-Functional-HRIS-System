import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { useSelector, useDispatch } from "react-redux";
import {
	setDark,
	selectToggleDark,
	setToggleSidebar,
} from "../../slice/appSlice";
import { motion } from "framer-motion";
import "./navbar.scss";

const Navbar = ({ item }) => {
	const dispatch = useDispatch();
	const toggleDark = useSelector(selectToggleDark);

	const menuItems = [
		{
			items: toggleDark ? (
				<WbSunnyIcon className="icon" onClick={() => dispatch(setDark())} />
			) : (
				<DarkModeOutlinedIcon
					className="icon"
					onClick={() => dispatch(setDark())}
				/>
			),
			name: "toggleDark",
		},
		{
			items: <NotificationsNoneOutlinedIcon className="icon" />,
			name: "notificationBell",
		},
		{
			items: (
				<ListOutlinedIcon
					className="icon"
					onClick={() => dispatch(setToggleSidebar())}
				/>
			),
			name: "hamburger",
		},
		{
			items: <AccessibilityIcon className="icon" />,
			name: "avatar",
		},
	];

	return (
		<motion.div className="navbar" variants={item}>
			<div className="items">
				{menuItems.map((menu) => (
					<div className="item" key={menu.name}>
						{menu.items}
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default Navbar;

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const menuItems = [
	{
		title: "MAIN",
		items: [
			{
				icon: <DashboardIcon className="icon" />,
				name: "Dashboard",
				to: "/",
			},
		],
	},
	{
		title: "LIST",
		items: [
			{
				icon: <PersonOutlineIcon className="icon" />,
				name: "Users",
				to: "/users",
			},
		],
	},
	{
		title: "USER",
		items: [
			{
				icon: <AccountCircleOutlinedIcon className="icon" />,
				name: "Profile",
				to: "/users/userId",
			},
			{
				icon: <ExitToAppIcon className="icon logout" />,
				name: "Logout",
				to: "/",
			},
		],
	},
];

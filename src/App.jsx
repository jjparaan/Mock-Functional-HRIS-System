import "./app.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToggleDark, fetchEmployeesAsync } from "./slice/appSlice";

const App = () => {
	const dispatch = useDispatch();
	const toggle = useSelector(selectToggleDark);

	useEffect(() => {
		dispatch(fetchEmployeesAsync());
	}, []);

	return (
		<div className={`${toggle ? "app dark" : "app"}`}>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="users">
							<Route index element={<List />} />
							<Route path=":userId" element={<Single />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

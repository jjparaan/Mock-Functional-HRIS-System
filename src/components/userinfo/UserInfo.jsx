import { useParams } from "react-router-dom";
import "./userinfo.scss";

const UserInfo = ({ filteredEmployees }) => {
	const { userId } = useParams();
	const employee = filteredEmployees.find((emp) => emp.id === parseInt(userId));
	if (!employee) {
		return <div className="userinfo">Employee not found</div>;
	}
	return (
		<div className="userinfo">
			<div className="top">
				<img
					src={!employee.img ? "../../public/th.jpg" : employee.img}
					alt="employee img"
				/>
				<div className="topDetails">
					<h1>
						<span>
							{employee.firstName} {employee.lastName}
						</span>
					</h1>
					<p>
						ID: <span>{employee.id}</span>
					</p>
					<p>
						Email: <span>{employee.email}</span>
					</p>
					<p>
						Contact: <span>+{employee.contact}</span>
					</p>
				</div>
			</div>
			<div className="bottom">
				<div>
					<p>
						Age: <span>{employee.age}</span>
					</p>
					<p>
						Gender: <span>{employee.gender}</span>
					</p>
					<p>
						Address: <span>{employee.address}</span>
					</p>
					<p>
						Department: <span>{employee.department}</span>
					</p>
				</div>
				<div>
					<p>
						Salary: <span>${employee.salary.toLocaleString()}</span>
					</p>

					<p>
						Position: <span>{employee.position}</span>
					</p>
					<p>
						Hired Date: <span>{employee.hiredDate}</span>
					</p>
					<p>
						Status: <span>{employee.status}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;

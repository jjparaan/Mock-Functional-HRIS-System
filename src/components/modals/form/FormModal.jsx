import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./formModal.scss";

const FormModal = ({
	employeesInfo,
	saveChanges,
	handleChange,
	handleSubmit,
	handleClose,
	open,
}) => {
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box>
					<form onSubmit={handleSubmit}>
						<div className="form-row">
							<div className="form-input">
								<label htmlFor="id">ID :</label>
								<input
									type="text"
									id="id"
									name="id"
									value={employeesInfo.id}
									onChange={handleChange}
									disabled
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-input">
								<label htmlFor="firstName">First Name:</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={employeesInfo.firstName}
									onChange={handleChange}
								/>
							</div>

							<div className="form-input">
								<label htmlFor="lastName">Last Name:</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={employeesInfo.lastName}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-input">
								<label htmlFor="age">Age:</label>
								<input
									type="text"
									id="age"
									name="age"
									value={employeesInfo.age}
									onChange={handleChange}
								/>
							</div>

							<div className="form-input">
								<label htmlFor="gender">Gender:</label>
								<select
									name="gender"
									id="gender"
									value={employeesInfo.gender}
									onChange={handleChange}
								>
									<option value="">--Select --</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
						</div>

						<div className="form-row">
							<div className="form-input">
								<label htmlFor="department">Department:</label>
								<select
									name="department"
									id="department"
									value={employeesInfo.department}
									onChange={handleChange}
								>
									<option value="">--Select --</option>
									<option value="Human Resources">Human Resources</option>
									<option value="Utility">Utility</option>
									<option value="Marketing">Marketing</option>
									<option value="Projects and Development">
										Projects and Development
									</option>
									<option value="Sales">Sales</option>
									<option value="Accounting">Accounting</option>
								</select>
							</div>

							<div className="form-input">
								<label htmlFor="salary">Salary:</label>
								<input
									type="text"
									id="salary"
									name="salary"
									value={employeesInfo.salary}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-input">
								<label htmlFor="position">Position:</label>
								<select
									name="position"
									id="position"
									value={employeesInfo.position}
									onChange={handleChange}
								>
									<option value="">--Select --</option>
									<option value="Partner">Partner</option>
									<option value="Senior Associate">Senior Associate</option>
									<option value="Mid Associate">Mid Associate</option>
									<option value="Junior Associate">Junior Associate</option>
									<option value="Intern">Intern</option>
								</select>
							</div>

							<div className="form-input ">
								<label htmlFor="hiredDate">Hired Date:</label>
								<input
									type="date"
									id="hiredDate"
									name="hiredDate"
									value={
										employeesInfo.hiredDate
											? new Date(employeesInfo.hiredDate)
													.toISOString()
													.substring(0, 10)
											: ""
									}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-input">
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									name="email"
									value={employeesInfo.email}
									onChange={handleChange}
								/>
							</div>
							<div className="form-input">
								<label htmlFor="address">Address:</label>
								<input
									type="text"
									id="address"
									name="address"
									value={employeesInfo.address}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-input">
								<label htmlFor="contact">Contact:</label>
								<input
									type="text"
									id="contact"
									name="contact"
									value={employeesInfo.contact}
									onChange={handleChange}
								/>
							</div>
							<div className="form-input">
								<label htmlFor="status">Status:</label>
								<select
									name="status"
									id="status"
									value={employeesInfo.status}
									onChange={handleChange}
								>
									<option value="">--Select --</option>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
						<button>{saveChanges ? "Save Changes" : "Add"}</button>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default FormModal;

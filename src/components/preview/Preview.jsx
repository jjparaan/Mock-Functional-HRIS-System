import "./preview.scss";
import { employees } from "../../data/data";
import "devextreme/dist/css/dx.light.css";
import {
	DataGrid,
	Column,
	Sorting,
	SearchPanel,
} from "devextreme-react/data-grid";
import { Button, Template } from "devextreme-react";
import { Link } from "react-router-dom";

const Preview = () => {
	return (
		<div className="preview">
			<DataGrid
				dataSource={employees}
				keyExpr="id"
				columnAutoWidth={true}
				columnResizingMode="widget"
				showBorders={true}
				showColumnLines={false}
				allowColumnReordering={true}
				responsiveLayout={{
					mode: "singleColumn",
					breakpoint: 800,
				}}
				paging={{ pageSize: "5" }}
				pager={{
					showNavigationButtons: true,
				}}
			>
				<Sorting mode="multiple" />
				<SearchPanel visible={true} />
				<Column dataField="id" caption="ID"></Column>
				<Column dataField="firstName" caption="First Name"></Column>
				<Column dataField="lastName"></Column>
				<Column dataField="age"></Column>
				<Column dataField="gender"></Column>
				<Column dataField="department"></Column>
				<Column dataField="salary"></Column>
				<Column dataField="position"></Column>
				<Column dataField="hiredDate" dataType="date"></Column>
				<Column
					alignment="center"
					cellRender={({ data }) => (
						<Link to={`/users/${data.id}`} style={{ textDecoration: "none" }}>
							<Button
								text="View"
								icon="find"
								type="normal"
								stylingMode="outlined"
							/>
						</Link>
					)}
				/>
			</DataGrid>
		</div>
	);
};

export default Preview;

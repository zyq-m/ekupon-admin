import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Layout,
	Tablefilter,
	Modal,
	BtnSuspend,
	Loading,
} from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function StudentData() {
	const [student, setStudent] = useState([]);
	const [fund, setFund] = useState("");
	const { error, showModal } = useModal();

	const downloadExcel = async () => {
		try {
			const res = await api.get("/admin/report/student_list", {
				responseType: "blob",
			});

			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement("a");

			link.href = url;
			link.setAttribute("download", "SENARAI NAMA PELAJAR E-KUPON.xlsx");
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		api.get("/admin/student", { params: { fundType: fund } })
			.then((res) => setStudent(res.data.student))
			.catch((err) => {
				showModal(err.response.data.message);
			});
	}, [fund]);

	if (!student.length) {
		return (
			<Layout title="Student data">
				<Loading />
			</Layout>
		);
	}

	return (
		<Layout title="Student data">
			<div className="flex justify-between">
				<Tablefilter fundType={true} setSelect={(e) => setFund(e)} />
				<div className="flex justify-end">
					<button
						className="btn btn-sm btn-warning"
						onClick={downloadExcel}
					>
						<FileDownloadOutlinedIcon />
						Senarai Nama
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Matric No.</th>
							<th>Balance (RM)</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{student.map((d, i) => {
							return (
								<>
									<tr className="hover" key={d.matricNo}>
										<th>{i + 1}</th>
										<td className="capitalize">
											{d.user.profile.name}
										</td>
										<td>{d.matricNo}</td>
										<td>{d.coupon.total}</td>
										<td>
											<BtnSuspend
												active={d.user.active}
												userId={d.userId}
											/>
										</td>
										<td>
											<Link
												to={`transaction/${d.matricNo}`}
												className="btn btn-ghost btn-xs"
											>
												transactions
											</Link>
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</div>
			<Modal error={error} />
		</Layout>
	);
}

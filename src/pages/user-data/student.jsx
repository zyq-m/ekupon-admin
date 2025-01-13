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
		fund &&
			api
				.get("/student", { params: { fundId: fund } })
				.then((res) => setStudent(res.data))
				.catch((err) => {
					showModal(err.response.data.message);
				});
	}, [fund]);

	if (!student.length && fund) {
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
						{student.map((d, i) => (
							<tr className="hover" key={d.matric_no}>
								<th>{i + 1}</th>
								<td className="capitalize">{d.name}</td>
								<td>{d.matric_no}</td>
								<td>
									{d.coupons
										.filter(
											(coupon) => coupon.fund_id === +fund
										)[0]
										?.balance.toFixed(2)}
								</td>
								<td>
									<BtnSuspend
										active={d.user.is_active}
										userId={d.matric_no}
									/>
								</td>
								<td>
									<Link
										to={`transaction/${d.ic_no}/${fund}`}
										className="btn btn-ghost btn-xs"
									>
										transactions
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Modal error={error} />
		</Layout>
	);
}

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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { suspend } from "../../api/user";

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

	const onSuspend = async (id, active) => {
		try {
			await suspend(id, active);
			fetchStudents();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchStudents = () => {
		api
			.get("/student", { params: { fundId: fund } })
			.then((res) => setStudent(res.data))
			.catch((err) => {
				showModal(err.response.data.message);
			});
	};

	useEffect(() => {
		fund && fetchStudents();
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
			<div
				className="flex gap-4 flex-nowrap overflow-x-auto"
				style={{ whiteSpace: "nowrap" }}
			>
				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div
						className="flex items-center justify-center w-16 h-16 rounded-lg"
						style={{ backgroundColor: "#ffbe00" }}
					>
						<AttachMoneyIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">Total Fund</h3>
						</div>
						<p className="text-2xl font-semibold text-black">RM8,090.00</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>

				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div
						className="flex items-center justify-center w-16 h-16 rounded-lg"
						style={{ backgroundColor: "#ffbe00" }}
					>
						<PaymentsIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">Total Expenses</h3>
						</div>
						<p className="text-2xl font-semibold text-black">RM3,714.90</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>

				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div
						className="flex items-center justify-center w-16 h-16 rounded-lg"
						style={{ backgroundColor: "#ffbe00" }}
					>
						<AccountBalanceWalletIcon
							style={{ color: "white", fontSize: "30px" }}
						/>
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">Balance</h3>
						</div>
						<p className="text-2xl font-semibold text-black">RM4,375.10</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>
			</div>

			<br />

			<div className="flex justify-between">
				<Tablefilter fundType={true} setSelect={(e) => setFund(e)} />
				<div className="flex justify-end">
					<button className="btn btn-sm btn-warning" onClick={downloadExcel}>
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
							<th>Premise</th>
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
										.filter((coupon) => coupon.fund_id === +fund)[0]
										?.balance.toFixed(2)}
								</td>
								<td></td>
								<td>
									<BtnSuspend
										active={d.user.is_active}
										onClick={() => onSuspend(d.user_id, d.user.is_active)}
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

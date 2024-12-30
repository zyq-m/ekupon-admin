import dayjs from "dayjs";

export default function TransactionTable({ data, cafe }) {
	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th>{cafe ? "Sender" : "Recipient"}</th>
						<th>Date</th>
						<th>Amount (RM)</th>
					</tr>
				</thead>
				<tbody>
					{data?.transactions?.map((d, i) => (
						<tr className="hover" key={d.id}>
							<th>{i + 1}</th>
							<td>
								{cafe
									? `${d.student.name} (${d.student.matric_no})`
									: d.cafe.cafe_name}
							</td>
							<td>
								{dayjs(d.timestamp).format("DD/MM/YYYY hh:mma")}
							</td>
							<td>{d.amount?.toFixed(2)}</td>
						</tr>
					))}
					{data?.summary && (
						<tr className="font-bold">
							<td colSpan="2"></td>
							<td>Total</td>
							<td>{data.summary?.totalAmount?.toFixed(2)}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

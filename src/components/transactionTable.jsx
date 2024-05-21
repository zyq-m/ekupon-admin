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
          {data.data?.map((d, i) => {
            return (
              <>
                <tr className="hover" key={d.id}>
                  <th>{i + 1}</th>
                  <td>
                    {cafe
                      ? `${d.transaction.student.user.profile.name} (${d.transaction.matricNo})`
                      : d.transaction.cafe.name}
                  </td>
                  <td>
                    {dayjs(d.transaction.createdOn).format("DD/MM/YYYY hh:mma")}
                  </td>
                  <td>{d.amount}</td>
                </tr>
              </>
            );
          })}
          {data?.summary && (
            <tr>
              <td colSpan="2"></td>
              <td>Total</td>
              <td>{data.summary?._sum.amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

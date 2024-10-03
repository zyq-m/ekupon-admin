import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, BtnSuspend, Loading } from "../../components";

import { api } from "../../services/axios";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function CafeData() {
    const [cafe, setCafe] = useState([]);

    const downloadQR = async () => {
        try {
            const res = await api.get("/admin/qr", { responseType: "blob" });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", "Cafe_QR_Code.zip");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        api.get("/admin/cafe")
            .then((res) => {
                setCafe(res.data.cafe);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!cafe.length) {
        return (
            <Layout title="Cafe data">
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout title="Cafe data">
            <div className="overflow-x-auto">
                <div className="flex justify-end">
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={downloadQR}
                    >
                        <FileDownloadOutlinedIcon />
                        Download QR
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cafe Name</th>
                            <th>Owner</th>
                            <th>Account No.</th>
                            <th>Bank Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cafe?.map((d, i) => {
                            return (
                                <>
                                    <tr className="hover" key={d.id}>
                                        <th>{i + 1}</th>
                                        <td>{d.name}</td>
                                        <td>{d.user.profile.name}</td>
                                        <td>{d.accountNo || "N/A"}</td>
                                        <td>{d.bank || "N/A"}</td>
                                        <td>
                                            <BtnSuspend
                                                active={d.user.active}
                                                userId={d.userId}
                                            />
                                        </td>
                                        <td>
                                            <Link
                                                to={`transaction/${d.id}`}
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
        </Layout>
    );
}

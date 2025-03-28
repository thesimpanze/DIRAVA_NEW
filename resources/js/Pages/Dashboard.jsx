import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/id";


import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function Dashboard({ speedDetection }) {
    const [isConfirmDataDeletion, setIsConfirmDataDeletion] = useState(false);
    useEffect(() => {
        if (!speedDetection) {
            Inertia.get("/showSpeed");
        }

        return;
    }, []);
    const chartData =
        speedDetection?.map((item) => ({
            time: moment(item.timestamp).format("HH.mm DD/MM"),
            kecepatan: item.last_speed,
            batas: item.speed_limit,
        })) || [];
    console.log("data wdwa:", speedDetection);
    const closeModal = () => {
        setIsConfirmDataDeletion(false);

        
    };
    const confirmDataDeletion = () => {
        setIsConfirmDataDeletion(true);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg outline bg-white">
                        <div className="p-6 w-full">
                            <h1 className=" text-center font-bold mb-8 mt-2 text-2xl">
                                Grafik Kecepatan
                            </h1>
                            <div className="flex flex-col gap-8 mx-1 md:flex-row md:flex">
                                <div className="md:w-1/2 h-[400px] shadow-[7px_7px_0_0_rgba(0,0,0,1)] p-4 rounded-xl outline">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="time"
                                                label={{
                                                    value: "Waktu",
                                                    position: "insideBottom",
                                                    offset: -5,
                                                }}
                                            />
                                            <YAxis
                                                label={{
                                                    value: "Kecepatan (km/h)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip />
                                            <Legend />
                                            <Area
                                                type="monotone"
                                                dataKey="kecepatan"
                                                stroke="#000000"
                                                fill="#00000"
                                                name="Kecepatan"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="batas"
                                                stroke="#dc2626"
                                                fill="rgba(0,0,0,0)"
                                                name="Batas Kecepatan"
                                                strokeWidth={2}
                                                strokeDasharray="5 5"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="md:w-1/2 h-[400px] shadow-[7px_7px_0_0_rgba(0,0,0,1)] p-4 rounded-xl outline">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="time"
                                                label={{
                                                    value: "Waktu",
                                                    position: "insideBottom",
                                                    offset: -5,
                                                }}
                                            />
                                            <YAxis
                                                label={{
                                                    value: "Kecepatan (km/h)",
                                                    angle: -90,
                                                    position: "insideLeft",
                                                }}
                                            />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="kecepatan"
                                                fill="#000000"
                                                name="Kecepatan"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <h1 className="m-3 mt-10 text-3xl font-bold text-center">
                            History
                        </h1>
                        <div className="p-4 min-h-screen mx-3">
                            {speedDetection && speedDetection.length > 0 ? (
                                <div className="overflow-x-auto bg-white rounded-lg shadow-[7px_7px_0_0_rgba(0,0,0,1)]">
                                    <table className="w-full table-auto border-collapse border border-gray-200">
                                        <thead className=" bg-slate-950 text-white">
                                            <tr>
                                                <th className="px-4 py-2 border border-black text-left">
                                                    Kecepatan
                                                </th>
                                                <th className="px-4 py-2 border border-black text-left">
                                                    Speed Limit
                                                </th>
                                                <th className="px-4 py-2 border border-black text-left">
                                                    Tanggal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {speedDetection.map((item, i) => (
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50 hover:bg-gray-100"
                                                >
                                                    <td className="px-4 py-2 border border-black">
                                                        {item.last_speed} Km/H
                                                    </td>
                                                    <td className="px-4 py-2 border border-black">
                                                        {item.speed_limit} Km/H
                                                    </td>
                                                    <td className="px-4 py-2 border border-black">
                                                        {moment(
                                                            item.timestamp
                                                        ).format(
                                                            "HH:mm DD MMMM YYYY"
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 mt-4">
                                    Belum ada orang lewat
                                </div>
                            )}
                            <div className=" text-right mt-8">
                                <DangerButton  onClick={confirmDataDeletion}> 
                                    Delete All
                                </DangerButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isConfirmDataDeletion} onClose={closeModal}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Delete All Data
                    </h2>
                    <p className="mb-4">
                        Apakah anda yakin ingin menghapus semua data? 
                    </p>
                    <div className="flex justify-end">
                        <DangerButton
                            href={route("deleteAll")}
                            method="post"
                            as="button"
                            className="mr-2"
                        >
                            Iya
                        </DangerButton>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 "
                        >
                            Tidak
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

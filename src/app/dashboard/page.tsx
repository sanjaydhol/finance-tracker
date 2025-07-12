"use client";
import { useEffect, useState } from "react";
import { getEntities } from "../../firestoreHelpers";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expenseStats, setExpenseStats] = useState({
    total: 0,
    pandal: 0,
    idol: 0,
    food: 0,
    lighting: 0,
  });
  const [earningStats, setEarningStats] = useState({
    total: 0,
    donation: 0,
    sponsorship: 0,
    ticket: 0,
    others: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const expData = await getEntities("expenses");
    setExpenses(expData);
    let total = 0,
      pandal = 0,
      idol = 0,
      food = 0,
      lighting = 0;
    expData.forEach((exp: any) => {
      total += exp.amount || 0;
      if (exp.category === "pandal") pandal += exp.amount || 0;
      if (exp.category === "idol") idol += exp.amount || 0;
      if (exp.category === "food") food += exp.amount || 0;
      if (exp.category === "lighting") lighting += exp.amount || 0;
    });
    setExpenseStats({ total, pandal, idol, food, lighting });

    const earnData = await getEntities("earnings");
    setEarnings(earnData);
    let etotal = 0,
      donation = 0,
      sponsorship = 0,
      ticket = 0,
      others = 0;
    earnData.forEach((e: any) => {
      etotal += e.amount || 0;
      if (e.source === "Donation") donation += e.amount || 0;
      if (e.source === "Sponsorship") sponsorship += e.amount || 0;
      if (e.source === "Ticket") ticket += e.amount || 0;
      if (e.source === "Others") others += e.amount || 0;
    });
    setEarningStats({ total: etotal, donation, sponsorship, ticket, others });
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 min-h-screen">
        <div className="text-2xl font-bold mb-8 tracking-tight text-gray-800">
          Finance Tracker
        </div>
        <nav className="flex flex-col gap-2">
          <a
            href="/dashboard"
            className="rounded-lg px-4 py-2 text-gray-800 font-medium bg-gray-100"
          >
            Dashboard
          </a>
          <a
            href="/record-earning"
            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Record Earning
          </a>
          <a
            href="/admin"
            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Admin
          </a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
        {/* Earnings Stats */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Earnings Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Total Earnings</div>
              <div className="text-2xl font-bold text-gray-800">
                ₹{earningStats.total.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Donation</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{earningStats.donation.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Sponsorship</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{earningStats.sponsorship.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Ticket</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{earningStats.ticket.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Others</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{earningStats.others.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        {/* Expenses Stats */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Expenses Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Total Expenses</div>
              <div className="text-2xl font-bold text-gray-800">
                ₹{expenseStats.total.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Pandal</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{expenseStats.pandal.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Idol</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{expenseStats.idol.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Food</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{expenseStats.food.toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Lighting</div>
              <div className="text-xl font-semibold text-gray-700">
                ₹{expenseStats.lighting.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        {/* Earnings Table */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            All Earnings
          </h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Source</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Payment Method</th>
                  <th className="py-2 px-3">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">
                      {e.date
                        ? new Date(
                            e.date.seconds
                              ? e.date.seconds * 1000
                              : e.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-3">₹{e.amount}</td>
                    <td className="py-2 px-3">{e.source}</td>
                    <td className="py-2 px-3">{e.description}</td>
                    <td className="py-2 px-3">{e.paymentMethod}</td>
                    <td className="py-2 px-3">{e.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Expenses Table */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            All Expenses
          </h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Category</th>
                  <th className="py-2 px-3">Vendor</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">
                      {exp.date
                        ? new Date(
                            exp.date.seconds
                              ? exp.date.seconds * 1000
                              : exp.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-3">₹{exp.amount}</td>
                    <td className="py-2 px-3">{exp.category}</td>
                    <td className="py-2 px-3">{exp.vendor}</td>
                    <td className="py-2 px-3">{exp.description}</td>
                    <td className="py-2 px-3">{exp.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

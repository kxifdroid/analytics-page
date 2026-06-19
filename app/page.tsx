'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type Period = 'daily' | 'weekly' | 'monthly'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('monthly')
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 7)) // August 2026

  // Mock data for different periods
  const getChartData = () => {
    if (period === 'monthly') {
      return [
        { range: '1-3', value: 12935 },
        { range: '4-10', value: 18570 },
        { range: '11-17', value: 17103 },
        { range: '18-24', value: 16990 },
        { range: '25-31', value: 18299 },
      ]
    }
    return [
      { range: 'Mon', value: 8500 },
      { range: 'Tue', value: 12000 },
      { range: 'Wed', value: 9800 },
      { range: 'Thu', value: 14200 },
      { range: 'Fri', value: 16800 },
      { range: 'Sat', value: 18500 },
      { range: 'Sun', value: 15600 },
    ]
  }

  const getTotalRevenue = () => {
    if (period === 'monthly') return '₹33,697'
    if (period === 'weekly') return '₹8,945'
    return '₹1,234'
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="text-white hover:opacity-90">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold text-white">Analytics</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-md space-y-4 px-4 pt-6">
        {/* Period Selector */}
        <div className="flex gap-3">
          {(['daily', 'weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 rounded-full py-2 px-4 font-bold transition-colors ${
                period === p
                  ? 'bg-orange-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Period Navigator */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
          <button onClick={prevMonth} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <span className="font-bold">{monthName}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button onClick={nextMonth} className="text-gray-600 hover:text-gray-900">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Hero Stat Block */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <div className="mt-3 flex items-baseline justify-between">
            <h2 className="text-4xl font-bold text-gray-900">{getTotalRevenue()}</h2>
            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              ↑ +12% vs last month
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-gray-900">
            {period === 'monthly' ? `${monthName} Breakdown` : 'Weekly Breakdown'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="range"
                tick={{ fill: '#999', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Bar
                dataKey="value"
                fill="#dc2626"
                radius={[8, 8, 0, 0]}
                onClick={(data) => console.log(data)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border-l-4 border-orange-600 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="text-2xl">📊</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">783</p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-l-4 border-blue-600 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="text-2xl">⏱️</div>
              <div>
                <p className="text-xl font-bold text-gray-900">362:15</p>
                <p className="text-xs text-gray-500">Time on Order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Breakdown */}
        <div className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900">BREAKDOWN</h3>

          {/* Order Earnings Row */}
          <BreakdownRow label="Order earnings" value="₹27,812" />

          {/* Subtypes */}
          <div className="space-y-2 border-t border-gray-100 pt-3">
            <BreakdownSubitem label="Dine-in" percentage={45} />
            <BreakdownSubitem label="Delivery" percentage={35} />
            <BreakdownSubitem label="Pickup" percentage={20} />
          </div>
        </div>

        {/* Top Dishes */}
        <div className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400">TOP DISHES</h3>
          <TopDishRow rank={1} name="Margherita Pizza" orders={156} revenue="₹6,240" />
          <TopDishRow rank={2} name="Grilled Chicken" orders={128} revenue="₹5,120" />
          <TopDishRow rank={3} name="Caesar Salad" orders={97} revenue="₹2,910" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-around px-4 py-3">
          <NavItem icon="📋" label="Orders" active={false} />
          <NavItem icon="🏪" label="My Store" active={false} />
          <NavItem icon="👤" label="Profile" active={false} />
        </div>
      </div>
    </div>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

function BreakdownRow({ label, value }: { label: string; value: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full flex items-center justify-between rounded-lg hover:bg-gray-50 py-2"
    >
      <span className="font-semibold text-gray-900">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-900">{value}</span>
        <ChevronDownSmall expanded={expanded} />
      </div>
    </button>
  )
}

function BreakdownSubitem({ label, percentage }: { label: string; percentage: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2 flex-1 ml-4">
        <div className="h-2 flex-1 rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-orange-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-600 w-8 text-right">{percentage}%</span>
      </div>
    </div>
  )
}

function TopDishRow({
  rank,
  name,
  orders,
  revenue,
}: {
  rank: number
  name: string
  orders: number
  revenue: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
          {rank}
        </div>
        <span className="text-sm font-semibold text-gray-900">{name}</span>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">{revenue}</p>
        <p className="text-xs text-gray-500">{orders} orders</p>
      </div>
    </div>
  )
}

function ChevronDownSmall({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-gray-600 transition-transform ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

function NavItem({ icon, label, active }: { icon: string; label: string; active: boolean }) {
  return (
    <button className="flex flex-col items-center gap-1 py-2 px-4">
      <span className="text-xl">{icon}</span>
      <span className={`text-xs font-medium ${active ? 'text-orange-600' : 'text-gray-600'}`}>
        {label}
      </span>
    </button>
  )
}

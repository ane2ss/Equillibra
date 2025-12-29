"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
  { department: "Informatics", count: 145 },
  { department: "Economics", count: 112 },
  { department: "Physics", count: 95 },
  { department: "Law", count: 88 },
  { department: "Arts", count: 64 },
]

const COLORS = ["#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE", "#E0E7FF"]

export function SalesMultiLine() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
          <XAxis type="number" hide />
          <YAxis
            dataKey="department"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "currentColor", fontSize: 12, fontWeight: 600 }}
            className="text-muted-foreground"
            width={90}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

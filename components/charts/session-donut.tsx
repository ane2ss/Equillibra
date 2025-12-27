"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Informatics", value: 450, color: "#6366F1" },
  { name: "Economics", value: 300, color: "#818CF8" },
  { name: "Physics", value: 200, color: "#A5B4FC" },
  { name: "Law", value: 150, color: "#C7D2FE" },
]

export function SessionDonut() {
  return (
    <div className="h-[250px] w-full relative flex flex-col items-center">
      <div className="h-[180px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* <CHANGE> Fixed center text to use dark mode semantic tokens */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">Total</span>
          <span className="text-sm text-muted-foreground">1,100</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full px-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            {/* <CHANGE> Fixed legend text to use dark mode tokens */}
            <span className="text-[11px] text-muted-foreground font-semibold truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

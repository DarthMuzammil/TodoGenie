'use client';

import { useState } from 'react';

export default function CalendarPage() {
  const [currentMonth] = useState(new Date());

  // Helper function to get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Helper function to get day of week (0-6)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Calendar View</h1>
        <div className="text-xl font-semibold">
          {monthName} {year}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center font-semibold">
            {day}
          </div>
        ))}

        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-4 border bg-gray-50" />
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div
            key={index + 1}
            className="p-4 border hover:bg-gray-50 cursor-pointer min-h-[100px]"
          >
            <div className="font-semibold mb-2">{index + 1}</div>
            {/* Placeholder for todo items */}
            <div className="text-sm text-gray-600">No tasks</div>
          </div>
        ))}
      </div>
    </div>
  );
} 
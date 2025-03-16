export interface TodoCommand {
  action: 'create' | 'update' | 'delete' | 'complete' | 'list';
  title?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}

export function parseVoiceCommand(transcript: string): TodoCommand | null {
  const text = transcript.toLowerCase().trim();

  // Create task
  if (text.includes('add') || text.includes('create') || text.includes('new task')) {
    const command: TodoCommand = { action: 'create' };
    
    // Extract title
    const titleMatch = text.match(/(?:add|create|new task) (.*?)(?:for|by|due|$)/);
    if (titleMatch) {
      command.title = titleMatch[1].trim();
    }

    // Extract due date
    const dateMatch = text.match(/(?:for|by|due) (tomorrow|today|next week|next month|\d{1,2}(?:st|nd|rd|th)?(?:\s+of\s+)?(?:january|february|march|april|may|june|july|august|september|october|november|december)?)/i);
    if (dateMatch) {
      command.dueDate = parseDateFromText(dateMatch[1]);
    }

    // Extract priority
    if (text.includes('high priority')) {
      command.priority = 'high';
    } else if (text.includes('medium priority')) {
      command.priority = 'medium';
    } else if (text.includes('low priority')) {
      command.priority = 'low';
    }

    return command;
  }

  // Complete task
  if (text.includes('complete') || text.includes('mark as done') || text.includes('finish')) {
    const titleMatch = text.match(/(?:complete|mark as done|finish) (.*?)(?:$)/);
    return {
      action: 'complete',
      title: titleMatch ? titleMatch[1].trim() : undefined
    };
  }

  // Delete task
  if (text.includes('delete') || text.includes('remove')) {
    const titleMatch = text.match(/(?:delete|remove) (.*?)(?:$)/);
    return {
      action: 'delete',
      title: titleMatch ? titleMatch[1].trim() : undefined
    };
  }

  // List tasks
  if (text.includes('list') || text.includes('show') || text.includes('what are my tasks')) {
    return { action: 'list' };
  }

  return null;
}

function parseDateFromText(dateText: string): Date {
  const today = new Date();
  dateText = dateText.toLowerCase();

  if (dateText === 'today') {
    return today;
  }

  if (dateText === 'tomorrow') {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  if (dateText === 'next week') {
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  }

  if (dateText === 'next month') {
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  }

  // Try to parse specific date
  const date = new Date(dateText);
  return isNaN(date.getTime()) ? today : date;
} 
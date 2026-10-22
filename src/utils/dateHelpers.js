export function timeAgo(dateString) {
  const minutes = Math.floor((Date.now() - new Date(dateString)) / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function isToday(dateString) {
  return new Date(dateString).toDateString() === new Date().toDateString();
}

export function isYesterday(dateString) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(dateString).toDateString() === yesterday.toDateString();
}

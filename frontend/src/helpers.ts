const TIMESTAMP_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})
export const formatTimestamp = (timestamp: string) => {
  return TIMESTAMP_FORMAT.format(new Date(timestamp))
}

import dayjs from 'dayjs'
export const getCurrentTimestamp = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

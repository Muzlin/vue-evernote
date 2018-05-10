/* *****
 *  通用工具包
 */

export function friendlyDate(dateStr) {
  let str = ''
  // 转换时间对象
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  // 转换时间戳
  let time = dateObj.getTime()
  // 当前时间
  let nowTime = Date.now()
  // 差值
  let difTime = nowTime - time
  // 判断时间范围
  switch (true) {
    case difTime < 1000 * 60:
      str = '刚刚'
      break
    case difTime < 1000 * 60 * 60:
      str = `${Math.floor(difTime/(1000*60))}分钟前`
      break
    case difTime < 1000 * 60 * 60 * 24:
      str = `${Math.floor(difTime/(1000*60*60))}小时前`
      break
    default:
      str = `${Math.floor(difTime/(1000*60*60*24))}天前`
      break
  }
  return str
}

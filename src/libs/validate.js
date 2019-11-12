/**
 * validate 含0正数 但大于或等于0.01
 * @param num
 * @returns {boolean}
 */
export function checkNumber(rule, value, callback) {
    const reg = /^(([1-9][0-9]*)|0|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入数值'))
    }
  }
  /**
   * validate 正整数验证 包括0
   * @param num
   * @returns {boolean}
   */
  export function checkInteger(rule, value, callback) {
    const reg = /^(0|[1-9][0-9]*)$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正整数'))
    }
  }
  
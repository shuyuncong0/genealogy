import CryptoJS from 'crypto-js/crypto-js'

/**
 * CryptoJS加密
 */
var encrypt = function(data) {
  let key = CryptoJS.enc.Utf8.parse('F8DA501C654257CD') // 加密秘钥
  let iv = CryptoJS.enc.Utf8.parse('B99657160E15F1B0') //  矢量
  var srcs = CryptoJS.enc.Utf8.parse(data)
  let encryptResult = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7
    padding: CryptoJS.pad.ZeroPadding // 后台用的是pad.Pkcs5,前台对应为Pkcs7
  })
  let ResultData = {
    data: encryptResult.toString()
  }
  // Base64加密再 encode;
  // return CryptoJS.enc.Base64.stringify(encryptResult.ciphertext)
  return ResultData
}
/**
 * CryptoJS解密
 */
var decrypt = function(data) {
  let key = CryptoJS.enc.Utf8.parse('F8DA501C654257CD') // 加密秘钥
  let iv = CryptoJS.enc.Utf8.parse('B99657160E15F1B0') //  矢量
  let base64 = CryptoJS.enc.Base64.parse(data)
  let src = CryptoJS.enc.Base64.stringify(base64)
  let decryptResult = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  // return decryptResult.toString(CryptoJS.enc.Utf8).toString()

  return CryptoJS.enc.Utf8.stringify(decryptResult)
}
/**
 * String 转 hash
 * @param {*} str
 */
var strToHexCharCode = function(str) {
  if (str === '') return ''
  var hexCharCode = []
  hexCharCode.push('0x')
  for (var i = 0; i < str.length; i++) {
    hexCharCode.push(str.charCodeAt(i).toString(16))
  }
  return hexCharCode.join('')
}

export default {
  encrypt,
  decrypt,
  strToHexCharCode
}

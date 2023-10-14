export function naturalCheck(el){ // 자연수(문자열포함)인지 체크
  // false 예시: undefined, null, NaN, 0, -1, '+10', '', 'adff'
  // true 예시: 10, '12'
  if(typeof el == 'number' && el>0){
    return true
  } else if(typeof el == 'string' && el!='' && /^[0-9]*$/.test(el)){
    return true
  } else {
    return false
  }
}
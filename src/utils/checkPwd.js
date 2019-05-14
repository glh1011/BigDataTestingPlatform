export default function checkStrong(sValue) {
  var modes = 0;
  //正则表达式验证符合要求的
  if (sValue.length < 1) return modes;
  if (/\d/.test(sValue)) modes++; //数字
  if (/[a-z]/.test(sValue)) modes++; //小写
  if (/[A-Z]/.test(sValue)) modes++; //大写  
  if (/\W/.test(sValue)) modes++; //特殊字符
  
  var strong;
 //逻辑处理
  switch (modes) {
      case 1:
        strong = 1;
        break;
      case 2:
        strong = 2;
        break;
      case 3:
        strong = 3;
        break;
      case 4:
        strong = 4;
        break;
  }
  return strong;
}
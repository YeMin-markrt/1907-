function setCookie(key, value, day, path = "/") {
  if (day) {
      var date = new Date();
      date.setDate(date.getDate() + day);  
      document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString() + ";path=" + path;
  } else {  
      document.cookie = key + "=" + encodeURIComponent(value) + ";path=" + path;
  }
 }
 
 function getCookie(key) { 
  var cookie = document.cookie;
 
  if (cookie) {  
      var dataList = cookie.split("; ");
      for (var i = 0; i < dataList.length; i++) {
          var item = dataList[i]; 
          var name = item.split("=")[0];  
          var val = item.split("=")[1];  
          if (name == key) {
              return decodeURIComponent(val);
          }
      }
  }
  return ""; 
 }
 
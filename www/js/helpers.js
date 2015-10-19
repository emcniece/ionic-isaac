var ionBos = ionBos || {};

 ionBos.helpers = {
   isNotString: function(str) {
     return (typeof str !== "string");
   },
   pad: function(num, size){
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }
 };
import $ from 'jquery';

 function component() {
   const element = $('<div>');
   element.innerHTML  = "TEST FROM WEBPACK";
   element.addClass = "hello";
   return element[0];
 }


console.log(component());

 document.body.appendChild(component());



 
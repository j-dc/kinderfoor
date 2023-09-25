import $ from 'jquery';

 function component() {
   const element = $('div');
   element.innerHTML  = "TEST FROM WEBPACK";
   return element;
 }

 document.body.appendChild(component());

 
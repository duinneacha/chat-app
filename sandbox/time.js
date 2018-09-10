// The Unix Epic - 1st January, 1970 00:00:00am - when the time counter started

const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth()); // -- date month starts at 0


const createdAt = new Date().getTime();

const date = moment(createdAt);
console.log(date.format('h:mm a'));


const someTimeStamp = moment().valueOf();
console.log(someTimeStamp);




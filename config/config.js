// module.exports = {
//     baseURL: 'http://jwt.dealyug.com/applestore',
//     loginURL: 'http://jwt.dealyug.com/applestore/login',
//     myOrdersURL: 'http://jwt.dealyug.com/applestore/myorders?page=1'
// };

require('dotenv').config();

module.exports = {
    baseURL: process.env.BASE_URL,
    loginURL: process.env.LOGIN_URL,
    myOrdersURL: process.env.MY_ORDERS_URL
};
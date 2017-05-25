'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});
var apiPreFix = 'http://wechat.aibaojia.net/'; // 
var API = {
      login: apiPreFix + "quote/init",
      announcement: apiPreFix + 'announcement/getLatest',
      getBarcode: apiPreFix + "common/login/getQRcodePng",
      logout: apiPreFix + "common/logout",
      productIndex: apiPreFix + 'product/index',
      productAdd: apiPreFix + 'product/add',
      productEdit: apiPreFix + 'product/update',
      productDel: apiPreFix + 'product/delete',
      productBatchDel: apiPreFix + 'product/deleteBatch',
      productSort: apiPreFix + 'product/sort',
      productDownload: apiPreFix + 'product/download',
      productLog: apiPreFix + 'product/log',
      productExport: apiPreFix + 'product/export',
      clearData: apiPreFix + 'productTag/deleteAll',
      productDownloadTemplate: apiPreFix + 'images/aibaojia.csv',
      productUpload: apiPreFix + 'product/upload',
      productTagIndex: apiPreFix + 'productTag/index',
      productTagAdd: apiPreFix + 'productTag/add',
      productTagEdit: apiPreFix + 'productTag/update',
      productTagDel: apiPreFix + 'productTag/delete',
      productTagBatchDel: apiPreFix + 'productTag/deleteBatch',
      productTagSort: apiPreFix + 'productTag/sort',
      productTag: apiPreFix + 'productTag/all',
      customerIndex: apiPreFix + 'clientUser/index',
      customerEdit: apiPreFix + 'clientUser/update',
      customerDel: apiPreFix + 'clientUser/delete',
      customerBatchDel: apiPreFix + 'clientUser/deleteBatch',
      customerBatchLevel: apiPreFix + 'clientUser/batchUpdateClientLevel',
      customerSort: apiPreFix + 'clientUser/sort',
      userIndex: apiPreFix + 'userInfo/index',
      companyEdit: apiPreFix + 'company/update',
      userEdit: apiPreFix + 'userInfo/update',
      addaccountIndex: apiPreFix + 'company/searchUser',
      addaccountAdd: apiPreFix + 'company/addUserToCompany',
      accountIndex: apiPreFix + 'company/users',
      accountEdit: apiPreFix + 'company/setAdmin',
      accountDel: apiPreFix + 'company/outCompany',
      sendAllMes: apiPreFix + 'pushMessage/push'
};
exports.API = API;
exports.default = API;
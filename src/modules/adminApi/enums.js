import enumsGlobal from "../enumsGlobal";
const enums = {
  ...enumsGlobal,
  ...{

    ErpCustomerPurchaseType : {
            Consignee: 1, // Konsinye
            Purchasing: 2, // Satın Alma
    },
    ErpMainRoleAction : {
            Allow: 1, // 
            Block: 2, // 
    },
    FirmParams : {
            FinLocalCurrency: 1, // 
    },
    AdminUserTheme : {
            Light: 1, // 
            Dark: 2, // 
    },
    StatType : {
            Line: 1, // 
            Buble: 2, // 
            Doughnut: 3, // 
            Bar: 4, // 
            HorizontalBar: 5, // 
            Polar: 6, // 
            Radar: 7, // 
            Scatter: 8, // 
            Pie: 9, // 
            Box: 10, // 
            List: 11, // 
    },
  }
}
export default enums
import enumsGlobal from "../enumsGlobal";
const enums = {
  ...enumsGlobal,
  ...{

    AdminRoleAction : {
            Allow: 1, // 
            Block: 2, // 
    },
    AdminUserTheme : {
            Light: 1, // 
            Dark: 2, // 
    },
  }
}
export default enums
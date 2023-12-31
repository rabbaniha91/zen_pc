import { body } from "express-validator";

const registerValidator = () => {
  return [
    body("firstName")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .isLength({ min: 3 })
      .withMessage("نام باید حداقل سه حرف باشد.")
      .matches(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/)
      .withMessage("نام باید فقط شامل حروف فارسی باشد."),
    body("lastName")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .isLength({ min: 3, max: 20 })
      .withMessage("نام خانوادگی نباید کمتر از سه و بیشتر از بیست حرف باشد.")
      .matches(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/)
      .withMessage("نام خانوادگی باید فقط شامل حروف فارسی باشد."),
    body("email")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .isEmail()
      .withMessage("ایمیل دارای فرمت صحیح نیست."),
    body("mobileNumber")
      .isMobilePhone("fa-IR")
      .withMessage("شماره همراه معتبر نیست."),
    body("password")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .isLength({ min: 8 })
      .withMessage("رمز عبور باید حداقل دارای هشت کاراکتر باشد.")
      .isStrongPassword()
      .withMessage("رمز عبور به اندازه کافی قوی نیست."),
  ];
};

export default registerValidator;

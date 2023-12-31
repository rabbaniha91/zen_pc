import {body} from "express-validator"

const loginValidator = () => {
    return [
      body("email")
        .not()
        .isEmpty()
        .withMessage("لطفا فیلد های ضروری را پر کنید.")
        .isEmail()
        .withMessage("ایمیل دارای فرمت صحیح نیست."),
      body("password")
        .not()
        .isEmpty()
        .withMessage("لطفا فیلد های ضروری را پر کنید.")
        .isLength({ min: 8 })
        .withMessage("رمز عبور باید حداقل دارای هشت کاراکتر باشد."),
    ];
}

export default loginValidator
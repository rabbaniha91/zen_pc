import { body } from "express-validator";
import { states } from "../../client/src/data/iransStatesAndCities.js";

const addressValidator = () => {
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
    body("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .isMobilePhone("fa-IR")
      .withMessage("شماره همراه معتبر نیست."),
    body("provinceName")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .matches(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/)
      .withMessage("نام استان باید فقط شامل حروف فارسی باشد.")
      .isIn(states, "name")
      .withMessage("نام استان معتبر نیست."),
    body("cityName")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .matches(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/)
      .withMessage("نام شهر باید فقط شامل حروف فارسی باشد."),
    body("address")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .matches(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیء]+$/)
      .withMessage("آدرس باید فقط شامل حروف فارسی باشد."),
    body("postalCode")
      .not()
      .isEmpty()
      .withMessage("لطفا فیلد های ضروری را پر کنید.")
      .isLength({ min: 10, max: 10 })
      .withMessage("لطفا کدپستی ده رقمی را وارد نمائید."),
    body("province").not().isEmpty().withMessage("لطفا استان را مشخص نمائید."),
    body("city").not().isEmpty().withMessage("لطفا شهر را مشخص نمائید."),
  ];
};

export default addressValidator;

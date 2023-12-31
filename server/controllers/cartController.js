class CartController {
  constructor() {}

  static async saveCartItems(req, res) {
    try {
      console.log("Body: ",req.body);
      let prevItems = req.session.cartItems
      console.log("Prev : ", prevItems );
      req.session.cartItems = []
      if(prevItems) req.session.cartItems = [...prevItems]
      req.session.cartItems.push(req.body.items);
      await req.session.save()
      console.log("Session: ",req.session.cartItems);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default CartController;

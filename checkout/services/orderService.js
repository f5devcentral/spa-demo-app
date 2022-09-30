const checkoutService = {
  createOrder() {
    return this.generateOrderId();
  },

  generateOrderId() {
    let id = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 10; i++) {
      id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return id;
  }
}

export default checkoutService;

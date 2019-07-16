export default class Index {
  static index(req, res) {
    res.render("default", {
      title: "Node commerce",
      message: "Welcome to Node Commerce project :)",
      currentPath: req.baseUrl
    });
  }
}

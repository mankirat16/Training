const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => {
  res.send("helo");
});
module.exports = router;

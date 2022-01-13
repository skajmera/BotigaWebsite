const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");
const { authenticateToken } = require("../utils/jwt");       
const router = express.Router();
const customerController = require("../controller/customerController");

router.post("/signup", async (req, res) => {
  const result = await customerController.createCustomer(req);
  return res.send(result);
});

router.get("/getUser", authenticateToken, async (request, response) => {
  const result = await customerController.getCustomer(request);
  return response.json(result);
});

router.post("/login", async (req, res) => {
  const result = await customerController.loginCustomer(req);
  return res.json(result);
});

router.put("/updateProfile", authenticateToken, async (req, res) => {
  const result = await customerController.updateCustomer(req);
  return res.json(result);
});

router.put("/updatePassword", authenticateToken, async (req, res) => {
  const result = await customerController.updatePassword(req);
  return res.send(result);
});

router.post("/invite/signup",authenticateToken, async (req, res) => {
  const result = await customerController.createCustomerByLink(req);
  return res.send(result);
});

router.put("/upload",
  authenticateToken,
  upload.single("attachments"),
  async (req, res) => {
    const result = await customerController.uploadImage(req);
    return res.send(result);
  }
);

router.put("/forgetPassword", async (req, res) => {
  const result = await customerController.forgotPassword(req);
  return res.send(result);
});

router.put("/emailVerified", async (req, res) => {
  const result = await customerController.verifyEmail(req);
  return res.send(result);
});

router.put("/resetPassword", async (req, res) => {
  const result = await customerController.resetPassword(req);
  return res.send(result);
});

router.get("/resetPassword/:_id", customerController.getId);

router.get("/getAll", async (req, res) => {
  const result = await customerController.getAllCustomer(req);
  return res.send(result);
});

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/", (req, res) => {
  return res.json({ message: "You are not logged in" });
});

router.get("/failed", (req, res) => {
  return res.send("Failed");
});

router.get("/success", isLoggedIn, async (req, res) => {
  const result = await customerController.success(req, res);
  res.send(result);
});

router.get(
  "/loginWith/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/failed",
  }),
  function (req, res) {
    res.redirect("/users/success");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/users");
});

module.exports = router;

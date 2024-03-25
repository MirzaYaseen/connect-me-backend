var express = require("express");

var router = express.Router();

const serviceController = require("../controller/serviceController");

router
  .route("/addService")
  .post( serviceController.addService, serviceController.createService);

// router.route("/downloadService").post(serviceController.downloadServices);

router.route("/getServiceProvider").post(serviceController.getServiceProvider);
router
  .route("/getServiceByCategory")
  .post(serviceController.getServiceByCategory);
  router.route("/deleteService/:id").delete(serviceController.deleteService);

module.exports = router;

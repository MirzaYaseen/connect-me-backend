const service = require("../models/servicesModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const fs = require("fs");
// const path = require("path");
// exports.addservice = factory.createOne(service);
exports.deleteService = factory.deleteOne(service);
// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});



const upload = multer({ storage });

exports.addService = upload.single("pdfFile");

exports.createService = async (req, res, next) => {
  const { takerName, serviceDescription, refOfUser, category, ServiceProviderName, price, serviceName } =
    req.body;

  try {
    const newService = new service({
      takerName,
      serviceDescription,
      refOfUser,
      category,
      ServiceProviderName,
      price,
      serviceName,
      // PdfLocation: req.file.path, 
    });
    const doc = await newService.save();
    res.status(201).json({
      status: "success",

      data: {
        doc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getServiceProvider = async (req, res, next) => {
  try {
    const providedService = await service.find({
      refOfUser: req.body.id,
    });

    // for (const service of providedService) {
    //   const pdfFileName = service.PdfLocation;
    //   const filePath = path.join(__dirname, "..", pdfFileName);

    //   // Read the PDF file data and store it in the service object
    //   const pdfData = fs.readFileSync(filePath);
    //   service.pdfData = pdfData;
    //   console.log("PDF Data Size:", pdfData.length);
    // }

    res.status(200).json({
      status: "success",

      message: "Service get successfully",
      data: providedService,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getServiceByCategory = async (req, res, next) => {
  try {
    const SelectedCategoryService = await service.find({
      category: { $in: req.body.category },
    });

    res.status(200).json({
      status: "success",

      message: "Service get successfully",
      data: SelectedCategoryService,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.downloadServices = async (req, res, next) => {
//   const fileName = req.body.pdfFileName;
//   const filePath = path.join(__dirname, "..", fileName);

//   res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
//   res.setHeader("Content-Type", "application/pdf");

//   // Send the file as a stream
//   const fileStream = fs.createReadStream(filePath);
//   fileStream.pipe(res);
// };

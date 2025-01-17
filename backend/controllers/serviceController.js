const Service = require('../models/Service');
const Submission = require('../models/Submission');

// Fetch all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    console.log(services)
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// Submit data for a specific service
exports.submitServiceData = async (req, res) => {
    const { serviceId } = req.params;
    const submittedData = req.body;
  
    try {
      // Fetch the service configuration
      const service = await Service.findOne({ id: serviceId });
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Validate submitted data against required_fields
      for (const field of service.required_fields) {
        const value = submittedData[field.name];
  
        // Check if the field is required and missing
        if (!value) {
          return res.status(400).json({
            message: `Validation error: ${field.label.en} is required`,
          });
        }
  
        // Validate using regex (if applicable)
        if (field.validation && !new RegExp(field.validation).test(value)) {
          return res.status(400).json({
            message: `Validation error: Invalid value for ${field.label.en}`,
          });
        }
  
        // Check max_length (if applicable)
        if (field.max_length && value.length > field.max_length) {
          return res.status(400).json({
            message: `Validation error: ${field.label.en} exceeds max length`,
          });
        }
      }
  
      // Save the submission
      const submission = new Submission({
        serviceId,
        data: submittedData,
      });
  
      await submission.save();
  
      res.status(201).json({
        message: 'Data submitted successfully',
        submission,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting data', error });
    }
  };


// Retrieve submissions for a specific service
exports.getSubmissions = async (req, res) => {
  const { serviceId } = req.params;
  const { page = 1, limit = 10, sort = 'submittedAt', order = 'desc' } = req.query;

  try {
    // Validate if service exists
    const serviceExists = await Service.exists({ id: serviceId });
    if (!serviceExists) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Query submissions with pagination, sorting, and filtering
    const query = { serviceId }; // Add filters here if needed
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sort]: order === 'asc' ? 1 : -1 },
    };

    // Use Mongoose paginate
    const submissions = await Submission.find(query)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort(options.sort);

    // Count total submissions for pagination metadata
    const totalSubmissions = await Submission.countDocuments(query);

    res.status(200).json({
      total: totalSubmissions,
      page: options.page,
      pages: Math.ceil(totalSubmissions / options.limit),
      submissions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving submissions', error });
  }
};

// Generate reporting metrics
exports.getReportingMetrics = async (req, res) => {
  try {
    // 1. Total submissions per service
    const totalSubmissionsPerService = await Submission.aggregate([
      {
        $group: {
          _id: "$serviceId",
          totalSubmissions: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $project: {
          serviceName: "$service.name",
          serviceId: "$_id",
          totalSubmissions: 1,
        },
      },
    ]);

    // 2. Submission trends (daily)
    const dailyTrends = await Submission.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$submittedAt" },
            month: { $month: "$submittedAt" },
            year: { $year: "$submittedAt" },
          },
          submissions: { $count: {} },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);

    // 3. Most-used services
    const mostUsedServices = await Submission.aggregate([
      {
        $group: {
          _id: "$serviceId",
          count: { $count: {} },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $project: {
          serviceName: "$service.name",
          serviceId: "$_id",
          count: 1,
        },
      },
      { $limit: 5 }, // Top 5 most-used services
    ]);

    res.status(200).json({
      totalSubmissionsPerService,
      dailyTrends,
      mostUsedServices,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating metrics", error });
  }
};


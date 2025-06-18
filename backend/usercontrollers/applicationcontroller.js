




import { Application } from "../models/Application.js";
import { Job } from "../models/jobschema.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false,
            });
        }

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false,
            });
        }

        // check if the job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            // application: newApplication,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;


        // Hierarchy of Populations

        // The query returns a list of Application documents, but it populates the following fields:
        // job Field: Fetches detailed information about the job related to each application.
        // company Field(Inside job): Fetches details of the company related to the job.

        // application ni job field hase pela e khuli jashe( badhi details fetch thai jashe) and then te 
        // darek job ni andar company field hashe te khuli jashe ..... hierarchy
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                },
            });

        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false,
            });
        }

        return res.status(200).json({
            application,
            success: true,
        });
    } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //     message: "An error occurred while fetching applications.",
        //     success: false,
        //     error: error.message,
        // });
    }
};

//admin joshe ketla user e apply karelu chhe em
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false,
            });
        }

        // find the application by application id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

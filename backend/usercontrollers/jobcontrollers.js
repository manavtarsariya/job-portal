import { Job } from "../models/jobschema.js"



export const postjob = async (req, res) => {

    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body

        const userId = req.id;


        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAlljobs = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }
            ]
        };

        // When you use populate(), all the fields defined in the referenced Company schema will be included in the result. By default, it fetches every field from the referenced document.

        const jobs = await Job.find(query).populate({
            path: 'company'
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate({ path: "application" })
            .populate({ path: "company" });

        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        };

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {

        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const DeleteAdminJob = async (req, res) => {
    try {

        const jobId = req.params.id;

        // Find the job to ensure it exists before deletion
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        // Delete the job
        await Job.deleteOne({ _id: jobId });

        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        });

        return res.status(200).json({
            message: "Job deleted successfully.",
            jobs,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}
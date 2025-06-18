


import { Company } from "../models/company.js";
import { User } from "../models/userschema.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";




export const registercompany = async (req, res) => {

    try {
        const { companyname } = req.body
  

        if (!companyname) {
            return res.status(400).json({
                message: "Company Name is Required.",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyname })
        if (company) {
            return res.status(400).json({
                message: "you can't register same company.",
                success: false
            })
        }

        company = await Company.create({
            name: companyname,
            userId: req.id
        })

        return res.status(200).json({
            message: "company registered successfully.",
            company,
            success: true
        })
    } catch (error) {

        console.log(error)

    }
}

export const getCompany = async (req, res) => {

    try {

        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "companies not found.",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })

    } catch (error) {
        console.log(error)
    }

}

export const getCompanyById = async (req, res) => {
    try {

        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({
                message: "company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {

        const { name, description, website, location } = req.body
        const file = req.file;
        // cloudinary

        let logo="";
        if (file) {
            const fileuri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
            logo = cloudResponse.secure_url;
        }

        let updatedata = {};
        if(logo){

            updatedata = { name, description, website, location, logo };
        }else{
            updatedata = { name, description, website, location};

        }

        const company = await Company.findByIdAndUpdate(req.params.id, updatedata, { new: true })

        if (!company) {
            return res.status(404).json({
                message: "company not found.",
                success: false
            })
        }


        return res.status(200).json({
            message: "company information updated successfully",
            // company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteAdminCompany = async (req, res) => {
    try {
  
        const companyId = req.params.id;

        // Find the job to ensure it exists before deletion
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "company not found.",
                success: false,
            });
        }

        // Delete the company
        await Company.deleteOne({ _id: companyId });

        const adminId = req.id;
        const companies = await Company.find({ userId :adminId });

        return res.status(200).json({
            message: "company deleted successfully.",
            companies,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}
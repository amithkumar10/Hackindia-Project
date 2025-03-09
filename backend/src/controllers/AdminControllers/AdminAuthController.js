import { Company } from "../../models/CompanyModel.js";
import { Freelancer } from "../../models/FreelancerModel.js";

export const getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find().select("-password");
  
      return res.status(200).json({
        message: "All companies retrieved successfully",
        companies
      });
    } catch (error) {
      console.error("Error getting all companies:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getAllFreelancers = async (req, res) => {
    try {
      const freelancers = await Freelancer.find().select("-password");
  
      return res.status(200).json({
        message: "All freelancers retrieved successfully",
        freelancers
      });
    } catch (error) {
      console.error("Error getting all freelancers:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getCompanyById = async (req, res) => {
    try {
      const { companyId } = req.params;
      
      const company = await Company.findById(companyId).select("-password");
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      return res.status(200).json({
        message: "Company retrieved successfully",
        company
      });
    } catch (error) {
      console.error("Error getting company:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Get freelancer by ID
  export const getFreelancerById = async (req, res) => {
    try {
      const { freelancerId } = req.params;
      
      const freelancer = await Freelancer.findById(freelancerId).select("-password");
      
      if (!freelancer) {
        return res.status(404).json({ message: "Freelancer not found" });
      }
      
      return res.status(200).json({
        message: "Freelancer retrieved successfully",
        freelancer
      });
    } catch (error) {
      console.error("Error getting freelancer:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
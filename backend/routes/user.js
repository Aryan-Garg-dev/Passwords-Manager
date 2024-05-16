import { Router } from "express";
import z from 'zod';
import { Site } from "../db.js"; 

const router = Router();

const sitePassSchema = z.object({
    site: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
}).required();

router.post("/save", async (req, res)=>{
    const request = req.body;
    const requestValidation = sitePassSchema.safeParse(request);
    if (!requestValidation.success){
        const error = requestValidation.error.issues[0];
        return res.status(400).json({
            error: "Bad Request",
            message: error.message,
            success: false
        })
    }
    try {
        const siteAlreadyExists = await Site.findOne({ site: request.site });
        if (siteAlreadyExists){
            return res.status(409).json({
                message: "Conflict",
                error: "Site already exists",
                success: false,
            })
        }

        const createdSite = new Site(request);
        await createdSite.encryptPassword();
        await createdSite.save();
        
        return res.status(201).json({
            message: "Site data has been saved.",
            siteid: createdSite._id,
            success: true,
        })

    } catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
            success: false,
        })
    }
});

const siteUpdateSchema = z.object({
    site: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
}).partial();

router.put("/update", async(req, res)=>{
    const siteId = req.headers.siteid;
    if (!siteId){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Required Headers Missing",
            success: false,
        })
    }

    const request = req.body;
    const requestValidation = siteUpdateSchema.safeParse(request);
    if (!requestValidation.success){
        const error = requestValidation.error.issues[0];
        return res.status(400).json({
            error: "Bad Request",
            message: error.message,
            success: false
        })
    }
    try {
        const updatedSite = await Site.findOneAndUpdate(
            { _id: siteId },
            { $set: request },
            { new: true }
        );

        await updatedSite.encryptPassword();
        await updatedSite.save();

        if (!updatedSite) {
            return res.status(404).json({
                error: "Not Found",
                message: "Site not found",
                success: false,
            });
        }

        return res.status(201).json({
            message: "Site data has been updated",
            success: true,
        })
    } catch(error){
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
            success: false,
        })
    }
})

router.delete("/delete", async (req, res)=>{
    const siteId = req.headers.siteid;
    if (!siteId){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Required Headers Missing",
            success: false,
        })
    }

    try {
        await Site.deleteOne({ _id: siteId });
        return res.status(200).json({
            message: "Site data deleted successfully",
            success: true,
        })
    } catch (error){
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
            success: false,
        }) 
    }
})

router.get("/fetchAll", async (req, res)=>{
    try {
        const sites = await Site.find();
        return res.status(200).json({
            message: "Sites data fetched successfully",
            sites: await Promise.all(
                sites.map(async (siteData)=>{
                    return {
                        siteid: siteData._id,
                        site: siteData.site,
                        email: siteData.email,
                        password: await siteData.decryptPassword(),
                    }
                })
            )
        })
    } catch(error){
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
            success: false,
        })   
    }
    
})


export default router;



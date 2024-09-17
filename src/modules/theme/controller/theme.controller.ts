import { Request, Response } from "express";
import ThemeService from "../services/theme.service";
import AsyncHandler from "../../../commons/utils/asynhandler";


export default class ThemeController extends AsyncHandler {
    constructor() {
        super()
    }

    static getalltheme = this.handleRequest(async (req: Request, res: Response) => {
        const theme = await ThemeService.getThemeService()
        return {
            message: "Theme fetched successfully",
            data: theme
        }
    })

    static createTheme = this.handleRequest(async (req: Request, res: Response) => {
        const theme = await ThemeService.createThemeService(req.body)
        return {
            status: 201,
            message: "Theme created successfully",
            data: theme
        }
    })

    static getThemeById = this.handleRequest(async (req: Request, res: Response) => {
        const theme = await ThemeService.getThemeByIdService(+req.params.id)
        return {
            message: "Theme fetched successfully",
            data: theme
        }
    })

    static updateTheme = this.handleRequest(async (req: Request, res: Response) => {
        const theme = await ThemeService.updateThemeService(+req.params.id, req.body)
        return {
            status: 200,
            message: "Theme updated successfully",
            data: theme
        }
    })

    static deleteTheme = this.handleRequest(async (req: Request, res: Response) => {
        const theme = await ThemeService.deleteThemeService(+req.params.id)
        return {
            status: 200,
            message: "Theme deleted successfully",
            data: theme
        }
    })


}
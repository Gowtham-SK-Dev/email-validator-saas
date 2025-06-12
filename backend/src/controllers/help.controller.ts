import type { Request, Response } from "express"
import { createHelpRequest, getHelpRequestsByUserId } from "../models/help.model"


export const submitHelpRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    const { message } = req.body
    const userId = req.user.id

    
    const helpId = await createHelpRequest({
      user_id: userId,
      message,
    })

    res.status(201).json({
      message: "Help request submitted successfully",
      helpId,
    })
  } catch (error) {
    console.error("Submit help request error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}


export const getUserHelpRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    const userId = req.user.id

    
    const helpRequests = await getHelpRequestsByUserId(userId)

    res.status(200).json({ helpRequests })
  } catch (error) {
    console.error("Get user help requests error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

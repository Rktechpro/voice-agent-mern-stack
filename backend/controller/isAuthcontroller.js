import uploadCloudinary from "../config/Cloudnerry.js";
import UserModel from "../model/UserModel.js";
//  found your user
const getisAuth = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// update voice agent functions
const updateVoiceAgent = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    const userId = req.userId;

    let assistantImage;

    if (req.file) {
      assistantImage = await uploadCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    // Then update DB or do further logic
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        assistantName,
        assistantImage,
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update assistant voice agent error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// controllers/userController.js
const deleteHistoryByText = async (req, res) => {
  try {
    const userId = req.userId;
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Valid text is required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.history.indexOf(text);
    if (index === -1) {
      return res.status(404).json({ message: "History entry not found" });
    }

    user.history.splice(index, 1);
    await user.save();

    res.status(200).json({
      message: "History text deleted successfully",
      history: user.history,
    });
  } catch (error) {
    console.error("Delete history by text error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getisAuth, updateVoiceAgent, deleteHistoryByText };

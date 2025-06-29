import GeminiResponsedata from "../gemin/Gemini.js";
import UserModel from "../model/UserModel.js";
import moment from "moment";

const GeminiAskByControle = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await UserModel.findById(req.userId);
    user.history.push(command);
    user.save();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let names = process.env.CREAD_BY;
    const userName = names;

    const assistantName = user.assistantName;

    const resultresponse = await GeminiResponsedata(
      command,
      assistantName,
      userName
    );
    console.log("Raw Gemini response:", resultresponse);

    const ismatch_json = resultresponse.match(/{[\s\S]*}/);
    if (!ismatch_json) {
      return res
        .status(400)
        .json({ success: false, response: "Sorry, I can't understand that." });
    }

    const GemniResult = JSON.parse(ismatch_json[0]);
    const type = GemniResult.type;
    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: GemniResult.userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get_time":
        return res.json({
          type,
          userInput: GemniResult.userInput,

          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get_month":
        return res.json({
          type,
          userInput: GemniResult.userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      case "get_day":
        return res.json({
          type,
          userInput: GemniResult.userInput,
          response: `Current day is ${moment().format("dddd")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "google_Chrome_open":
      case "instgram_open":
      case "linkedin_open":
      case "facebook_open":
      case "weather_show":
      case "github_open":
        return res.json({
          type,
          userInput: GemniResult.userInput,
          response: GemniResult.response,
        });
      default:
        return res.status(400).json({
          type,
          userInput,
          response: "I did not understand that command!",
        });
    }
  } catch (error) {
    console.error("GeminiAskByControle error:", error);
    return res.status(500).json({
      success: false,
      message: "Voice agent error!",
    });
  }
};

export default GeminiAskByControle;

import userModel from "../model/user.model.js";


export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true,
            userData: {
                fullname: user.fullname,
                email: user.email,
                grade: user.grade,
                _id: user._id
            }
         });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
import e from 'express';
import jwt from 'jsonwebtoken';


const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success:false, error: 'Unauthorized' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id){
            req.body.userId = decoded.id;
        }
        else{
            return res.status(401).json({ success:false, error: 'Unauthorized' });
        }
        next();

    } catch (error) {
        res.status(401).json({ success:false, message: error.message });
    }
}
export default userAuth;
const Profile = require('../models').Profile;
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadCloudinary = async (filePath) => {
    let result;
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true
        })
        fs.unlinkSync(filePath);

        return result.url;
    } catch (err) {
        fs.unlinkSync(filePath);

        return null;
    }
}

const uploadAvatar = async (req, res) => {
    const url = await uploadCloudinary(req.file.path);
    
    if (url) {
        const currentUserId = req.user.id;
        Profile.update(
            {
                avatar: url
            },
            {
                where: {
                    userId: currentUserId
                }
            }
        )
        return res.json({
            message: 'Upload berhasil.',
            url: url
        });
    } else {
        return res.json({
            message: 'Upload gagal.'
        })
    }
}

module.exports = {
    uploadAvatar
}
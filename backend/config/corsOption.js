const whiteList = ['http://localhost:3000'];

const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}

module.exports = corsOption;

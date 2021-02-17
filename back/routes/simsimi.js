const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res, next) => { // POST /simsimi
    try {
        const result = await axios({
            url: 'https://wsapi.simsimi.com/190410/talk',
            method: 'post',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8',
                'x-api-key' : 'k8vBgUA.WKtwTSQgIEEgr24QG.XGD_bpwAHn56hC',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            data: {
                utext : req.body.text,
                lang : "ko",
            },
        });

        res.status(result.data.status).send({ 
            simsimi: true,
            text: result.data.atext
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
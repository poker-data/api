const Date = require("../models/date");

const newDate = async (req, res) => {
    const {name, day, schedule, service, receiver, email, phone, amount} = req.body;
    try {
        const date = new Date({
            name,
            day,
            schedule,
            service,
            receiver,
            email,
            phone,
            amount,
        })
        date.save((err, dateDB) => {
            if (err) {
                return res.json({
                    success: false,
                    msj: "Fail to create date",
                    err,
                });
            }
            return res.json({
                success: true,
                date: dateDB,
            });
        })
   
    }catch (error) {
        console.log(error)
    }

}


module.exports = {
    newDate,
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const dbConnection = require('../database');
var nodemailer = require('nodemailer');

exports.user_signup = (req, res, next) => {
    dbConnection.query("SELECT username FROM users WHERE email=?", [req.body.email], function (error, result, fields) {
        if (error) {
            throw error;
        } else {
        
            console.log(result.length);
            if (result.length != 0) {
                return res.status(409).json({
                    success: false,
                    message: 'User aleredy Exists'
                });
            } else {
                // var password = generator.generate({
                //     length: 10,
                //     numbers: true
                // });
                
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        password= hash,
                        pass= req.body.password
                        // req.body.pass = req.body.password;
                        // req.body.password = hash;
                        req.body.creation_dt = new Date();
                        req.body.username = req.body.email;
                            dbConnection.query("INSERT INTO users(first_name,email,mobile,designation,role,username,pass,password,creation_dt,isactive) VALUES (?,?,?,?,?,?,?,?,?,?);", [req.body.first_name,req.body.email,req.body.mobile,req.body.designation,"admin", req.body.username,pass,password,req.body.creation_dt,1], function (error1, result1, fields1) {
                            if (error1) {
                                throw error1;
                            } else {
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'priyankakachale15@gmail.com',
                                        pass: 'priyanka2'
                                    }
                                });
                                var mailOptions = {
                                    from: 'piya.kachale@gmail.com',
                                    to: req.body.email,
                                    subject: 'Login credentials',
                                    html: '<strong>Dear ' +req.body.first_name + ', </strong><br/><br/>' +
                                        'You Registration with Intelegain is Done Successfully. <br/>' +
                                        'your User Name is ' + req.body.email + ' and  <br/>' +
                                        'your password  is ' + req.body.password + ' <br/>' +
                                        'Thank You......'
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                return res.status(200).json({
                                    success: true,
                                    message: 'User register sucessfully'
                                });
                                
                            }
                        })
                           
                    }
                })
            }
        }
    })
}



exports.user_login = (req, res, next) => {
    var usename = req.body.username;
    var password = req.body.password;
    console.log("user===  " + usename);
    console.log("pass===  " + password);
    var userInfo = {}

    dbConnection.query("SELECT * FROM users WHERE email=?", [req.body.username], function (error, result, fields) {
        if (error) {
            throw error;
        } else {
            console.log(result);
            console.log(result.length);
          
            if (result.length == 0) {
                return res.status(200).json({
                    message: 'user not exist'
                });
            } else {
                bcrypt.compare(password, result[0].password, (err1, result1) => {
                    if (err1) {
                        return res.status(200).json({
                            message: 'wrong password'
                        });
                    }
                    if (result1) {
                        const token = jwt.sign({
                            email: result[0].email,
                            userId: result[0].id
                        },
                            'secret', 
                            { expiresIn: "9h" },
                        );

                        userInfo.currentLoginId = result[0]._id;
                        userInfo.first_name = result[0].first_name;
                        userInfo.role = result[0].role;
                        userInfo.token = token;
                        res.status(200).json({
                            success: true,
                            message: 'login successful',
                            data: userInfo
                        })
                    } else {
                        res.status(200).json({
                            message: 'Worng password',
                            success: false
                        })

                    }
                })
            }
        }
    })

}

exports.get_admin_users = (req, res) => {
    dbConnection.query("SELECT * FROM users WHERE role= 'admin' ", function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: error
            });
        } else {
            res.status(200).json({
                success: true,
                data: result
            })
        }
    });
}

exports.get_all_users = (req, res) => {
    dbConnection.query("SELECT * FROM users WHERE role= 'user' ", function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: error
            });
        } else {
            res.status(200).json({
                success: true,
                data: result
            })
        }
    });
}





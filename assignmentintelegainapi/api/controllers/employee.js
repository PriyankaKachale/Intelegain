
const dbConnection = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
var nodemailer = require('nodemailer');

exports.get_all_employees = (req, res) => {
    dbConnection.query("SELECT * FROM employee WHERE isactive= 1 ", function (error, result, fields) {
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



exports.add_employee = (req, res) => {
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
                dbConnection.query("SELECT employeeId FROM employee WHERE employeeId=?", [req.body.employeeId], function (error3, result3, fields3) {
                    if (error3) {
                        throw error;
                    } else {
                        if (result.length == 0) {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    return res.status(500).json({
                                        error: err
                                    });
                                } else {
                                    password = hash,
                                        pass = req.body.password
                                    // req.body.pass = req.body.password;
                                    // req.body.password = hash;
                                    req.body.creation_dt = new Date();
                                    req.body.username = req.body.email;

                                    dbConnection.query("INSERT INTO users(first_name,email,mobile,designation,role,username,pass,password,creation_dt,isactive) VALUES (?,?,?,?,?,?,?,?,?,?);", [req.body.first_name, req.body.email, req.body.mobile, req.body.designation, req.body.role, req.body.username, pass, password, req.body.creation_dt, 1], function (error1, result1, fields1) {
                                        if (error1) {
                                            throw error1;
                                        } else {
                                            dbConnection.query("SELECT id FROM users WHERE email=?", [req.body.email], function (error5, result5, fields5) {
                                                if (error) {
                                                    throw error;
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
                                                        html: '<strong>Dear ' + req.body.first_name + ', </strong><br/><br/>' +
                                                            'You Registration with Intelegain is Done Successfully. <br/>' +
                                                            'your User Name is ' + req.body.email + ' and  <br/>' +
                                                            'your password  is ' + req.body.password + ' <br/>' +
                                                            'Thank You......'
                                                    };
                                                    transporter.sendMail(mailOptions, function (error4, info) {
                                                        if (error4) {
                                                            console.log(error4);
                                                        } else {
                                                            console.log('Email sent: ' + info.response);
                                                        }
                                                    });

                                                    dbConnection.query("INSERT INTO employee(user_id,first_name,email,mobile_no,designation,added_by,employeeId,isactive) VALUES (?,?,?,?,?,?,?,?);", [result5[0].id, req.body.first_name, req.body.email, req.body.mobile_no, req.body.designation, req.body.added_by, req.body.employeeId, 1], function (error2, result2, fields2) {
                                                        if (error2) {
                                                            throw error2;
                                                        } else {
                                                            return res.status(200).json({
                                                                success: true,
                                                                message: 'Employee added sucessfully'
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }
                            })
                        }
                    }

                })



            }
        }
    });
}

exports.delete_employee = (req, res) => {

    dbConnection.query("UPDATE employee SET isactive=0 WHERE id=?", [req.params.employee_id], function (error, result, fields) {
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
exports.get_employee_by_id = (req, res) => {
    console.log(req.params);
    var employeeInfo = {};
    dbConnection.query("SELECT * FROM employee WHERE id=?", [req.params.employee_id], function (error, result, fields) {
        console.log(result);
        if (error) {
            res.status(200).json({
                success: false,
                error: error
            })
        } else {

            dbConnection.query("SELECT * FROM users WHERE id=?", [result[0].user_id], function (error1, result1, fields1) {
                console.log(result1);
                if (error1) {
                    res.status(200).json({
                        success: false,
                        error: error1
                    })
                } else {
                    employeeInfo.user_id = result[0].user_id;
                    employeeInfo.first_name = result[0].first_name;
                    employeeInfo.email = result[0].email;
                    employeeInfo.mobile_no = result[0].mobile_no;
                    employeeInfo.designation = result[0].designation;
                    employeeInfo.added_by = result[0].added_by;
                    employeeInfo.employeeId = result[0].employeeId;
                    employeeInfo.role = result1[0].role;
                    employeeInfo.password = result1[0].pass;

                    res.status(200).json({
                        success: true,
                        data: employeeInfo
                    })
                }
            })
        }
    })
}

exports.update_employee = (req, res) => {
    console.log(req.body);
    dbConnection.query("UPDATE employee SET first_name=?,email=?,mobile_no=?,designation=?,added_by=?,employeeId=? WHERE id=?", [req.body.first_name, req.body.email, req.body.mobile_no, req.body.designation, req.body.added_by, req.body.employeeId, req.body.id], function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: error
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    password = hash,
                        pass = req.body.password
                    // req.body.pass = req.body.password;
                    // req.body.password = hash;
                    req.body.creation_dt = new Date();
                    req.body.username = req.body.email;

                    dbConnection.query("UPDATE users SET role=?,pass=?,password=?,first_name=?,email=?,mobile=?,designation=? WHERE id=?", [req.body.role, pass, password, req.body.first_name, req.body.email, req.body.mobile_no, req.body.designation, req.body.user_id], function (error1, result1, fields1) {
                        if (error1) {
                            console.log(error1);
                            res.status(500).json({
                                success: false,
                                error: error1
                            });
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
                                subject: ' Updated Login credentials',
                                html: '<strong>Dear ' + req.body.first_name + ', </strong><br/><br/>' +
                                    'You Registration with Intelegain is updated Successfully. <br/>' +
                                    'your New User Name is ' + req.body.email + ' and  <br/>' +
                                    'your New password  is ' + req.body.password + ' <br/>' +
                                    'Thank You......'
                            };
                            transporter.sendMail(mailOptions, function (error4, info) {
                                if (error4) {
                                    console.log(error4);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                            res.status(200).json({
                                success: true,
                                message: 'employee update successfully',
                                data: result
                            })
                        }
                    })
                }
            })
        }
    });

}

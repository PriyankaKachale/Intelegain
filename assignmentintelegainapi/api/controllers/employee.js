
const dbConnection = require('../database');

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
    dbConnection.query("SELECT employeeId FROM employee WHERE employeeId=?", [req.body.employeeId], function (error, result, fields) {
        if (error) {
            throw error;
        } else {
            console.log(result.length);
            if (result.length == 0) {
                dbConnection.query("INSERT INTO employee(first_name,email,mobile_no,designation,added_by,employeeId,isactive) VALUES (?,?,?,?,?,?,?);", [req.body.first_name, req.body.email, req.body.mobile_no, req.body.designation, req.body.added_by, req.body.employeeId, 1], function (error1, result1, fields1) {
                    if (error1) {
                        throw error1;
                    } else {
                        return res.status(200).json({
                            success: true,
                            message: 'Employee added sucessfully'
                        });
                    }
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: 'duplicate employeeId'
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
    dbConnection.query("SELECT * FROM employee WHERE id=?", [req.params.employee_id], function (error, result, fields) {
        console.log(result);
        if (error) {
            res.status(200).json({
                success: false,
                error: error
            })
        } else {
            res.status(200).json({
                success: true,
                data: result[0]
            })
        }
    })

}

exports.update_employee = (req, res) => {
    console.log(req.body);
                dbConnection.query("UPDATE employee SET first_name=?,email=?,mobile_no=?,designation=?,added_by=?,employeeId=? WHERE id=?", [req.body.first_name, req.body.email, req.body.mobile_no, req.body.designation, req.body.added_by, req.body.employeeId,req.body.id], function (error, result, fields) {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            success: false,
                            error: error
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'employee update successfully',
                            data: result
                        })
                    }
                });
    
}

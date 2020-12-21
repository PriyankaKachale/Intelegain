const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const employee_controller = require('../controllers/employee');


 router.get('/',  employee_controller.get_all_employees)

 router.get('/data/:employee_id',employee_controller.get_employee_by_id)

 router.post('/',  employee_controller.add_employee)

 router.delete('/:employee_id', employee_controller.delete_employee)
 
 router.put('/',  employee_controller.update_employee)

module.exports = router;
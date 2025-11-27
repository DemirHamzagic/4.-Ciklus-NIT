const Employee = require("../models/Employee");
const Department = require("../models/Department");

async function createEmployee(req, res) {
	try {
		const newEmployee = new Employee(req.body);
		const saved = await newEmployee.save();
		res.status(201).json(saved);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function addSkill(req, res) {
	try {
		const { skill } = req.body;
		const employee = await Employee.findById(req.params.id);
		if (!employee)
			return res.status(404).json({ message: "Nije pronadjen" });
		if (!employee.skills.includes(skill)) employee.skills.push(skill);

		await employee.save();
		res.json(employee);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function changeDepartment(req, res) {
	try {
		const { newDepartment } = req.body;
		const employee = await Employee.findById(req.params.id).populate(
			"department"
		);
		if (!employee)
			return res.status(404).json({ message: "Nije pronadjen" });

		const department = await Department.findById(newDepartment);
		if (!department || employee.department._id.toString() === newDepartment)
			return res.status(404).json({ message: "Nije validno" });
		if (employee.department) {
			employee.department.employees =
				employee.department.employees.filter(
					(e) => e.toString() !== employee._id.toString()
				);
			await employee.department.save();
		}
		employee.department = newDepartment;
		department.employees.push(employee._id);

		await employee.save();
		await department.save();
		res.json(employee);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function deActivate(req, res) {
	try {
		const employee = await Employee.findById(req.params.id);
		employee.isActive = false;

		await employee.save();
		res.json(employee);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function searchEmployee(req, res) {
	try {
		const { firstName, position } = req.query;
		const filter = {};
		if (firstName) filter.firstName = { $eq: firstName };
		if (position) filter.position = { $eq: position };
		const employees = await Employee.find(filter);

		if (employees.length === 0)
			return res.status(404).json({ message: "Nisu pronadjeni" });

		res.json(employees);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	createEmployee,
	addSkill,
	changeDepartment,
	deActivate,
	searchEmployee,
};

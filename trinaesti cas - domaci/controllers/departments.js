const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Project = require("../models/Project");

async function setEmployee(req, res) {
	try {
		const filter = {};
		if (req.query.depName) filter.name = { $eq: req.query.depName };
		const department = await Department.findOne(filter);
		if (!department)
			return res
				.status(404)
				.json({ message: "Departman nije pronadjen" });

		if (department.employees.includes(req.params.id)) {
			department.employees = department.employees.filter(
				(e) => e.toString() !== req.params.id
			);
		} else {
			department.employees.push(req.params.id);
		}
		await department.save();
		res.json(department);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function changeHead(req, res) {
	try {
		const department = await Department.findById(req.params.id);
		if (!department)
			return res
				.status(404)
				.json({ message: "Departman nije pronadjen" });
		const newHead = await Employee.findById(req.params.headId);
		if (department.head.toString() === newHead._id.toString())
			return res.json({ message: "Sef je ostao nepromenjen" });

		department.head = newHead._id;
		await department.save();
		res.json(department);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function getProjects(req, res) {
	try {
		const filter = {};
		if (req.query.department)
			filter.department = { $eq: req.query.department };
		const projects = await Project.find(filter);
		if (projects.length === 0)
			return res
				.status(404)
				.json({ message: "Projekti nisu pronadjeni" });

		res.json(projects);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function allSalaries(req, res) {
	try {
		const department = await Department.findById(req.params.id).populate(
			"employees",
			"salary"
		);
		if (!department) return res.status(404).json({ message: "Ne postoji" });
		const salaries = department.employees.reduce(
			(sum, person) => sum + person.salary,
			0
		);
		res.json({ message: `Ukupne plate iznose ${salaries}` });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function createDepartment(req, res) {
	try {
		const newDepartment = new Department(req.body);
		await newDepartment.save();

		res.json(newDepartment);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	createDepartment,
	allSalaries,
	setEmployee,
	changeHead,
	getProjects,
};

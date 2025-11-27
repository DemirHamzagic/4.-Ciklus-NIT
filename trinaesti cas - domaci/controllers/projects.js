const Employee = require("../models/Employee");
const Project = require("../models/Project");

async function createProject(req, res) {
	try {
		const newProject = new Project(req.body);
		await newProject.save();

		res.json(newProject);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function changeStatus(req, res) {
	try {
		const project = await Project.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		res.json(project);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function setMember(req, res) {
	try {
		const project = await Project.findById(req.params.id);
		if (!project)
			return res.status(404).json({ message: "Projekat ne postoji" });

		const employee = await Employee.findById(req.params.employeeId);
		if (!employee)
			return res.status(404).json({ message: "Radnik ne postoji" });

		const exist = project.team.some(
			(memeber) => memeber.employee.toString() === employee._id.toString()
		);
		if (exist) return res.json({ message: "Radnik je vec u timu" });

		if (!req.body.role)
			return res.status(400).json({ message: "Role je obavezan" });

		project.team.push({ employee: employee._id, role: req.body.role });

		await project.save();
		res.json(project);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function budgetStatus(req, res) {
	try {
		const project = await Project.findById(req.params.id).populate(
			"team.employee",
			"salary"
		);
		if (!project)
			return res.status(404).json({ message: "Projekat ne postoji" });
		const totalSalaries = project.team.reduce(
			(sum, member) => sum + member.employee.salary,
			0
		);
		if (project.budget - totalSalaries >= 0)
			return res.json({ message: "Budget pokriva troskove" });
		else return res.json({ message: "Budget ne pokriva troskove" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function projectStatus(req, res) {
	try {
		const project = await Project.findById(req.params.id)
			.populate("department", "name")
			.populate("team.employee", "firstName lastName position");
		if (!project)
			return res.status(404).json({ message: "Projekat ne postoji" });
		res.json(project);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	createProject,
	changeStatus,
	budgetStatus,
	projectStatus,
	setMember,
};

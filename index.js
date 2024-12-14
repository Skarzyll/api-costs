import express from "express";
import Project from "./Server.js";
import cors from "cors";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", async (req, res) => {
	try {
		const projects = await findAll();
		const funcform = projects.map((project) => ({
			id: project.id,
			name: project.name,
			buy: project.buy,
			categoria_id: project.categoria_id,
			createdAt: format(new Date(project.createdAt), "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
			updatedAt: format(new Date(project.updatedAt), "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
		}));

		res.send(funcform);
	} catch (error) {
		res.status(500).json(error);
	}
});

app.post("/", async (req, res) => {
	try {
		await Project.create({
			name: req.body.name,
			buy: req.body.buy,
			categoria_id: req.body.categoria_id,
		});
		return res.status(201).json();
	} catch (error) {
		return res.status(500).json(error);
	}
});

app.get("/projects", async (req, res) => {
	try {
		const projects = await Project.findAll();
		const funcform = projects.map((project) => ({
			id: project.id,
			name: project.name,
			buy: project.buy,
			categoria_id: project.categoria_id,
			createdAt: format(new Date(project.createdAt), "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
			updatedAt: format(new Date(project.updatedAt), "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
		}));

		res.json(funcform);
	} catch (error) {
		res.status(500).json(error);
	}
});

app.get("/projectsone/:id", async (req, res) => {
	try {
		const project = await Project.findAll({
			where: {
				id: req.params.id,
			},
		});

		const funcform = project.map((project) => ({
			id: project.id,
			name: project.name,
			buy: project.buy,
			categoria_id: project.categoria_id,
			createdAt: format(new Date(project.createdAt), "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
			updatedAt: format(new Date(project.updatedAt), "dd/MM/yyyy HH:mm", {
				locale: ptBR,
			}),
		}));

		res.json(funcform);
	} catch (error) {
		return res.status(500).json(error);
	}
});

app.delete("/projectsdelete/:id", async (req, res) => {
	try {
		await Project.destroy({
			where: {
				id: req.params.id,
			},
			force: true,
		});

		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
});

app.patch("/projectsedit/:id", async (req, res) => {
	try {
		const { newName, newBuy, newCategoria } = req.body;

		const [updatedRows, updatedProject] = await Project.update(
			{
				name: newName,
				buy: newBuy,
				categoria_id: newCategoria,
			},
			{
				where: {
					id: req.params.id,
				},
				returning: true,
				plain: true,
			}
		);

		if (updatedRows === 0) {
			return res.status(404).json({
				error: "Projeto não encontrado",
			});
		}

		res.json(updatedProject);
	} catch (error) {
		return res.status(500).json(error);
	}
});

app.listen(PORT, () => console.log(`> Server is up and running in port: ${PORT}`));

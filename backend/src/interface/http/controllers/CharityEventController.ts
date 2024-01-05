import { DELETE, GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { CharityEventRepository } from "../../../domain/CharityEventRepository";

@route("/charity-events")
export class CharityEventController {
  constructor(
    private readonly charityEventRepository: CharityEventRepository
  ) {}

  @GET()
  async index(_: Request, res: Response) {
    const result = await this.charityEventRepository.find();

    return res.status(200).json(result);
  }

  @route("/:id")
  @GET()
  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.charityEventRepository.findById(id);

    if (!result) {
      return res.status(404).json({ error: "Charity event not found" });
    }

    return res.status(200).json(result);
  }

  @POST()
  async store(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      wppNumber,
      startHours,
      occursOnWeekends,
    } = req.body;

    const requestImages = (req.files as Express.Multer.File[]) || [];
    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      };
    });
    const result = await this.charityEventRepository.store({
      id: this.charityEventRepository.getNextId(),
      name,
      latitude,
      longitude,
      about,
      instructions,
      occursOnWeekends: occursOnWeekends === "true" ? true : false,
      wppNumber,
      startHours,
      images,
    });

    return res.status(201).json(result);
  }

  @route("/:id")
  @DELETE()
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.charityEventRepository.findById(id);

    if (!result) {
      return res.status(404).json({ error: "Charity event not found" });
    }

    await this.charityEventRepository.remove(id);

    return res.status(204).send();
  }
}

import { DELETE, GET, POST, route } from "awilix-express";
import { Request, Response } from "express";
import { CharityEventRepository } from "../../../domain/CharityEventRepository";
import { CharityEvent } from "../../../domain/CharityEvent";

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
    const result = await this.charityEventRepository.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Charity event not found" });
    }

    return res.status(200).json(result);
  }

  @POST()
  async store(req: Request, res: Response) {
    const requestImages = (req.files as Express.Multer.File[]) || [];
    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      };
    });

    const event = CharityEvent.validate({ ...req.body, images });

    if (!event) return res.status(400).json({ error: "Validation fails" });

    const result = await this.charityEventRepository.store({
      ...event,
      id: this.charityEventRepository.getNextId(),
      images: [],
    });

    return res.status(201).json(result);
  }

  @route("/:id")
  @DELETE()
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.charityEventRepository.findById(id);

    if (!result) {
      return res.status(404).json({ error: "Charity event not found" });
    }

    await this.charityEventRepository.remove(id);

    return res.status(204).send();
  }
}

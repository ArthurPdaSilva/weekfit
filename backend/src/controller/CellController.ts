import { Request, Response } from "express";
import { prisma } from "../utils/Prisma";

export class CellController {
  async update(req: Request, res: Response) {
    const { idCell } = req.params;
    const { name } = req.body;
    const newCell = await prisma.cell.update({
      data: { name },
      where: { id: parseInt(idCell) },
    });
    return res.json(newCell);
  }

  async read(req: Request, res: Response) {
    const { idTable } = req.params;
    const cells = await prisma.cell.findMany({ where: { tableId: idTable } });
    return res.json(cells);
  }
}

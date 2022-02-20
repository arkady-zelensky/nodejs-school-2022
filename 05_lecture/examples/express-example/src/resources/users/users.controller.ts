import { Request, Response, Router } from "express";
import { usersService } from "./users.service";
import { validate } from "../../middlewares/validate";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { serialize } from "../../shared/serialize";
import { SingleUserSerializer } from "./serializers/single-user.serializer";
import { UsersListSerializer } from "./serializers/users-list.serializer";

const router = Router();

// 1. C - Create
router.post("/", validate(CreateUserDto), (req: Request, res: Response) => {
  const user = usersService.createUser(req.body);
  res.status(201).send(serialize(SingleUserSerializer, { user }));
});

// 2. R - Read
router.get("/", (req: Request, res: Response) => {
  const users = usersService.getUsers();
  res.status(200).send(serialize(UsersListSerializer, { users }));
});
router.get("/:id", (req: Request, res: Response) => {
  const user = usersService.getUser(req.params.id);
  res.status(200).send(serialize(SingleUserSerializer, { user }));
});

// 3. U - Update
router.put("/:id", validate(UpdateUserDto), (req: Request, res: Response) => {
  const user = usersService.updateUser(req.params.id, req.body);
  res.status(200).send(serialize(SingleUserSerializer, { user }));
});

// 4. D - Delete
router.delete("/:id", (req: Request, res: Response) => {
  usersService.deleteUser(req.params.id);
  res.status(204).send();
});

export const usersRouter = router;

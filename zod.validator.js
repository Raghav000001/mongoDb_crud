import { z} from "zod"

export const userValidatorSchema = z.object({
    email:z.string().trim().email("email must include @"),
    name:z.string().min(3).max(20),
    password:z.string().min(5,"pass must be of at least 5 characters").max(50)
})
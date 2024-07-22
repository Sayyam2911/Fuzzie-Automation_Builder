import { z } from "zod";

const EditUserProfileSchema = z.object({
    name : z.string().min(1,'Required'),
    email : z.string().email('Required'),
})

export default EditUserProfileSchema
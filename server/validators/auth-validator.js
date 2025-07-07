import zod from "zod";

//create an object schema for the request body

const registerSchema = zod.object({
  name: zod
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 4 chars." })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: zod
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),
  phone: zod
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .max(15, { message: "Phone number must be less than 15 digits long" }),
  password: zod
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

const loginSchema = zod.object({
  email: zod
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: zod
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export { registerSchema, loginSchema };
// export default { registerSchema, loginSchema };

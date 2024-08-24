import { ZodError } from "zod";

export function errorMessage(error: ZodError): string {
  const errors: string[] = [];

  error.errors.forEach((error) => {
    const fields = error.path.join(", ");
    const message = error.message;
    errors.push([fields, message].join(":"));
  });

  return errors.join(", ");
}

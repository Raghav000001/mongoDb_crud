import { ZodError } from "zod"

export const validate =(schema)=> {
   return async (req,res,next) => {
       try {
         const parsed = await schema.parseAsync(req.body)
         req.body = parsed
         next()        
       } catch (error) {
        if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
       }
   }
     

import dotenv from "dotenv";
import app from "./app.js";
import shutdown from '../src/utils/shutdown.util.js'

dotenv.config()

const PORT = process.env.PORT || 8000;

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM')); // kill command or Docker stop
// Catch unhandled errors
process.on("uncaughtException", ()=>  shutdown('uncaughtException'))
process.on("unhandledRejection", ()=> shutdown('unhandledRejection'))


app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))

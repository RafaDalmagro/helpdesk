import { app } from "@/app";
import { env } from "@/env";
import { routes } from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";

const PORT = env.PORT || 3000;

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

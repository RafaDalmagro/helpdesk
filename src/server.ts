import { app } from "@/app";
import { env } from "@/env";
import { routes } from "@/routes";

const PORT = env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

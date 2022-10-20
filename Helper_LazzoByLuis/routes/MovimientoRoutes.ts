import { Router } from "express";
import { getUsuarios, deleteDuplicados, deleteDuplicadosAll } from "../controllers/UsuarioControllers";




const router = Router();

router.post(
    "/",
    getUsuarios
);

router.post(
    "/delete_duplicados",
    deleteDuplicados
);
router.post(
    "/delete_duplicados/all",
    deleteDuplicadosAll
);





export default router;
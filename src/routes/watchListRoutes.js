import express from "express";
import {
  addToWatchList,
  removeFromWatchList,
  updateWatchListItem,
} from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/theAuthMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchListValidators.js";
const router = express.Router();

router.use(authMiddleware); // Protect all watchlist routes with authentication middleware
router.post("/", validateRequest(addToWatchListSchema), addToWatchList);
router.put("/:id", updateWatchListItem);
router.delete("/:id", removeFromWatchList);
// router.post("/login", login);
// router.post("/logout", logout);
export default router;

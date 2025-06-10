"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const help_controller_1 = require("../controllers/help.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.post("/submit", help_controller_1.submitHelpRequest);
router.get("/my-requests", help_controller_1.getUserHelpRequests);
exports.default = router;
//# sourceMappingURL=help.routes.js.map
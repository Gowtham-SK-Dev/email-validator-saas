"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = require("../controllers/api.controller");
const router = (0, express_1.Router)();
router.use(api_controller_1.authenticateApiKey);
router.post("/verify-email", api_controller_1.verifyEmailEndpoint);
router.get("/usage", api_controller_1.getApiUsage);
exports.default = router;
//# sourceMappingURL=api.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.use(auth_middleware_1.requireAdmin);
router.get("/users", admin_controller_1.getUsers);
router.get("/users/:id", admin_controller_1.getUserProfile);
router.put("/users/:id", admin_controller_1.updateUserProfile);
router.get("/payments", admin_controller_1.getPayments);
router.get("/click-history", admin_controller_1.getClickHistories);
router.get("/help-requests", admin_controller_1.getHelpRequests);
router.put("/help-requests/:id", admin_controller_1.respondToHelpRequest);
router.get("/dashboard-stats", admin_controller_1.getDashboardStats);
router.get("/export/click-history", admin_controller_1.exportClickHistory);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map
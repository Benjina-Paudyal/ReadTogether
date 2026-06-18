router.get(
  "/me/borrowed",
  mockAuthenticateToken,
  getCurrentUserBorrowedController
);

export default router;

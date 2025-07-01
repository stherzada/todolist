export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  const protectedRoutes = ["/api/projects", "/api/user", "/api/projects/[id]"];

  const needsAuth = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (needsAuth) {
    const authHeader = getHeader(event, "authorization");
    const tokenCookie = getCookie(event, "todolist_auth_token");

    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (tokenCookie) {
      token = tokenCookie;
    }

    if (!token || !token.startsWith("dummy_token_")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de autenticação inválido ou ausente",
      });
    }

    const userCookie = getCookie(event, "todolist_user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      event.context.user = userData;
    }
  }
});

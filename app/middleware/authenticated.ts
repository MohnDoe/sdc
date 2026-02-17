export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user, ready } = useUserSession();

  if (!loggedIn) {
    if (!ready) {
      return abortNavigation()
    }
    return navigateTo('/')
  }
})

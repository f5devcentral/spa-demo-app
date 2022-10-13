import { LogLevel, PublicClientApplication } from "@azure/msal-browser"

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: "83697991-08aa-4b26-980c-fbab54b6895f",
    authority: "https://login.microsoftonline.com/e569f29e-b098-4cea-b6f0-48fa8532d64a",
    redirectUri: `${window.location.protocol}//${window.location.host}/checkout`, // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: `${window.location.protocol}//${window.location.host}/products`, // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: "localStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
}

/**
 * Scopes you add here will be used to request a token from Azure AD to be used for accessing a protected resource.
 * To learn more about how to work with scopes and resources, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const tokenRequest = {
  scopes: ["api://6c23ffd4-70f7-4b74-815d-577cb7423d4e/brewz.api.full"],
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
}

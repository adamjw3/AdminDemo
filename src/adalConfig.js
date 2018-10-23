import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: '68b865d5-cf18-4b2b-82a4-a4eddb9c5237',
  clientId: 'b606f7a4-9e82-4e2e-b495-c3b520dbf0c0',
  endpoints: {
    api: '68b865d5-cf18-4b2b-82a4-a4eddb9c5237',
  },
  postLogoutRedirectUri: window.location.origin,
  redirectUri: 'http://localhost:3000/auth/openid/return',
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);

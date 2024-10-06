/**
 * @typedef TokenDTO
 * @property {string} access_token.required
 * @property {string} refresh_token.required
 */

export class TokenDTO{
  access_token: string;
  refresh_token: string;

  constructor(
    access_token: string,
    refresh_token: string
  ) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }

}
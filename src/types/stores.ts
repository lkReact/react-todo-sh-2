import { FETCH } from "../common/constants/fetch";
import {
  FVoidType,
  UserLoaded,
  SetUser,
  SetCakes,
  AddCake,
  CakesLoaded,
  RemoveCakeById,
  RemoveCakeByName,
  modifyCakeType,
  AddUserCake,
} from "./functions";

import { CakeType } from "../types/cakes";

/*

clientId
: 
"777378757396-fokbn9mpgfqvjubl7pidm5gg2ectdecq.apps.googleusercontent.com"
credential
: 
"eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlNzJkYTFkZjUwMWNhNmY3NTZiZjEwM2ZkN2M3MjAyOTQ3NzI1MDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzczNzg3NTczOTYtZm9rYm45bXBnZnF2anVibDdwaWRtNWdnMmVjdGRlY3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzczNzg3NTczOTYtZm9rYm45bXBnZnF2anVibDdwaWRtNWdnMmVjdGRlY3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE3MzA2ODgxNzM1ODcyMzQyOTAiLCJlbWFpbCI6ImwuYXRjaGFtYS5jcHBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcwMTI5OTM4MSwibmFtZSI6Ikx1Y28gQVRDSEFNQSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLUWU1S1dYdFhqQzk3bkRadGhRUWZVbDFrZ2VMV2hQMnNPczNIZm4zRUc9czk2LWMiLCJnaXZlbl9uYW1lIjoiTHVjbyIsImZhbWlseV9uYW1lIjoiQVRDSEFNQSIsImxvY2FsZSI6ImZyIiwiaWF0IjoxNzAxMjk5NjgxLCJleHAiOjE3MDEzMDMyODEsImp0aSI6IjkzNzhkN2NkMjg0YWUwZDQyNjhiYzFlN2NiMjI2Njg5ZTk2NDNkNjUifQ.oMcjLp_iI3Y-uUBhpijdLQl4gyeUeEt9aOlolchZrlybbF1NzwiBuoLlfZbrp23eRQzun6SImy8vg_bsjpN1YeafIQywX0tRbsFt0PDVh9JC4dsfHetFbPIb25xEYmsyILPB4Ndpas911bhvmZ4nYuEUSvSuMN965noB5tPG6cnhO95GwQwg5T54xKW7XBeBAZokvy4Bfn_H4k7gZE5AL0j8zyNTVzKIM-PzPtKhxC4x909iIGcfZfbuShssWk-6nWMlRXxNzFZLJ2x5A4UKLb4SviWhxgcEjeosLF_p4Td0ShKg5cR92vYlHEWmEeWxujJA_1CAVM3epu2PGgY9xw"
select_by
: 
"btn"

*/

export interface Google2AuthCredentialResponseType {
  clientId:string,
  credential:string,
  select_by:string
}

export interface Google2AuthCredentialType {
aud:string,
azp:string
email:string
email_verified:boolean,
exp:number
family_name:string,
given_name:string,
iat:number,
iss:string,
jti:string
locale:string,
name:string,
nbf:number
picture:string,
sub:string
}

export interface UserType {
  isAdmin?: boolean;
  name: string | null | undefined;
  id?: string,
  google_credential?: Google2AuthCredentialType,
  userCakes?: CakeType[];
}

export interface UserStoreType {
  user: UserType | null | undefined;
  userFetchState: FETCH;
  userLoaded: UserLoaded<UserStoreType>;
  setUser: SetUser<UserType>;
  reset: ()=>void;
  addUserCake: AddUserCake<CakeType>;
  modifyCake: modifyCakeType<string,CakeType>;
  removeUserCakeByName: RemoveCakeByName<string | null | undefined>;
  removeUserCakeById: RemoveCakeById<number | null | undefined>;
}

export interface CakeStoreType {
  cakes: CakeType[] | null | undefined;
  cakeFetchState: FETCH;
  loadCakes: FVoidType<UserStoreType>;
  cakesLoaded: CakesLoaded<CakeStoreType>;
  setCakes: SetCakes<CakeType[]>;
  addCake: AddCake<CakeType>;
  modifyCake: modifyCakeType<number,CakeType>;
  removeCakeById: RemoveCakeById<number | null | undefined>;
}

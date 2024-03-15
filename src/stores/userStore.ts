import { create } from "zustand";
import { UserStoreType, UserType } from "../types/stores";
import { FETCH } from "../common/constants/fetch";
import { Clone } from "../common/helpers/object";
import { persist, createJSONStorage } from "zustand/middleware";

import { CakeType } from "../types/cakes";
import {  setUserMarket } from "../common/services/userManager";

const useUserStore = create<UserStoreType>()(
  persist( 
    (set) => ({
      user: null,
      userFetchState: FETCH.IDLE,
      reset: ():void => {
        set((): { user: UserType | null | undefined, userFetchState: FETCH } => {
          return { user:null, userFetchState: FETCH.IDLE}       
        })
      },
      addUserCake: (cake): void => {
        set((state): { user: UserType | null | undefined } => {
          const _user: UserType = {
            name: state.user?.name,
            isAdmin: state.user?.isAdmin || false,
            userCakes: [],
          };
          const _cake = Clone<CakeType>(cake);
          _cake.id = (state.user?.userCakes?.length || 0) + 1;
          const userCakes = [...(state.user?.userCakes || []), _cake];
          _user.userCakes = userCakes;
          setUserMarket(_user);
          return { user: _user };
        });
      },
      modifyCake: (cakeName, newData): void => {
        if(!cakeName) return;
        set((state): { user: UserType | null | undefined } => {
          const _newData = Clone(newData);
          const _user: UserType = {
            name: state.user?.name,
            isAdmin: state.user?.isAdmin || false,
            userCakes: Clone(state.user?.userCakes),
          };
            _user.userCakes?.forEach((cake,index): void => {
              if(_user.userCakes && cake.title === cakeName) {
                 _user.userCakes[index] = _newData;
              }
            });
            setUserMarket(_user);
          return { user: _user };
        });
      },
      userLoaded: (state): boolean => state.userFetchState === FETCH.SUCCESS,
      setUser: (user): void => {
        set((): { user: UserType } => ({ user: user }));
      },
      removeUserCakeById: (cakeId): void => {
        set((state): { user: UserType | null | undefined } => {
          const _user: UserType = {
            name: state.user?.name,
            isAdmin: state.user?.isAdmin || false,
            userCakes: [],
          };
          const userCakes =
            state.user?.userCakes?.filter((cake) => cake.id !== cakeId) || [];
          _user.userCakes = userCakes;
          setUserMarket(_user);
          return { user: _user };
        });
      },

      removeUserCakeByName: (cakeName): void => {
        set((state): { user: UserType | null | undefined } => {
          if(!state.user?.userCakes?.find((cake) => cake.title === cakeName)) return { user: state.user };
          
          const _user: UserType = {
            name: state.user?.name,
            isAdmin: state.user?.isAdmin || false,
            userCakes: [],
          };
          const userCakes = state.user?.userCakes?.filter((cake) => cake.title !== cakeName) || [];
          _user.userCakes = userCakes;
          setUserMarket(_user);
          return { user: _user };
        });

      },

    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useUserStore;

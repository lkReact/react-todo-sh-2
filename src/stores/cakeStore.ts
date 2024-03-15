import { create } from "zustand";

import { CakeStoreType } from "../types/stores";
import { CakeType } from "../types/cakes";
import { FETCH } from "../common/constants/fetch";
import { Clone } from "../common/helpers/object";
import { persist, createJSONStorage } from "zustand/middleware";

const useCakeStore = create<CakeStoreType>()(
  persist(
    (set) => ({
      cakes: null,
      cakeFetchState: FETCH.IDLE,
      loadCakes: (): void => {
        console.log("loadCakes called");
      },
      cakesLoaded: (state): boolean => state.cakeFetchState === FETCH.SUCCESS,
      setCakes: (_cakes): void => {
        set((): { cakes: CakeType[] } => ({ cakes: _cakes }));
      },
      addCake: (cake): void => {
        set((state): { cakes: CakeType[] } => ({
          cakes: [...(state.cakes || []), cake],
        }));
      },

      modifyCake: (cakeId, newData): void => {
        set((state): { cakes: CakeType[] | null | undefined } => {
          const _newData = Clone(newData);
          const __cakes=Clone(state.cakes);

          const cakeTargetIndex: number | undefined =
          __cakes?.findIndex((cake): boolean => cake.id === cakeId);

          if (__cakes?.length && cakeTargetIndex !== undefined) {
            if (cakeTargetIndex !== -1) {
              _newData.id = __cakes[cakeTargetIndex].id;
              __cakes[cakeTargetIndex] = _newData;
            }
          }

          return { cakes: __cakes };
        });
      },

      removeCakeById: (cakeId): void => {
        return set((state) => ({
          cakes: state.cakes?.filter((cake) => cake.id !== cakeId),
        }));
      },
    }),
    {
      name: "cakes-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useCakeStore;

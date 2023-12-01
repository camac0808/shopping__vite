import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorage", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const cartListState = atom({
  key: "cartListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

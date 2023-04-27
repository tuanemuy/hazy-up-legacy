import { ReactNode, createContext, useContext } from "react";

export const AddressContext = createContext<number[]>([]);

type SelectableProps = {
  index: number;
  children: ReactNode;
};

export function Selectable({ index, children }: SelectableProps) {
  const parentAddress = useContext(AddressContext);
  const address =
    parentAddress.length === 0 ? [index] : [...parentAddress, index];

  return (
    <AddressContext.Provider value={address}>
      {children}
    </AddressContext.Provider>
  );
}

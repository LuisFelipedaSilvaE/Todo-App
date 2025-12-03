import { createContext, useContext, useState } from "react";

const DialogContext = createContext({});

export function DialogProvider({ children }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogState, setDialogState] = useState({
    isAnUpdate: false,
    isADeletion: false,
  });

  return (
    <DialogContext.Provider
      value={{
        isDialogVisible,
        setIsDialogVisible,
        dialogState,
        setDialogState,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}

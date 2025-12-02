import { createContext, useContext, useState } from "react";

const DialogContext = createContext({});

export function DialogProvider({ children }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDialogVisibleEnabled, setIsDialogVisibleEnabled] = useState(true);
  const [dialogState, setDialogState] = useState({
    isAnUpdate: false,
    isADelition: false,
  });

  return (
    <DialogContext.Provider
      value={{
        isDialogVisible,
        setIsDialogVisible,
        dialogState,
        setDialogState,
        isDialogVisibleEnabled,
        setIsDialogVisibleEnabled,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}

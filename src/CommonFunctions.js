export const successToast = (toast, { title, description }) => {
  toast({
    title,
    description,
    status: "success",
    duration: 8000,
    isClosable: true,
    position: "bottom-left",
  });
};

export const errorToast = (toast, { title, description }) => {
  toast({
    title,
    description,
    status: "error",
    duration: 8000,
    isClosable: true,
    position: "bottom-left",
  });
};

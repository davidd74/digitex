export const getInputStyles = () => ({
  "& .MuiInputLabel-root": {
    color: "white",
    fontSize: "15px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(255, 255, 255, 0.8)",
  },

  "& .Mui-error": {
    color: "red",
  },

  "& .MuiFilledInput-root": {
    borderRadius: "17px",
    backgroundColor: "#2a2a2a",
    height: { xs: 60 },
    "&.Mui-focused, &:hover": {
      // Add :hover here
      backgroundColor: "#3f3f3f",
    },
  },
  "& .MuiFilledInput-input": {
    marginTop: "3px",
    color: "white", // Set the text color to white
  },
});

// Common styles for metric components

export const commonStyles = {
  chartContainer: {
    minWidth: "33%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  chartTitle: {
    color: "#2D6A4F",
    fontWeight: 600,
    marginBottom: 1,
  },
  previewSection: {
    padding: "32px",
    backgroundColor: "#f8f9fa",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
  },
  chartsContainer: {
    flexWrap: "nowrap",
    overflowX: "auto",
    paddingBottom: 2,
  },
  inputContainer: {
    marginTop: "2rem",
  },
  inputHeader: {
    padding: "12px 24px",
    backgroundColor: "#e8f5e9",
    borderRadius: "8px 8px 0 0",
  },
  inputContent: {
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  textFieldStyle: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#2D6A4F",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2D6A4F",
    },
  },
  selectStyle: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#2D6A4F",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2D6A4F",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiMenu-paper .MuiMenuItem-root": {
      "&:hover": {
        backgroundColor: "#e8f5e9",
      },
      "&.Mui-selected": {
        backgroundColor: "#2D6A4F",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#2D6A4F",
        },
      },
    },
  },
};
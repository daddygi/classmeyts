import Alert from "@mui/material/Alert";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <Alert severity="error">{message}</Alert>;
};

export default FormError;

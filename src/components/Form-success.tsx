import Alert from "@mui/material/Alert";

interface FormErrorProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <Alert severity="success">{message}</Alert>;
};

export default FormSuccess;

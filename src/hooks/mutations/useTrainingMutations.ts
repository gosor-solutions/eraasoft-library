import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";

export interface TrainingRequestData {
  name: string;
  company_name: string;
  number_of_employees: string;
  whatsapp_number: string;
  email: string;
  notes: string;
}

export const useSubmitTrainingRequest = () => {
  return useMutation({
    mutationFn: (data: TrainingRequestData) =>
      apiService.post<unknown>("/training-requests", data),
  });
};

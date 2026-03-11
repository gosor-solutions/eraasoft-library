import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";
import type { CreateContactUsRequest } from "../../types/contact";

export const useSubmitContactUs = () => {
  return useMutation({
    mutationFn: (data: CreateContactUsRequest) =>
      apiService.post<unknown[]>("/contact-us", data),
  });
};

import { useQuery } from "@tanstack/react-query";
import { ConfigUseCase, ConfigRepository } from "./";

export class ConfigInteractor implements ConfigUseCase {
  constructor(public readonly repository: ConfigRepository) {}

  useGetByUser(userId: string) {
    return useQuery({
      queryKey: ["configByUser"],
      queryFn: () => {
        return this.repository.getByUser(userId);
      },
    });
  }
}

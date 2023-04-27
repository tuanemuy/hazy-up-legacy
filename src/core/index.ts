import { createContext } from "react";

import {
  ConfigRepository,
  ConfigUseCase,
  MockConfigRepository,
  MockConfigUseCase,
} from "./config";

const defaultConfigRepository = new MockConfigRepository();
const defaultConfigUseCase = new MockConfigUseCase(defaultConfigRepository);

export type ConfigContextValue = {
  repository: ConfigRepository;
  useCase: ConfigUseCase;
};

export const ConfigContext = createContext<ConfigContextValue>({
  repository: defaultConfigRepository,
  useCase: defaultConfigUseCase,
});

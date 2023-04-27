import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { ConfigContext } from "@/core";
import { SampleConfigRepository } from "@/core/config/repository/sample";
import { ConfigInteractor } from "@/core/config/usecase";

const configRepository = new SampleConfigRepository();
const configUseCase = new ConfigInteractor(configRepository);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS={true}>
        <ConfigContext.Provider
          value={{ repository: configRepository, useCase: configUseCase }}
        >
          <App />
        </ConfigContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

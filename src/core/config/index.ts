import { useQuery, UseQueryResult } from "@tanstack/react-query";

export type GenerateConfigArgs = {
  size: Sizes;
  color: ColorPalette;
};

export class Config {
  constructor(
    public readonly size: Sizes,
    public readonly color: ColorPalette
  ) {}

  static generate({ size, color }: GenerateConfigArgs): Config {
    return new Config(size, color);
  }
}

export type GenerateSizesArgs = {
  grid: number;
  basePadding: number;
};

export class Sizes {
  constructor(
    public readonly grid: number,
    public readonly basePadding: number
  ) {}

  static generate({ grid, basePadding }: GenerateSizesArgs): Sizes {
    return new Sizes(grid, basePadding);
  }
}

export type GenerateColorPaletteArgs = {
  theme: string;
  accent: string;
  black: string;
  white: string;
  background: string;
};

export class ColorPalette {
  constructor(
    public readonly theme: string,
    public readonly accent: string,
    public readonly black: string,
    public readonly white: string,
    public readonly background: string
  ) {}

  static generate({
    theme,
    accent,
    black,
    white,
    background,
  }: GenerateColorPaletteArgs): ColorPalette {
    return new ColorPalette(theme, accent, black, white, background);
  }
}

export interface ConfigRepository {
  getByUser: (userId: string) => Promise<Config>;
}

export interface ConfigUseCase {
  useGetByUser: (userId: string) => UseQueryResult<Config>;
}

export class MockConfigRepository implements ConfigRepository {
  async getByUser(_userId: string): Promise<Config> {
    return Config.generate({
      size: Sizes.generate({
        grid: 0,
        basePadding: 0,
      }),
      color: ColorPalette.generate({
        theme: "",
        accent: "",
        background: "",
        black: "",
        white: "",
      }),
    });
  }
}

export class MockConfigUseCase implements ConfigUseCase {
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

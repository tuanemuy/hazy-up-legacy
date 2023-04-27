import { Config, ConfigRepository, Sizes, ColorPalette } from "../";

export class SampleConfigRepository implements ConfigRepository {
  async getByUser(_userId: string): Promise<Config> {
    return Config.generate({
      size: Sizes.generate({
        grid: 16,
        basePadding: 64,
      }),
      color: ColorPalette.generate({
        theme: "#305973",
        accent: "#ef7e56",
        background: "#ded5c4",
        black: "#212121",
        white: "#f9f9f9",
      }),
    });
  }
}

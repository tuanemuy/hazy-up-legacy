export const ScreenKind = {
  Base: "base",
  Sm: "sm",
  Md: "md",
  Lg: "lg",
  Xl: "xl",
  Xxl: "xxl",
};
export type ScreenKind = typeof ScreenKind[keyof typeof ScreenKind];

export class Screen {
  constructor(public readonly kind: ScreenKind) {}

  static readonly breakpoints: { [key: string]: number } = {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
    xxl: 1536,
  };

  static readonly wraps: { [key: string]: string } = {
    base: "94%",
    sm: "470px",
    md: "758px",
    lg: "972px",
    xl: "1240px",
    xxl: "1356px",
  };

  static fromString(label: ScreenKind): Screen {
    return new Screen(label);
  }

  static fromWidth(width: number): Screen {
    let kind = ScreenKind.Base;

    for (const value of Object.values(ScreenKind)) {
      if (width > Screen.breakpoints[value]) {
        kind = value;
      }
    }

    return new Screen(kind);
  }

  getIndex(): number {
    return Object.values(ScreenKind).indexOf(this.kind);
  }

  getWrap(): string {
    return Screen.wraps[this.kind];
  }
}

export type GenerateImageArgs = {
  src: string;
  assets?: ImageAsset[];
};

export class Image {
  constructor(
    public readonly src: string,
    public readonly assets: ImageAsset[]
  ) {}

  static generate({ src, assets }: GenerateImageArgs): Image {
    return new Image(src, assets || []);
  }

  getSrcset(): string {
    let srcset = "";

    for (const asset of this.assets) {
      srcset += `${asset.url} ${asset.label},`;
    }

    return srcset;
  }
}

export type GenerateImageAssetArgs = {
  label: string;
  mimeType: string;
  path: string;
  url: string;
};

export class ImageAsset {
  constructor(
    public readonly label: string,
    public readonly mimeType: string,
    public readonly path: string,
    public readonly url: string
  ) {}

  static generate({
    label,
    mimeType,
    path,
    url,
  }: GenerateImageAssetArgs): ImageAsset {
    return new ImageAsset(label, mimeType, path, url);
  }
}

export class Responsive<T> {
  constructor(public readonly values: [T, ...T[]]) {}

  getValueOfScreen(screen: Screen): T {
    let vs: { [key: ScreenKind]: T } = {};
    Object.values(ScreenKind).forEach((kind, i) => {
      vs[kind] = this.getValueRecursive(i);
    });
    return vs[screen.kind];
  }

  getValueRecursive(index: number): T {
    if (index >= 0) {
      return this.values[index] !== undefined
        ? this.values[index]
        : this.getValueRecursive(index - 1);
    } else {
      throw new Error("Unreachable");
    }
  }
}

export type Padding = [number, number];

export type GenerateSectionArgs = {
  padding: Responsive<Padding>;
  height?: Responsive<string> | null;
  isWrapped?: boolean;
  background?: string | null;
  backgroundImage?: Image | null;
  isSemantic?: boolean;
  children: Columns[];
};

export class Section {
  constructor(
    public readonly padding: Responsive<Padding>,
    public readonly height: Responsive<string> | null,
    public readonly isWrapped: boolean,
    public readonly background: string | null,
    public readonly backgroundImage: Image | null,
    public readonly isSemantic: boolean,
    public readonly children: Columns[]
  ) {}

  static generate({
    padding,
    height,
    isWrapped,
    background,
    backgroundImage,
    isSemantic,
    children,
  }: GenerateSectionArgs): Section {
    return new Section(
      padding,
      height || null,
      isWrapped || false,
      background || null,
      backgroundImage || null,
      isSemantic || true,
      children
    );
  }

  static generateDefault(): Section {
    return Section.generate({
      padding: new Responsive([[1, 1]]),
      isWrapped: true,
      isSemantic: true,
      children: [Columns.generateDefault()],
    });
  }
}

export type GenerateColumnsArgs = {
  spacing: Responsive<number>;
  justifyContent?: string;
  alignItems?: string;
  repeat?: Responsive<number> | null;
  gap?: Responsive<number>;
  flexWrap?: boolean;
  children: (Columns | Component)[];
};

export class Columns {
  constructor(
    public readonly spacing: Responsive<number>,
    public readonly justifyContent: string,
    public readonly alignItems: string,
    public readonly repeat: Responsive<number> | null,
    public readonly gap: Responsive<number>,
    public readonly flexWrap: boolean,
    public readonly children: (Columns | Component)[]
  ) {}

  static generate({
    spacing,
    justifyContent,
    alignItems,
    repeat,
    gap,
    flexWrap,
    children,
  }: GenerateColumnsArgs): Columns {
    return new Columns(
      spacing,
      justifyContent || "start",
      alignItems || "stretch",
      repeat || null,
      gap || new Responsive([0]),
      flexWrap || false,
      children
    );
  }

  static generateDefault(): Columns {
    return Columns.generate({
      spacing: new Responsive([0]),
      gap: new Responsive([1]),
      children: [],
    });
  }
}

export type GenerateComponentArgs = {
  path: string;
  props: { [key: string]: string };
};

export class Component {
  constructor(
    public readonly path: string,
    public readonly props: { [key: string]: string }
  ) {}

  static generate({ path, props }: GenerateComponentArgs): Component {
    return new Component(path, props);
  }
}

export class GenerateTemplateModuleArgs {
  constructor(
    public readonly Template: React.FC<React.HTMLAttributes<HTMLDivElement>>,
    public readonly styles: { [key: string]: string },
    public readonly description: string
  ) {}
}

export class TemplateModule {
  constructor(
    public readonly Template: React.FC<React.HTMLAttributes<HTMLDivElement>>,
    public readonly styles: { [key: string]: string },
    public readonly description: string
  ) {}

  getStyle(screen: Screen): string {
    let style = this.styles.base;

    if (screen.kind === ScreenKind.Base) {
      return style;
    }

    style = `${style} ${this.styles.sm}`;
    if (screen.kind === ScreenKind.Sm) {
      return style;
    }

    style = `${style} ${this.styles.md}`;
    if (screen.kind === ScreenKind.Md) {
      return style;
    }

    style = `${style} ${this.styles.lg}`;
    if (screen.kind === ScreenKind.Lg) {
      return style;
    }

    style = `${style}\n${this.styles.xl}`;
    if (screen.kind === ScreenKind.Xl) {
      return style;
    }

    style = `${style}\n${this.styles.xxl}`;

    return style;
  }

  static generate({
    Template,
    styles,
    description,
  }: GenerateTemplateModuleArgs): TemplateModule {
    return new TemplateModule(Template, styles, description);
  }
}

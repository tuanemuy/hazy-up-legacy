import { nanoid } from "nanoid";

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

  replaceValueOfScreen(screen: Screen, value: T): Responsive<T> {
    let vs: { [key: ScreenKind]: T } = {};
    Object.values(ScreenKind).forEach((kind, i) => {
      vs[kind] = this.getValueRecursive(i);
    });

    const newValues = Object.keys(vs).map((kind) => {
      if (kind === screen.kind) {
        return value;
      } else {
        return vs[kind];
      }
    });

    return new Responsive([newValues[0], ...newValues.slice(1)]);
  }

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

export type ID = string;

// export type Role = Page | Section | Columns | Component;
// GenericsじゃなくてRoleで良いかも

export type GenerateStructureArgs<T> = {
  role: T;
  children: Structure<any>[];
};

// Structure -> Tree
export class Structure<T> {
  constructor(
    public readonly role: T,
    public readonly children: Structure<any>[]
  ) {}

  static generate<T>({
    role,
    children,
  }: GenerateStructureArgs<T>): Structure<T> {
    return new Structure(role, children);
  }

  getNodeMap(initialId: ID): { [key: ID]: Node<any> } {
    const nodes = this.getNodes(initialId);
    const map: { [key: ID]: Node<any> } = {};
    for (const node of nodes) {
      map[node.id] = node;
    }
    return map;
  }

  getNodes(initialId: ID): Node<any>[] {
    if (this.children.length > 0) {
      const childNodes = this.getChildNodes(initialId);
      return [
        Node.generate({
          id: initialId,
          role: this.role,
          firstChild: childNodes[0][0].id,
          lastChild: childNodes.slice(-1)[0][0].id,
        }),
        ...childNodes.flat(),
      ];
    } else {
      return [
        Node.generate({
          id: initialId,
          role: this.role,
        }),
      ];
    }
  }

  getChildNodes(parentId: string): Node<any>[][] {
    const childIds = Array(this.children.length)
      .fill(0)
      .map((_v) => nanoid());
    return this.children.map((structure: Structure<any>, index: number) => {
      if (structure.children.length > 0) {
        const childNodes = structure.getChildNodes(childIds[index]);
        return [
          Node.generate({
            id: childIds[index],
            parentId,
            prev: index === 0 ? null : childIds[index - 1],
            next:
              index === this.children.length - 1 ? null : childIds[index + 1],
            firstChild: childNodes[0][0].id,
            lastChild: childNodes.slice(-1)[0][0].id,
            role: structure.role,
          }),
          ...childNodes.flat(),
        ];
      } else {
        return [
          Node.generate({
            id: childIds[index],
            parentId,
            prev: index === 0 ? null : childIds[index - 1],
            next:
              index === this.children.length - 1 ? null : childIds[index + 1],
            role: structure.role,
          }),
        ];
      }
    });
  }
}

export type NodeMap = { [key: ID]: Node<any> };

export type GenerateNodeArgs<T> = {
  id: ID;
  parentId?: ID | null;
  firstChild?: ID | null;
  lastChild?: ID | null;
  prev?: ID | null;
  next?: ID | null;
  role: T;
};

// T -> Role
export class Node<T> {
  constructor(
    public readonly id: ID,
    public readonly parentId: ID | null,
    public readonly firstChild: ID | null,
    public readonly lastChild: ID | null,
    public readonly prev: ID | null,
    public readonly next: ID | null,
    public readonly role: T
  ) {}

  static generateId(): ID {
    return nanoid();
  }

  static generate<T>({
    id,
    parentId,
    firstChild,
    lastChild,
    prev,
    next,
    role,
  }: GenerateNodeArgs<T>) {
    return new Node(
      id,
      parentId || null,
      firstChild || null,
      lastChild || null,
      prev || null,
      next || null,
      role
    );
  }
}

export interface Role {
  attributes: { [key: string]: any };
}

export type GeneratePageArgs = {
  name: string;
  path: string;
};

// implements Role
export class Page {
  constructor(public readonly name: string, public readonly path: string) {}

  static generate({ name, path }: GeneratePageArgs) {
    return new Page(name, path);
  }
}

export type GenerateSectionArgs = {
  padding: Responsive<Padding>;
  height?: Responsive<string>;
  isWrapped?: boolean;
  background?: string | null;
  backgroundImage?: Image | null;
  isSemantic?: boolean;
};

export class Section {
  constructor(
    public readonly padding: Responsive<Padding>,
    public readonly height: Responsive<string>,
    public readonly isWrapped: boolean,
    public readonly background: string | null,
    public readonly backgroundImage: Image | null,
    public readonly isSemantic: boolean
  ) {}

  static generate({
    padding,
    height,
    isWrapped,
    background,
    backgroundImage,
    isSemantic,
  }: GenerateSectionArgs): Section {
    return new Section(
      padding,
      height || new Responsive(["auto"]),
      isWrapped || false,
      background || null,
      backgroundImage || null,
      isSemantic || true
    );
  }

  static generateDefault(): Section {
    return Section.generate({
      padding: new Responsive([[1, 1]]),
      isWrapped: true,
      isSemantic: true,
    });
  }
}

export type GenerateColumnsArgs = {
  spacing: Responsive<number>;
  justifyContent?: string;
  alignItems?: string;
  repeat?: Responsive<number>;
  gap?: Responsive<number>;
  flexWrap?: boolean;
};

export class Columns {
  constructor(
    public readonly spacing: Responsive<number>,
    public readonly justifyContent: string,
    public readonly alignItems: string,
    public readonly repeat: Responsive<number>,
    public readonly gap: Responsive<number>,
    public readonly flexWrap: boolean
  ) {}

  static generate({
    spacing,
    justifyContent,
    alignItems,
    repeat,
    gap,
    flexWrap,
  }: GenerateColumnsArgs): Columns {
    return new Columns(
      spacing,
      justifyContent || "start",
      alignItems || "stretch",
      repeat || new Responsive([-1]),
      gap || new Responsive([0]),
      flexWrap || false
    );
  }

  static generateDefault(): Columns {
    return Columns.generate({
      spacing: new Responsive([1]),
      gap: new Responsive([1]),
    });
  }
}

export type GenerateComponentArgs = {
  template: Template;
  props: { [key: string]: string | boolean | Image };
};

export class Component {
  constructor(
    public readonly template: Template,
    public readonly props: { [key: string]: string | boolean | Image } // public readonly dataSrc: any
  ) {}

  static generate({ template, props }: GenerateComponentArgs): Component {
    return new Component(template, props);
  }
}

export type GenerateTemplateCollectionArgs = {
  slug: string;
  name: string;
  templates: Template[];
};

export class TemplateCollection {
  constructor(
    public readonly slug: string,
    public readonly name: string,
    public readonly templates: Template[]
  ) {}

  static generate({
    slug,
    name,
    templates,
  }: GenerateTemplateCollectionArgs): TemplateCollection {
    return new TemplateCollection(slug, name, templates);
  }
}

export type GenerateTemplateArgs = {
  name: string;
  url: string;
  thumbnail: Image;
};

// EntityはUserTemplateとかにする？
export class Template {
  constructor(
    public readonly name: string,
    public readonly url: string,
    public readonly thumbnail: Image
  ) {}

  static generate({ name, url, thumbnail }: GenerateTemplateArgs): Template {
    return new Template(name, url, thumbnail);
  }
}

export type GenerateTemplateModuleArgs = {
  Template: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  styles: { [key: string]: string };
  description: string;
};

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
    if (!Template || !styles || !description) {
      throw new Error("Invalid argument");
    }

    return new TemplateModule(Template, styles, description);
  }
}

export type ParseStringSizeResult = {
  value: string;
  unit: string;
} | null;

export function parseStringSize(str: string): ParseStringSizeResult {
  const regex = /(?<value>[0-9]+)(?<unit>(px|vw|vh))/;
  const match = regex.exec(str);

  const value = match?.groups?.value || null;
  const unit = match?.groups?.unit || null;

  if (value && unit) {
    return {
      value,
      unit,
    };
  } else {
    return null;
  }
}

export function hexToRgba(hex: string, opacity: number): string | null {
  let hexArray = hex.slice(1).split("");

  if (hexArray.length === 3) {
    hexArray = hexArray.map((v) => [v, v]).flat();
  }

  if (hexArray.length !== 6) {
    return null;
  }

  return `rgba(${parseInt(hexArray.slice(0, 2).join(""), 16)}, ${parseInt(
    hexArray.slice(2, 4).join(""),
    16
  )}, ${parseInt(hexArray.slice(4, 6).join(""), 16)}, ${opacity})`;
}

export type BackgroundColor = {
  hex: string;
  opacity: number;
};

export function rgbaToHexOpacity(value: string): BackgroundColor | null {
  const rgba = value
    .replace(/\s/g, "")
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);

  if (rgba?.length !== 4 && rgba?.length !== 5) {
    return null;
  }

  const opacity = rgba[4] ? parseFloat(rgba[4]) : 1;
  const hex =
    "#" +
    `0${parseInt(rgba[1], 10).toString(16)}`.slice(-2) +
    `0${parseInt(rgba[2], 10).toString(16)}`.slice(-2) +
    `0${parseInt(rgba[3], 10).toString(16)}`.slice(-2);

  return {
    hex,
    opacity,
  };
}

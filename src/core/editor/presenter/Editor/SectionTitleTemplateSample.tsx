import { css } from "@emotion/css";

type Props = {
  title: string;
  subtitle: string;
  reverse: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const props = [
  { type: "text", key: "title", name: "タイトル" },
  { type: "text", key: "subtitle", name: "サブタイトル" },
  { type: "boolean", key: "reverse", name: "反転色" },
];

export const Template = ({ title, subtitle, reverse, className }: Props) => {
  return (
    <div className={`${className}${reverse ? " reverse" : ""}`}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
};

export const styles = {
  base: css`
    position: relative;
    width: 100%;
    min-width: 100px;

    &::after {
      position: relative;
      z-index: 1;
      content: "";
      display: block;
      width: 3rem;
      height: 3px;
      margin: 0 auto;
      margin-top: calc(var(--grid, 16px) * 1);
      background-color: var(--theme, "#333333");
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      line-height: 1.25;
    }

    p {
      overflow: break-word;
      word-break: break-all;
      font-size: 1rem;
      text-align: center;
    }

    &.reverse {
      color: var(--white, "#ffffff");

      &::after {
        background-color: var(--white, "#ffffff");
      }
    }
  `,
  lg: css`
    h3 {
      font-size: 2.5rem;
    }
  `,
};

export const description = "推奨表示サイズの説明等";

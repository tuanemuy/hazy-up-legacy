import { css } from "@emotion/css";

type Props = {
  name: string;
  description: string;
  reverse: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const props = [
  { type: "text", key: "name", name: "名前" },
  { type: "textarea", key: "description", name: "説明" },
  { type: "boolean", key: "reverse", name: "反転色" },
];

export const Template = ({ name, description, reverse, className }: Props) => {
  return (
    <div className={`${className} ${reverse ? "reverse" : ""}`}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export const styles = {
  base: css`
    width: 100%;
    height: 100%;
    padding: calc(var(--grid, 16px) * 2);
    color: var(--white, #ffffff);
    background-color: var(--theme, #232c64);

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }

    p {
      margin-top: calc(var(--grid, 16px) * 1);
      overflow: break-word;
      word-break: break-all;
    }

    &.reverse {
      color: var(--theme, #232c64);
      background-color: var(--white, #ffffff);

      p {
        color: var(--black, #333333);
      }
    }
  `,
  lg: css`
    h3 {
      font-size: 2rem;
    }
  `,
};

export const defaultProps = {
  name: "サービス①",
  description: "私たちは〇〇を提供しています。",
  reverse: false,
};

export const description = "推奨表示サイズの説明等";

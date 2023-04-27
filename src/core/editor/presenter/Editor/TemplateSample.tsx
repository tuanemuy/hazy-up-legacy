import { css } from "@emotion/css";

type Props = { name: string } & React.HTMLAttributes<HTMLDivElement>;

export const props = [{ type: "string", name: "name" }];

export const Template = ({ name, className }: Props) => {
  return (
    <div className={className}>
      <h3>見出し</h3>
      <p>{name}</p>
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
  `,
  lg: css`
    h3 {
      font-size: 2rem;
    }
  `,
};

export const description = "推奨表示サイズの説明等";;

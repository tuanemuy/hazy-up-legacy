import { css } from "@emotion/css";
import { Image } from "../../";

type Props = {
  title: string;
  subtitle: string;
  backgroundImage: Image;
  className: string;
};

export const props = [
  { type: "text", key: "title", name: "タイトル" },
  { type: "textarea", key: "subtitle", name: "サブタイトル" },
  { type: "image", key: "backgroundImage", name: "背景画像" },
];

export const Template = ({
  title,
  subtitle,
  backgroundImage,
  className,
}: Props) => {
  return (
    <div className={className}>
      <div className="content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <img
        className="background"
        src={backgroundImage.src}
        srcSet={backgroundImage.getSrcset()}
        alt={title}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export const styles = {
  base: css`
    position: relative;
    width: 100%;
    min-width: 100px;

    &::before {
      position: relative;
      z-index: 1;
      content: "";
      display: block;
      width: 100%;
      padding-top: 50%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .content {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: calc(var(--grid, 16px) * 2);
      color: var(--white, #ffffff);

      h2 {
        max-width: 900px;
        margin: 0 auto;
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        line-height: 1.25;
      }

      p {
        margin-top: calc(var(--grid, 16px) * 1);
        overflow: break-word;
        word-break: break-all;
        font-size: 1.5rem;
        text-align: center;
      }
    }

    img {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  `,
  lg: css`
    .content {
      h2 {
        font-size: 4rem;
      }
    }
  `,
};

export const description = "推奨表示サイズの説明等";

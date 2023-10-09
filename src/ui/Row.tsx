import styled, { css } from "styled-components";

type RowProps = {
  type: "horizontal" | "vertical";
};

const Row = styled.div`
  display: flex;

  ${(props: RowProps) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props: RowProps) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;

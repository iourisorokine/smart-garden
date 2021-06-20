import styled from "styled-components";

export interface ContentProps {
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  flexDirection?: "row" | "column";
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center" | "space-around" | "space-between" | "space-evenly";
}

export const Content = styled.div`
  padding: ${(props: ContentProps) => props.padding ?? 0};
  padding-top: ${(props: ContentProps) =>
    props.paddingTop ?? props.padding ?? 0};
  padding-bottom: ${(props: ContentProps) =>
    props.paddingBottom ?? props.padding ?? 0};
  padding-left: ${(props: ContentProps) =>
    props.paddingLeft ?? props.padding ?? 0};
  padding-right: ${(props: ContentProps) =>
    props.paddingRight ?? props.padding ?? 0};
  display: flex;
  flex: 1;
  width: calc(100%-padding-border);
  flex-direction: ${(props: ContentProps) => props.flexDirection ?? "column"};
  align-items: ${(props: ContentProps) => props.alignItems ?? "flex-start"};
  justify-content: ${(props: ContentProps) => props.justifyContent ?? "center"};
`;

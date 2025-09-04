import styled from "styled-components";

const Grid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* allows clicks to pass through */
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 50px 50px; /* adjust spacing */
  z-index: 9999;
`;

export default function DebugGrid() {
  return <Grid />;
}

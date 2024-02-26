import styled from "styled-components";

const BetterButton = ({ title, loading, size, customStyle, onClick = () => { } }) => {
  return (<Button className={`${size}`} onClick={onClick} disabled={loading} style={customStyle}>{title}</Button>)
}

const Button = styled.button`
  background: var(--corn-silk);
  padding: 15px 20px;
  font-family: "Roboto Mono", monospace;
  font-size: 18px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  height: fit-content;
  font-weight: 700;
  color: var(--buff);
  transition: .3s ease-in-out;
  &:hover {
    color: white;
    background: var(--tea-green);
  }
  &.small {
    font-size: 16px;
    padding: 10px 15px;
  }
  @media all and (max-width: 480px) {
    padding: 10px 10px;
    font-size: 14px;
  }
`


export default BetterButton;
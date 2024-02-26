import styled from "styled-components";

const CategoryPill = ({ category }) => {
  return (<Pill className={`${category}`}>{category}</Pill>)
}

const Pill = styled.div`
  padding: 10px 5px;
  border-radius: 50px;
  width: 150px;
  margin: 0 auto;
  text-transform: capitalize;
  text-align: center;
  &.main {
    background-color: var(--tea-green);
    color: var(--papaya-whip);
  }
  &.appetizer {
    background-color: var(--buff);
    color: var(--corn-silk);
  }
  &.beverage {
    background-color: var(--beige);
    color: var(--buff);
  }
`


export default CategoryPill;
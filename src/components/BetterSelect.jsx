import { type } from "@testing-library/user-event/dist/type";
import styled from "styled-components";

const BetterSelect = ({ options = [], title, register, required = false, errors, name }) => {
  return (
    <SelectInput>
      <span className="title">{title}</span>
      <select defaultValue="" disabled={options.length === 0} {...register(name, { required: required ? `Must select a ${title}.` : false })}>
        <option value="" disabled hidden>Choose here</option>
        {
          options.map((option, index) => {
            return <option value={option} key={index}>{option}</option>
          })
        }
      </select>
      <p className="input-error">{errors[name]?.message}</p>
    </SelectInput>
  )
}

const SelectInput = styled.div`
  width: 100%;
	select {
		border: 2px solid var(--tea-green);
		border-radius: 15px;
		font-family: "Poppins", sans-serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-size: 14px;
		position: relative;
		text-align: center;
		width: 100%;
		height: 51px;
		color: var(--text);
    margin-top: 5px;
    text-transform: capitalize;
		&::placeholder { 
			color: var(--buff);
			font-family: "Poppins", sans-serif;
			font-optical-sizing: auto;
			font-weight: 500;
			font-size: 14px;
		}
		&:focus { 
			outline: none;
			border: 2px solid var(--beige);
		}
		&:disabled {
			background-color: #F4F5F6;
			border-color: #F4F5F6;
			color: #808080;
		}
    > option {
      text-transform: capitalize;
    }
	}
  .title {
		font-family: "Poppins", sans-serif;
		font-size: 18px;
  }
	.input-error {
		margin: 0;
		height: 10px;
		font-size: 12px;
    font-family: "Poppins", sans-serif;
		color: var(--muted-red);
		font-weight: 500;
	}
`


export default BetterSelect;
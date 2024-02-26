import styled from "styled-components";

const BetterInput = ({ type, errors, title, register, required = false, name, inputProps }) => {
  return (
    <TextInput>
      <span className="title">{title}</span>
      <input
        type={type}
        {...register(name, {
          required: required ? `${title} cannot be blank.` : false,
          valueAsNumber: type === 'number' ? true : false,
          valueAsDate: type === 'date' ? true : false,
        })}
        {...inputProps}
      />
      <p className="input-error">{errors[name]?.message}</p>
    </TextInput>
  )
}

const TextInput = styled.div`
  width: 100%;
  input[type=search],
	input[type=email],
	input[type=password],
	input[type=text],
	input[type=tel],
	input[type=number],
	input[type=time],
	input[type=date],
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
		height: 45px;
		color: var(--text);
    margin-top: 5px;
		&::placeholder { 
			color: var(--tea-green);
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


export default BetterInput;
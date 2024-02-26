import styled from "styled-components";

const ActionIcon = ({ icon, onClick = () => { }, }) => {
  return (<Button onClick={onClick}>{icon}</Button>)
}

const Button = styled.button`
	background: none;
	border: none;
	transition: .3s ease-in-out;
	&:hover {
		opacity: .75;
	}
	> svg {
		cursor: pointer;
		height: 30px;
		width: 30px;
		transition: .2s ease-in-out;
		object-fit: contain;
		&:hover {
			opacity: .85;
		}
	}
`


export default ActionIcon;
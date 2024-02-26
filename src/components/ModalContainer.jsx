import styled from "styled-components";
import { Icons } from "./Icons";
import ActionIcon from "./ActionIcon";
import Separator from "./Separator";

const ModalContainer = ({ children, modal, setModal, title, onClose }) => {

  const closeModal = () => {
    if (onClose) {
      onClose();
    } else {
      setModal((prev) => !prev)
    }
  }

  return (
    <Modal className={`${modal && 'visible'}`}>
      <div className="modal-container">
        <div className="close-modal">
          <ActionIcon icon={<Icons.Close color="#ccd5ae" />} onClick={closeModal} />
        </div>
        <div className="children-container">
          <p className="modal-title">{title}</p>
          <Separator height={30} />
          {children}
        </div>
      </div>
    </Modal>
  )
}

const Modal = styled.div`
	overflow: hidden;
	opacity: 0;
	visibility: hidden;
	height: 100vh;
	width: 100vw;
	transition: .3s ease-in-out;
	position: fixed;
	background-color: #FFFFFF85;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	&.visible {
		opacity: 1;
		visibility: visible;
	}
	.modal-container {
		background-color: white;
		position: relative;
		.close-modal {
			position: absolute;
			right: -15px;
			top: -10px;
			> svg {
				height: 30px;
				width: 30px;
				cursor: pointer;
				transition: .2s ease-out;
			}
		}
		.children-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 500px;
			min-height: 300px;
			border-radius: 15px;
			padding: 30px 60px;
			box-shadow: 0px 4px 20px rgba(53, 99, 55, 0.2);
			.modal-title {
				font-family: "Roboto Mono", monospace;
				font-weight: 700;
				font-optical-sizing: auto;
				font-size: 26px;
				text-align: center;
				color: #2a2a2a;
			}
		}
	}
	@media all and (max-width: 480px) {
		height: auto;
		padding: 20px;
		width: -webkit-fill-available;
		.modal-container .children-container {
			width: fit-content;
			height: 85vh;
			overflow-y: scroll;
			padding: 30px;
			.modal-title { padding-top: 30px; }
			div { flex-direction: column; }
			button { margin-top: 30px; }
		}
  }
`


export default ModalContainer;
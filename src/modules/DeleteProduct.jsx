import { useState } from "react";
import BetterButton from "../components/BetterButton";
import ModalContainer from "../components/ModalContainer";
import { deleteProduct } from "../api";
import Separator from "../components/Separator";
import { toast } from 'react-toastify';
import { Icons } from "../components/Icons";
import ActionIcon from "../components/ActionIcon";

const DeleteProduct = ({ fetchProductsData, selectedData, selectedKey }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const onRemoveProduct = () => {
    try {
      deleteProduct(selectedKey);
      toast.success('Product has been remove.', { position: "top-center" });
      fetchProductsData();
      setDeleteModal(prev => !prev);
    } catch (error) {
      toast.error('Oh no! Something went wrong.', { position: "top-center" });
    }
  }

  return (
    <>
      <ModalContainer modal={deleteModal} setModal={setDeleteModal} title={'Remove Product'}>
        <p style={{ lineHeight: '35px', fontSize: '18px' }}>Are you sure you want to remove, <b>{selectedData?.name}</b> in your current inventory? This action cannot be undone.</p>
        <Separator height={50} />
        <BetterButton title={'Yes, remove product'} customStyle={{ width: '100%', backgroundColor: '#d84f4f', color: 'white' }} onClick={onRemoveProduct} />
      </ModalContainer>
      <ActionIcon icon={<Icons.Delete color="#d84f4f" />} onClick={() => setDeleteModal(prev => !prev)} />
    </>
  )
}


export default DeleteProduct;
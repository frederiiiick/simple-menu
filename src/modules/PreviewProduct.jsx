import { useState } from "react";
import ModalContainer from "../components/ModalContainer";
import { Icons } from "../components/Icons";
import ActionIcon from "../components/ActionIcon";
import CategoryPill from "../components/CategoryPill";
import { currencyFormatter } from "../utils/Helpers";

const PreviewProduct = ({ selectedData, selectedKey }) => {
  const [previewModal, setPreviewModal] = useState(false);

  return (
    <>
      <ModalContainer modal={previewModal} setModal={setPreviewModal} title={'Product Detail'}>
        <div style={{ textAlign: 'left', minWidth: '300' }}>
          <CategoryPill category={selectedData?.categories} />
          <p><b>Product Name:</b> {selectedData?.name}</p>
          <div style={{ display: 'flex', columnGap: 10 }}>
            <p><b>Cost:</b> {currencyFormatter.format(selectedData?.cost)}</p>
            <p><b>Price:</b> {currencyFormatter.format(selectedData?.price)}</p>
            <p><b>Stocks:</b> {selectedData?.stocks}</p>
          </div>
          <p style={{ textTransform: 'capitalize' }}><b>Options:</b> {selectedData?.options || 'None'}</p>
        </div>
      </ModalContainer>
      <ActionIcon icon={<Icons.More color="#ccd5ae" />} onClick={() => setPreviewModal(prev => !prev)} />
    </>
  )
}


export default PreviewProduct;
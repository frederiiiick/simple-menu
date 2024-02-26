import { useEffect, useState } from "react";
import BetterButton from "../components/BetterButton";
import ModalContainer from "../components/ModalContainer";
import BetterInput from "../components/BetterInput";
import BetterSelect from "../components/BetterSelect";
import { fetchCategories, fetchOptions, updateProduct } from "../api";
import Separator from "../components/Separator";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import ActionIcon from "../components/ActionIcon";
import { Icons } from "../components/Icons";

const EditProduct = ({ fetchProductsData, selectedData, selectedKey }) => {
  const [editModal, setEditModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: selectedData,
  });

  useEffect(() => {
    onCategoryChange(selectedData.categories);
    setValue('name', selectedData.name);
    setValue('cost', selectedData.cost);
    setValue('price', selectedData.price);
    setValue('stocks', selectedData.stocks);
    setValue('categories', selectedData.categories);
    setValue('options', selectedData.options);
  }, [selectedData, setValue])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change' && name === 'categories') {
        onCategoryChange(value[name]);
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const data = await fetchCategories();
      if (Object.keys(data).length > 0) {
        let categoriesData = [];
        Object.keys(data).map(item => {
          return categoriesData.push(item);
        })
        setCategories(categoriesData);
      } else {
        toast.error('Oh no! Something went wrong.', { position: "top-center" });
      }
    }

    fetchCategoriesData();
  }, [])

  const onCategoryChange = async (category) => {
    const data = await fetchOptions();
    if (data[category]) {
      let optionsData = [];
      Object.keys(data[category]).map(item => {
        return optionsData.push(item);
      })
      setOptions(optionsData);
    } else {
      setOptions([]);
    }
  }

  const onUpdateProduct = (data) => {
    if (isValid) {
      try {
        updateProduct({ data: data, key: selectedKey });
        toast.success('Product updated!', { position: "top-center" });
        fetchProductsData();
        setEditModal(prev => !prev);
      } catch (error) {
        toast.error('Oh no! Something went wrong.', { position: "top-center" });
      }
    }
  }

  const onCustomModalClose = () => {
    reset(selectedData);
    setEditModal(prev => !prev);
  }

  return (
    <>
      <ModalContainer modal={editModal} setModal={setEditModal} title={'Edit Product'} onClose={onCustomModalClose}>
        <form
          style={{ display: 'flex', flexDirection: 'column', width: '100%', rowGap: 15 }}
          onSubmit={handleSubmit((data) => onUpdateProduct(data))}
        >
          <BetterInput type={'text'} title={'Product Name'} name={'name'} register={register} errors={errors} required={true} />
          <div style={{ display: 'flex', columnGap: 20, width: '100%' }}>
            <BetterInput type={'number'} title={'Cost'} name={'cost'} register={register} errors={errors} required={true} inputProps={{ min: 0 }} />
            <BetterInput type={'number'} title={'Price'} name={'price'} register={register} errors={errors} required={true} inputProps={{ min: 0 }} />
            <BetterInput type={'number'} title={'Stocks'} name={'stocks'} register={register} errors={errors} required={true} inputProps={{ min: 0 }} />
          </div>
          <div style={{ display: 'flex', columnGap: 20, width: '100%' }}>
            <BetterSelect title={'Category'} options={categories} name={'categories'} register={register} errors={errors} required={true} />
            <BetterSelect title={'Option'} options={options} name={'options'} register={register} errors={errors} required={false} />
          </div>
        </form>
        <Separator height={50} />
        <BetterButton title={'Update'} customStyle={{ width: '100%' }} onClick={handleSubmit((data) => onUpdateProduct(data))} />
      </ModalContainer>
      <ActionIcon icon={<Icons.Edit color="#d4a373" />} onClick={() => setEditModal(prev => !prev)} />
    </>
  )
}


export default EditProduct;
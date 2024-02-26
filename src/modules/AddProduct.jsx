import { useEffect, useState } from "react";
import BetterButton from "../components/BetterButton";
import ModalContainer from "../components/ModalContainer";
import BetterInput from "../components/BetterInput";
import BetterSelect from "../components/BetterSelect";
import { addProduct, fetchCategories, fetchOptions } from "../api";
import Separator from "../components/Separator";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddProduct = ({ fetchProductsData }) => {
  const [addModal, setAddModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      options: '',
      categories: '',
    }
  });

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

  const onAddProduct = (data) => {
    if (isValid) {
      try {
        const generated_key = data.name.toLowerCase().replace(' ', '_');
        addProduct({ data: data, key: generated_key });
        toast.success('New product added!', { position: "top-center" });
        fetchProductsData();
        setAddModal(prev => !prev);
        reset();
      } catch (error) {
        toast.error('Oh no! Something went wrong.', { position: "top-center" });
      }
    }
  }

  return (
    <>
      <ModalContainer modal={addModal} setModal={setAddModal} title={'Add Product'}>
        <form
          style={{ display: 'flex', flexDirection: 'column', width: '100%', rowGap: 15 }}
          onSubmit={handleSubmit((data) => onAddProduct(data))}
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
        <BetterButton title={'Submit'} customStyle={{ width: '100%' }} onClick={handleSubmit((data) => onAddProduct(data))} />
      </ModalContainer>
      <BetterButton title={'Add Product'} onClick={() => setAddModal(prev => !prev)} />
    </>
  )
}


export default AddProduct;
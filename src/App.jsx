import './App.scss';
import { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import Logo from './assets/images/logo.png'
import Separator from './components/Separator';
import AddProduct from './modules/AddProduct';
import CategoryPill from './components/CategoryPill';
import DeleteProduct from './modules/DeleteProduct';
import EditProduct from './modules/EditProduct';
import PreviewProduct from './modules/PreviewProduct';
import { toast } from 'react-toastify';

const App = () => {
  const [products, setProducts] = useState(null);

  const fetchProductsData = async () => {
    const data = await fetchProducts();
    if (Object.keys(data).length > 0) {
      setProducts(data);
    } else {
      toast.error('Oh no! Something went wrong.', { position: "top-center" });
    }
  }

  useEffect(() => {
    fetchProductsData();
  }, [])

  return (
    <section className="App">
      <div className='main-container'>
        <header>
          <img className='logo' src={Logo} alt='cooked. food hub' draggable="false" />
          <AddProduct fetchProductsData={fetchProductsData} />
        </header>
        <Separator height={50} />
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr className='header'>
              <th>Name</th>
              <th>Category</th>
              <th>Stocks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products ? 
              Object.keys(products).map((key, index) => {
                return (
                  <tr key={index}>
                    <td data-title="Product Name:">{products[key].name}</td>
                    <td data-title="Category:"><CategoryPill category={products[key].categories} /></td>
                    <td data-title="Stocks:">{products[key].stocks}</td>
                    <td data-title="Actions:" className='actions'>
                      <PreviewProduct selectedData={products[key]} selectedKey={key} />
                      <EditProduct fetchProductsData={fetchProductsData} selectedData={products[key]} selectedKey={key} />
                      <DeleteProduct fetchProductsData={fetchProductsData} selectedData={products[key]} selectedKey={key} />
                    </td>
                  </tr>
                )
              })
              : <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}><p>No Products Available.</p></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <p className='copyright'>{`cooked. food hub © ${new Date().getFullYear()} - All Rights Reserved.`}</p>
    </section>
  );
}

export default App;

import { ref, get, child, update, set, remove } from "firebase/database";
import { database } from './utils/firebaseConfig';

export const fetchProducts = () => {
  return get(child(ref(database), `products/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const fetchCategories = () => {
  return get(child(ref(database), `categories/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const fetchOptions = () => {
  return get(child(ref(database), `options/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const addProduct = ({ data, key }) => {
  return set(ref(database, `products/${key}`), data)
    .then(() => {
      console.log('Success')
    })
    .catch((error) => {
      console.log(error);
    });
}

export const deleteProduct = (key) => {
  return remove(ref(database, `products/${key}`))
    .then(() => {
      console.log('Success')
    })
    .catch((error) => {
      console.log(error);
    });
}

export const updateProduct = ({ data, key }) => {
  return update(ref(database, `products/${key}`), data)
    .then(() => {
      console.log('Success')
    })
    .catch((error) => {
      console.log(error);
    });
}

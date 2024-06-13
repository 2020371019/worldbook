import React, { useState, useEffect } from "react";
import products from "../../../services/products";
import './products.css';
import ModalUpdate from "../UpdateProduct";
import { storageController } from "../../../services/token";


const Products = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
  
    const token = storageController.getToken(); // Reemplaza esto con la forma en que obtienes el token en tu aplicación
  
    useEffect(() => {
      fetch('https://api-books-omega.vercel.app/books/')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
  
    const handleUpdate = (book) => {
      setCurrentBook(book);
      setShowModal(true);
    };
  
    const handleDelete = (id) => {
      if (tokenExpired(token)) {
        console.error('Token has expired');
        return;
      }
  
      fetch(`https://api-books-omega.vercel.app/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.filter(post => post.id !== id));
        } else {
          console.error('Failed to delete the post.');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
    };
  
    const handleSubmitUpdate = (updatedBook) => {
      if (tokenExpired(token)) {
        console.error('Token has expired');
        return;
      }
  
      fetch(`https://api-books-omega.vercel.app/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBook),
      })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.map(post => post.id === updatedBook.id ? updatedBook : post));
          setShowModal(false);
          setCurrentBook(null);
        } else {
          console.error('Failed to update the post.');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
    };
  
    return (
      <>
        <h1>Products</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Editorial</th>
                <th>Genre</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.name}</td>
                  <td>{post.author}</td>
                  <td>{post.editorial}</td>
                  <td>{post.genre}</td>
                  <td>{post.review}</td>
                  <td>
                    <button onClick={() => handleUpdate(post)}>Actualizar</button>
                    <button onClick={() => handleDelete(post.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <ModalUpdate
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSubmit={handleSubmitUpdate}
            book={currentBook}
          />
        )}
      </>
    );
  };
  
  export default Products;
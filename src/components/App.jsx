
import { Searchbar } from "./Searchbar";
import { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Loader } from "./Loader";

const MY_KEY = "38099797-78dca8015a0d6056d487ea901"

export const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [modalSrc, setModalSrc] = useState("")
  const [modalAlt, setModalAlt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
 



  useEffect(() => {
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?key=${MY_KEY}&q=${search}&image_type=photo&page=${page}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(imgData => {
        setData(d => [...d, ...imgData.hits]);

        setLoading(false);
      });
  }, [search, page]);

  // useEffect(() =>{
  //   fetch(`https://pixabay.com/api/?key=${MY_KEY}&q=${search}&image_type=photo&page=${page}`)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   })
  //   .then(imgData => {
  //     setLoading(false)
  //     setData([...data,...imgData.hits])
     
  
  //   })
  // }, [page])


// componentDidUpdate(prevProps, prevState) {
//     if(prevState.search !== this.state.search){
//       this.setState({ loading: true });
//       fetch(`https://pixabay.com/api/?key=${MY_KEY}&q=${this.state.search}&image_type=photo&page=${this.state.page}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .then(imgData => {
//        return this.setState({loading: false, data: imgData.hits})
    
//       })
      
//     } else  if(prevState.page !== this.state.page){
//       fetch(`https://pixabay.com/api/?key=${MY_KEY}&q=${this.state.search}&image_type=photo&page=${this.state.page}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .then(imgData => {
//        return this.setState((prevState) => {
        
//         return {loading: false, data: [...prevState.data, ...imgData.hits]}})
    
//       })
//     } else {
//       return false
//     } 
// }
const openModal =(imgSrc, imgAlt) => {
  setShowModal(true)
  setModalSrc(imgSrc)
  setModalAlt(imgAlt)
 
}

const closeModal = () => {
  setShowModal(false)
  setModalSrc("")
  setModalAlt("")
}

const handleLoadMore = () =>{

  setPage(page +1)
}
const searchPicture = ({ name }) => {
  if(name !== search){
    setData([]);
  }
  setSearch(name);
};
  
  return (
    <div >
     <Searchbar onSubmit={searchPicture}></Searchbar>
   <Loader loading={loading}/>
    <ImageGallery data={data} openModal={openModal}/>
    {data.length > 0 && <Button onClick={handleLoadMore}/> }
 
    {showModal && (
      <Modal handleClose={ closeModal}
      modalSrc={modalSrc}
      modalAlt={modalAlt}
      />
    )}
    </div>
  );}


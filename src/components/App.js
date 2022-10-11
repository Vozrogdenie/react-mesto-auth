import PopupYouSure from './PopupYouSure';
import ImagePopup from './ImagePopup';
import PopupEditAvatar from './PopupEditAvatar';
import PopupAddPlace from './PopupAddPlace';
import PopupWithForm from './PopupWithForm';
import PopupEditProfile from './PopupEditProfile';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import React from 'react';
import api from '../utils/API';
import { BrowserRouter, Switch, Redirect, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]  = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isYouSurePopupOpen, setIsYouSurePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name:'', about:'', avatar:''})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({username:'', email:''})

  const history = useHistory();

  React.useEffect(() =>{
    tokenCheck()
  }, [])

  function handleLogin (username, password)  {
    return api.authorize(username, password)
    .then((data) => {
      if (!data.jwt) throw Error ('Not jwt');
      localStorage.setItem('jwt', data.jwt);
      setLoggedIn(true);
      history.push('/my-profile')
    })
  }

  function handleRegister (email, password) {
    return api.register(email, password)
    .then(() => {
      history.push('/login')
    })
  }

  function tokenCheck  () {
  const jwt = localStorage.getItem('')
  if (!jwt) return;
  api.getContent(jwt).then((data) => {
    setLoggedIn(true);
    setUserData({
      username: data.username,
      email: data.email
    })
    history.push('/my-profile')
  })

  }
  function handleCardClick(card) {
    setSelectedCard(card)
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
  };
  
  React.useEffect(() => {
    api.getApiCards()
        .then((res) => {
            setCards(res)
        }).catch((err)=>{
            console.log(err)
        });
  }, []);

  function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      }).catch((err)=>{
        console.log(err)
    });;
  } ;

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id))
      }).catch((err)=>{
        console.log(err)
      });   
  };

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      }).catch((err)=>{
        console.log(err)
    });
  };
  
  function handleUpdateUser(name, about) {
    api.setApiUsers(name, about)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err)=>{
      console.log(err)
  });
};

  function handleAddPlaceSubmit(card) {
    api.createCards(card)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups(); 
    }).catch((err) => {
      console.log(err)
    });
  };

  React.useEffect(() => {
    api.getApiUsers()
        .then((name, about) => {
          setCurrentUser(name, about)
        }).catch((err)=>{
            console.log(err)
        })  
}, []);

  return (

    <div>
        <Header />
        <BrowserRouter>
          <Switch>  

            <ProtectedRoute exact path="/" loggedIn={loggedIn} >
            <CurrentUserContext.Provider value={currentUser}>
    <CurrentCardContext.Provider value={cards}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <PopupEditProfile opened={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}  onClosePopup={closeAllPopups}></PopupEditProfile> 
              <PopupAddPlace opened={isAddPlacePopupOpen} onPlace={handleAddPlaceSubmit} onClosePopup={closeAllPopups}></PopupAddPlace>
              <PopupEditAvatar opened={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClosePopup={closeAllPopups}></PopupEditAvatar>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <PopupWithForm name="you-sure" opened={isYouSurePopupOpen} title='Вы уверены?'buttonText='Да' onClosePopup={closeAllPopups}><PopupYouSure/></PopupWithForm>
              </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>           
            </ProtectedRoute>
            <Route  path="/signup">
              <Register  onRegister={handleRegister}/>
            </Route>         
            <Route  path="/signin">
              <Login  onLogin={handleLogin}/>
            </Route> 
            {/* <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>  */}
          </Switch>
        </BrowserRouter>
        <Footer />
        </div>
  );
};
  
export default App;

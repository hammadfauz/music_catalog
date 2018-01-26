const initialState = {
  albums : []
};

function appReducer (state = initialState, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_ALBUM' :
      let AddIndex = state.albums.findIndex(function (album) {
        return album.collectionId === action.album.collectionId;
      });
      if (AddIndex === -1) {
        newState.albums.push(action.album);
      }
      return newState;
    case 'REMOVE_ALBUM' :
      let RemoveIndex = state.albums.findIndex(function (album) {
        return album.collectionId === action.album.collectionId;
      });
      if (RemoveIndex !== -1) {
        newState.albums.splice(RemoveIndex,1);
      }
      return newState;
    default :
      return newState;
  }
};

export default appReducer;

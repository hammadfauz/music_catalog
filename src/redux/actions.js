const addAlbum = function (album) {
  return {
    type : 'ADD_ALBUM',
    album : album
  };
};

const removeAlbum = function (album) {
  return {
    type : 'REMOVE_ALBUM',
    album : album
  };
};

export {
  addAlbum,
  removeAlbum
};

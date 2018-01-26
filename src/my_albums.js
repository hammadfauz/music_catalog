import React from 'react';
import {connect} from 'react-redux';
import {removeAlbum,addAlbum} from './redux/actions';
import SearchResult from './components/search_result';

class MyAlbums extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      artistFilter : 'all'
    };
    this.handleFavorite = this.handleFavorite.bind(this);
    this.changeArtist = this.changeArtist.bind(this);
  }
  handleFavorite (item,isFavorite) {
    if (isFavorite) {
      this.props.onRemoveAlbum(item);
    }else{
      this.props.onAddAlbum(item);
    }
  }
  changeArtist (evt) {
    this.setState({artistFilter : evt.target.value});
  }
  render () {
    const self = this;
    let styles = {
      main : {
        margin  : '9px auto 0px',
        textAlign : 'center',
        transition : 'all 300ms ease-in-out'
      },
      filterRow : {
        textAlign : 'left',
        padding : '10px',
        maxWidth : '810px',
        margin : 'auto',
        backgroundColor : '#eaeaea',
        borderBottom : '1px solid #acacac'
      }
    };
    let artists = {};
    this.props.favAlbums.forEach(function (album) {
      artists[album.artistId] = album.artistName;
    });
    return (<div style={styles.main}>
      <div style={styles.filterRow}>
        Show albums by:
        <select value={this.state.artistFilter}
          onChange={this.changeArtist}>
          <option key='all' value='all'>all</option>
          {Object.keys(artists).map(function(artistId) {
            return (<option key={artistId}
              value={artistId}>
              {artists[artistId]}
            </option>);
          })}
        </select>
      </div>
      {this.props.favAlbums.length > 0?
        <div>
          {this.props.favAlbums.filter(function (album) {
            if (self.state.artistFilter === 'all') {
              return true;
            }else{
              return (album.artistId+'') === self.state.artistFilter;
            }
          }).map(function(result,n){
            let favIndex = self.props.favAlbums.findIndex(function(fav) {
              return fav.collectionId === result.collectionId;
            });
            return (<SearchResult result={result}
              favMode
              key={result.collectionId}
              isFavorite={favIndex !== -1}
              onToggleFavorite={self.handleFavorite} />);
          })}
        </div>
      :null}
    </div>);
  }
};

export default connect((state,ownProps) => {
  return {
    favAlbums : state.albums
  };
},(dispatch) => {
  return {
    onRemoveAlbum : (album) => {dispatch(removeAlbum(album));},
    onAddAlbum : (album) => {dispatch(addAlbum(album));}
  };
})(MyAlbums);

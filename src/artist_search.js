import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import {connect} from 'react-redux';
import {removeAlbum,addAlbum} from './redux/actions';
import SearchResult from './components/search_result';

class ArtistSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      results : []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }
  componentDidMount () {
    this.handleSearch(this.props.match.params.searchTerm);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.searchTerm !== this.props.match.params.searchTerm) {
      this.handleSearch(nextProps.match.params.searchTerm);
    }
  } 
  handleSearch (searchTerm) {
    const self = this;
    fetch('https://itunes.apple.com/search?term='+searchTerm+'&entity=musicArtist').then(function (response) {
      return response.json();
    }).then(function (result) {
      return fetch('https://itunes.apple.com/lookup?id='+result.results[0].artistId+'&entity=album');
    }).then(function (response) {
      return response.json();
    }).then(function (result) {
      self.setState({results : result.results.filter(function (item) {
        return item.wrapperType === 'collection' && item.collectionType === 'Album';
      })});
    }).catch(function (err) {
      console.log(err);
    });
  }
  handleFavorite (item,isFavorite) {
    if (isFavorite) {
      this.props.onRemoveAlbum(item);
    }else{
      this.props.onAddAlbum(item);
    }
  }
  render () {
    const self = this;
    let styles = {
      main : {
        margin  : this.state.results.length > 0?
          '9px auto 0px':'25% auto',
        textAlign : 'center',
        transition : 'all 300ms ease-in-out'
      },
      count : {
        fontWeight : '600',
        textAlign : 'left',
        maxWidth : '800px',
        margin : 'auto'
      }
    };
    return (<div style={styles.main}>
      <p style={styles.count}>Showing {this.state.results.length} albums by {this.props.match.params.searchTerm}</p>
      {this.state.results.length > 0?
        <div>
          {this.state.results.map(function(result,n){
            let favIndex = self.props.favAlbums.findIndex(function(fav) {
              return fav.collectionId === result.collectionId;
            });
            return (<SearchResult result={result}
              key={result.collectionId}
              isFavorite={favIndex !== -1}
              onToggleFavorite={self.handleFavorite} />);
          })}
        </div>
      :null}
    </div>);
  }
}

export default withRouter(connect((state,ownProps) => {
  return {
    favAlbums : state.albums
  };
},(dispatch) => {
  return {
    onRemoveAlbum : (album) => {dispatch(removeAlbum(album));},
    onAddAlbum : (album) => {dispatch(addAlbum(album));}
  };
})(ArtistSearch));


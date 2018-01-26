import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import FontAwesome from 'react-fontawesome';
import Popover from './popover';
import MenuItem from './menu_item';

const debouncify = function (func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      anchor : null,
      searchTerm : '',
      focused : false,
      artists : []
    }
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.fetchArtists = debouncify(this.fetchArtists.bind(this),500);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
    this.setAnchor = this.setAnchor.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unSetFocus = this.unSetFocus.bind(this);
    this.close = this.close.bind(this);
  }
  updateSearchTerm (evt) {
    const self = this;
    this.setState({searchTerm : evt.target.value},function () {
      self.fetchArtists(self.state.searchTerm);
    });
  }
  fetchArtists (searchTerm) {
    const self = this;
    fetch('https://itunes.apple.com/search?term='+searchTerm+'&entity=musicArtist').then(function (response) {
      return response.json();
    }).then(function (result) {
      self.setState({artists : result.results.slice(0,5).map(function (artist) {
        return {
          name : artist.artistName,
          id : artist.artistId
        };
      })});
    }).catch(function (error) {
      console.log(error);
    });
  }
  handleEnter (evt) {
    if (evt.key === 'Enter'
        && typeof this.props.onSearch === 'function'
        && this.state.artists
        && this.state.artists[0]) {
      this.props.onSearch(this.state.artists[0]);
    }
  }
  handleSelect (artist) {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(artist)
    }
  }
  handleBtn () {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.searchTerm);
    }
  }
  setFocus () {
    this.setState({focused : true});
  }
  unSetFocus () {
    this.setState({focused : false});
    setTimeout(this.close,300);
  }
  setAnchor (el) {
    this.setState({anchor : el});
  }
  close () {
    this.setState({artists : []});
  }
  render () {
    const self = this;
    let styles = {
      main : {
        position : 'relative',
        width : '100%',
        border : '1px solid #a7a7a7',
        borderRadius : '15px',
        backgroundColor : '#fff',
        boxSizing : 'border-box',
        padding : '0px 15px',
        marginTop : (this.props.match.isExact && this.props.match.path === '/')?
          '50vh':'0',
        transition : 'all 300ms ease-in-out',
        boxShadow : this.state.focused?'0px 6px 34px -7px rgba(59, 176, 255, 0.67)':'0px 0px 0px 0px  rgba(59, 176, 255, 0.67)'
      },
      input : {
        width : '100%',
        lineHeight : '30px',
        border : 'none',
        outline : 'none'
      },
      searchBtn : {
        cursor : 'pointer',
        position : 'absolute',
        right : '10px',
        top : '0px',
        lineHeight : '33px',
        fontSize : '14pt',
        color : '#2196f3'
      }
    };
    return (<div style={styles.main}>
      <input type='text' value={this.state.searchTerm}
        ref={this.setAnchor}
        placeholder='Search for Artists'
        onFocus={this.setFocus}
        onBlur={this.unSetFocus}
        style={styles.input}
        onChange={this.updateSearchTerm}
        onKeyDown={this.handleEnter} />
      <Popover open={this.state.artists.length>0}
        anchorEl={this.state.anchor}
        onRequestClose={this.close}>
        {this.state.artists.map(function (item,n) {
          return (<MenuItem label={item.name}
            key={item.id}
            onTouchTap={self.handleSelect.bind(self,item)}/>);
        })}
      </Popover>
      <div style={styles.searchBtn}
        onClick={this.handleBtn}>
        <FontAwesome name='search' />
      </div>
    </div>);
  }
}

export default withRouter(SearchBar);

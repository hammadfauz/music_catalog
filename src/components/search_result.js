import React from 'react';
import FontAwesome from 'react-fontawesome';
import Button from './button';

class SearchResult extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hovered : false,
    };
    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }
  hoverOn () {
    this.setState({hovered : true});
  }
  hoverOff () {
    this.setState({hovered : false});
  }
  handleFavorite () {
    if (typeof this.props.onToggleFavorite === 'function') {
      this.props.onToggleFavorite(this.props.result,this.props.isFavorite);
    }
  }
  render () {
    let styles = {
      resultContainer : {
        margin : 'auto',
        maxWidth : '800px',
        borderBottom : '1px solid #cacaca',
        padding : '15px',
        backgroundColor : this.state.hovered?'#eaeaea':'#fff',
        transition : 'all 300ms ease-in-out'
      },
      leftCol : {
        display : 'inline-block',
        width : 'calc(100% - 193px)',
        minWidth : '350px'
      },
      imgContainer : {
        display : 'inline-block',
        borderLeft : '10px solid #445a64',
        height : '100px',
        width : '100px',
        overflow : 'hidden',
        marginRight : '20px'
      },
      detailsContainer : {
        display : 'inline-block',
        verticalAlign : 'top',
        width : 'calc(100% - 130px)',
        textAlign : 'left'
      },
      name : {
        margin : '0px',
        fontWeight : '600',
        fontSize : '16pt'
      },
      artist : {
        fontSize : '11pt',
        fontWeight : '100',
        fontStyle : 'italic'
      },
      release : {
        margin : '0px',
        fontSize : '10pt',
        color : '#424242'
      },
      tracks : {
        margin : '0px',
        color : '#f57c00'
      },
      genre : {
        margin : '0px',
        color : '#424242'
      },
      copyright : {
        fontSize : '8pt',
        color : '#acacac',
        fontStyle : 'italic'
      },
      actions : {
        display : 'inline-block',
        textAlign : 'right',
        verticalAlign : 'top'
      },
      btn : {
        margin : '4px',
        padding : '8px 10px',
        fontSize : '18px'
      },
      heart : {
        color : '#ef5350'
      }
    };
    return (<div
      onMouseEnter={this.hoverOn}
      onMouseLeave={this.hoverOff}
      style={styles.resultContainer}>
      <div style={styles.leftCol}>
        <div style={styles.imgContainer}>
          <img src={this.props.result.artworkUrl100}
            alt={'album cover for '+this.props.result.collectionName}/>
        </div>
        <div style={styles.detailsContainer}>
          <p style={styles.name}>
            <span>{this.props.result.collectionName}</span>
            {this.props.favMode?
              <span style={styles.artist}>{' by '+this.props.result.artistName}</span>
            :null}
          </p>
          <p style={styles.release}>{'Released: '+this.props.result.releaseDate.split('-')[0]}</p>
          <p style={styles.tracks}>{'has '+this.props.result.trackCount+' tracks'}</p>
          <p style={styles.genre}>Genre: {this.props.result.primaryGenreName}</p>
          <p style={styles.copyright}>{this.props.result.copyright}</p>
        </div>
      </div>
      <div style={styles.actions}>
        <Button label={<FontAwesome
          title={this.props.isFavorite?'Remove from Favorites':'Add to Favorites'}
          style={styles.heart}
          name={this.props.isFavorite?'heart':'heart-o'}/>}
          style={styles.btn}
          onClick={this.handleFavorite}/>
      </div>
    </div>);
  }
}

export default SearchResult;

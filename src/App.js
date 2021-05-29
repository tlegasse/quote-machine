import './App.css';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import { withStyles } from '@material-ui/core/styles'


    
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Roboto, Sans-serif",
    "& > .MuiGrid-root": {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    "& .actions-row": {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    "& .quote-author": {
      textAlign: "right",
      display: "block"
    },
    "& #new-quote": {
      minWidth: "125px"
    },
    "& .submit-container": {
      textAlign: "right"
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      quote: {
        text: "Please Wait...",
        author: "Please Wait..."
      },
      tweetLink: '#'
    }

    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then(quotes => {
        let chosenQuote = quotes[Math.floor(Math.random() * quotes.length)]
        this.setState({
          quotes: quotes,
          quote: chosenQuote,
          tweetLink: this.getTweetLink(chosenQuote)
        })
      })
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  getNewQuote() {
    let chosenQuote = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]
    this.setState({
      quote: chosenQuote,
      tweetLink: this.getTweetLink(chosenQuote)
    })
  }

  getTweetLink(chosenQuote) {
    let tweetLinkPrefix = 'https://twitter.com/intent/tweet?'
    let linkBody = encodeURIComponent(chosenQuote.text + ' - ' + chosenQuote.author)
    return tweetLinkPrefix + linkBody;
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="quote-box" className={classes.root} variant="outlined">
        <Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardContent>
                <FormatQuoteIcon />{this.state.quote.text}
                
                <Typography className="quote-author" gutterBottom variant="h5" component="caption">
                  - {this.state.quote.author}
                </Typography>
                
                <Grid className="actions-row">
                  <Grid item xs={12} sm={6} className="social-container">
                    <Link href={this.state.tweetLink} id="tweet-quote"><TwitterIcon /></Link>
                  </Grid>
                  <Grid className="submit-container" item xs={12} sm={6}>
                    <Button id="new-quote" onClick={this.getNewQuote} variant="contained">New Quote</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
const pageStyle = {
  getStyle(device) {
    return {
      html: {
        background: '#fff',
        color: '#232323',
        'font-family': 'TimesNewRoman, \'Times New Roman\', Times, Baskerville, Georgia, serif',
        'font-size': '21px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        '-webkit-text-size-adjust': '100%',
        'text-indent': '0 !important',
        margin: '0',
        padding: '0',
      },
      body: {
        margin: '0',
        padding: '0',
      },
      '*': {
        'box-sizing': 'inherit',
      },
      '*:before': {
        'box-sizing': 'inherit',
      },
      '*:after': {
        'box-sizing': 'inherit',
      },
      a: {
        color: '#232323',
        'text-decoration': 'none',
        padding: '0',
      },
      img: {
        margin: '0 auto 1em auto',
        'max-width': '100% !important',
        padding: '3em 0 .5em 0',
      },
      h1: {
        'font-family': '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
        'font-size': '32px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
        padding: '3em 0 .5em 0',
      },
      h2: {
        'font-family': '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
        'font-size': '28px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
        padding: '3em 0 .5em 0',
      },
      h3: {
        'font-family': '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
        'font-size': '26px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
        padding: '3em 0 .5em 0',
      },
      h4: {
        'font-family': '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
        'font-size': '22px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
        padding: '3em 0 .5em 0',
      },
      h5: {
        'font-family': '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
        'font-size': '22px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
        padding: '3em 0 .5em 0',
      },
      ul: {
        'text-align': 'left',
      },
      p: {
        'font-size': '21px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
        position: 'relative',
        padding: '.001em',
        'text-align': 'left',
        width: '100%',
      },
      span: {
        'font-size': '21px',
        'line-height': (!device || device === 'iOS') ? '1.5em' : '1.7em',
        margin: '0',
      },
      div: {
        'min-width': '0 !important',
        padding: '0',
        'text-align': 'center',
      },
    };
  },
};

export default pageStyle;

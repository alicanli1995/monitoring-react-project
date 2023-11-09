import {FormControlLabel, styled, Switch} from "@mui/material";

const SwitchButton = (pr) => {

  const IOSSwitch = styled((props) => (
      <Switch focusVisibleClassName=".Mui-focusVisible"
              checked={props.checked}
              id={pr.id}
              onChange={props.handleToggle}
              disableRipple {...props} />
  ))(({theme}) => ({
    width: 30,
    height: 16,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45'
              : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 12,
      height: 12,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
      <>
        <FormControlLabel
            control={<IOSSwitch sx={{m: 1}}/>}
            checked={pr.checked.toString() === '1'}
            onClick={pr.handleToggle}
            label={<b style={{fontSize: '15px', fontFamily: 'sans-serif'}}>
              {pr.label}
            </b>}
            style={{
              maxHeight: '10px', marginTop: '7px', marginRight: '6px',
            }}
        />
      </>
  )
}

export default SwitchButton;
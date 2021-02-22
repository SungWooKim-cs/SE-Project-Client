import React from 'react';
import Button from '@material-ui/core/Button';
import './Items.css'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch} from "react-redux";
import {deleteProduct} from "../../../actions/products";

const Item = ( {item} ) => {  
  const [open, anchorEL] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();

  const handleToggle = (e) => {
    anchorEL(e.currentTarget);
    //anchorEL((prevOpen) => !prevOpen);
  };

  const handleEdit = () => {
     //anchorEl(null);
    };

  const handleDelete = (e) => {
        console.log(item._id);
        dispatch(deleteProduct(item._id));
    };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    anchorEL(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      anchorEL(false);
    }
  }

  


  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className='item'>
            <div className={"first-line"}>
                <h2>Item ID:{item.lookupCode}</h2>
                <IconButton
                     ref={anchorRef}
                     aria-controls={open ? 'menu-list-grow' : undefined}
                     aria-haspopup="true"
                     onClick={handleToggle}
                   >
                    <MoreVertIcon />
                </IconButton>
            
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom-end' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          
        </div>
      <h2>Stock:{item.count}</h2>
    
    </div>
  );
}
export default Item;
import React, { useLayoutEffect } from 'react'
import { CloseBtnAside } from './SearchIcon'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CategoryIcon from '@material-ui/icons/Category';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import CodeIcon from '@material-ui/icons/Code';
import DeckIcon from '@material-ui/icons/Deck';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import BookIcon from '@material-ui/icons/Book';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import HealingIcon from '@material-ui/icons/Healing';
import { Divider, Drawer, IconButton, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PropTypes from 'prop-types';

const styles = makeStyles(theme => ({
    drawerHeader: {
        paddingRight: theme.spacing(2),
        textAlign: "end"
    }
}))


const Aside = React.forwardRef((props, ref) => {
    const { isOpen, search, closeAs } = props

    const categoryList = [
        { text: "Toys", icon: CategoryIcon },
        { text: "Hardware", icon: DesktopMacIcon },
        { text: "Software", icon: CodeIcon },
        { text: "Accesories", icon: DeckIcon },
        { text: "Kitchen & Dining", icon: KitchenIcon },
        { text: "Clothing & Jelwery", icon: LoyaltyIcon },
        { text: "Books", icon: BookIcon },
        { text: "Babies", icon: ChildFriendlyIcon },
        { text: "Sports", icon: SportsBasketballIcon },
        { text: "Other", icon: HealingIcon }]

    const clases = styles()

    return (
        <Drawer
            open={isOpen}
            ref={ref}
        >
            <List>
                <div className={clases.drawerHeader}>
                    <IconButton
                        onClick={closeAs}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {categoryList && categoryList.map((item, index) => <ListItem
                    button
                    key={index}
                    onClick={() => { search(item.text) }}>
                    <ListItemIcon><item.icon className="icon-category" /></ListItemIcon>
                    <ListItemText primary={item.text} />

                </ListItem>)}
            </List>
        </Drawer>
    )
})


export default Aside


Aside.propTypes = {
    isOpen: PropTypes.bool,
    search: PropTypes.func,
    closeAs: PropTypes.func
}
import React from "react"
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import CategoryIcon from '@material-ui/icons/Category'


export const gmailButtonStyles = ({ palette }) => {

  return {
    root: ({ collapsed }) => ({
      minWidth: collapsed ? 56 : 64,
      minHeight: collapsed ? 56 : 48,
      backgroundColor: palette.secondary.main,
      padding: `8px ${collapsed ? '8px' : '24px'} 8px ${
        collapsed ? '8px' : '16px'
      }`,
      borderRadius: 40,
      boxShadow:
        '0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)',
      '&:hover': {
        boxShadow:
          '0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)',
        backgroundColor: '#fafafb',
      },
      '&:active': {
        backgroundColor: '#f1f3f4',
      },
    }),
    label: {
      fontFamily:
        "'Google Sans', Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
      color: 'white',
      textTransform: 'none',
      fontWeight: 500,
    },
    img: {
      width: 32,
      height: 32,
    },
    startIcon: ({ collapsed }) => ({
      margin: collapsed ? 0 : '',
    }),
  };
};

const useStyles = makeStyles(gmailButtonStyles, { name: 'GmailButton' })

const CustomButton = ({ collapsed, classes, ...props }) => {
  const styles = useStyles({ collapsed, ...props })
  const { img: imgClassName, ...buttonClasses } = styles;
  console.log("tuuuu")
  return (
    <Button
      disableRipple
      color="primary"
      {...props}
      classes={buttonClasses}
      startIcon={
        <CategoryIcon
          className={imgClassName}
          
        />
      }
    >
      Categories
    </Button>
  );
}
export default CustomButton;
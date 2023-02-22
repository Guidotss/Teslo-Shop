import { FC } from "react"
import { AddCircleOutlineOutlined, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
  currentValue:number;
  maxValue:number;

  updateQuantity:(counter:number) => void;
}

export const ItemCounter:FC<Props> = ({ currentValue,maxValue,updateQuantity: updateQuantity,updateQuantity: updateCounter }) => {
  
  const handleAdd = () => {
    if(currentValue < maxValue) {
      updateQuantity(currentValue + 1);
    }
  }

  const handleRemove = () => {
    if(currentValue > 1) {
      updateQuantity(currentValue - 1);
    }
  }

  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={ handleRemove } >
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{width:40,textAlign:'center'}}>{ currentValue }</Typography>
        <IconButton onClick={ handleAdd }>
            <AddCircleOutlineOutlined/>
        </IconButton>
    </Box>
  )
}
import { FC } from "react";
import { Box, Button } from "@mui/material";
import { ISize } from "@/interfaces";


interface Props {
    selectedSize?:ISize;
    sizes: ISize[];
}

export const SizeSelector:FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Box sx={{mt:2}}>
        {
            sizes.map(size => (
                <Button 
                  key={size} 
                  size='small'
                  color={selectedSize === size ? 'inherit' : 'info'}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
import { NextPage } from 'next';
import NextLink from 'next/link';
import { ShopLayout } from '@/components/layouts';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';


const columns:GridColDef[] = [
    {field:'id', headerName:'ID', width:100},
    {field:'fullName', headerName:'Nombre completo', width:300},

    {
        field:'paid',
        headerName:'Pagado',
        description:'El estado de pago de la orden',
        width:200,
        renderCell: ( params:GridRenderCellParams) => {
            return (
                
                    params.row.paid
                        ? <Chip color='success' label='Pagada' variant='outlined'/>
                        : <Chip color='error' label='Pendiente' variant='outlined'/>
                
            )
        }
    },

    {
        field:'actions',
        headerName:'Ver Orden',
        width:200,
        sortable:false,
        renderCell: (params:GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always' sx={{color:'black'}}>Ver orden</Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    {id:1,paid:true, fullName:'Nicolas Olguin'},
    {id:2,paid:false, fullName:'Guido Olguin'},
    {id:3,paid:true, fullName:'Hugo Olguin'},
    {id:4,paid:false, fullName:'Clarisa Olguin'},
    {id:5,paid:true, fullName:'Alicia Lubrina'},
    {id:6,paid:false, fullName:'Ana Paula Cabezas'},
]

const  HistoryPage:NextPage = () =>  {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
       <Typography variant='h1' component='h1' sx={{mb:2}}>Historial del ordenes</Typography>

       <Grid container>
            <Grid item xs={12} sx={{height:650, width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
       </Grid>
    </ShopLayout> 
  )
}
export default HistoryPage;
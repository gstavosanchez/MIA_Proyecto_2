import React from 'react'
import { makeStyles } from '@material-ui/core';


const styles = makeStyles((theme) => ({
    content: {
      flexGrow:1,
      backgroundColor:theme.palette.background.default,
      padding:theme.spacing(3)
    },
  }));
export const Index = () => {
    const clases = styles()
    return (
        <div className={clases.content}>
            <p>
                index
            
            </p>
        </div>
    )
}
